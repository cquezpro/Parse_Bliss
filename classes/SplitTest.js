/**
 *  SplitTest 
 *
 *  @testName
 */

function SplitTest(testName) {
  Parse.initialize(Bliss.appId, Bliss.javascriptId);
  this.setTestName(testName);
  this.user = User.current();
  this.data = {};
  this.addGlobal();
}
  
SplitTest.prototype = {
  isAssigned: function(testName) {
    var storageValue = Storage.get('test-' + testName);
    return (storageValue !== false && typeof storageValue != 'undefined') ? true : false;
  },
  addGlobal: function() {
    if (!window.SplitTests) {
      window.SplitTests = [];
    }
    window.SplitTests.push(this);
  },
  setTestName: function(testName) {
    this.testName = 'test-'+testName;
  },
  getTestName: function(testName) {
    return this.testName;
  },
  //Split users evenly into groups between min / max value and provide value in a callback
  regression: function(min, max) {
    this.data.type   = 'regression';
    this.data.min    = min;
    this.data.max    = max;
    this.groupNumber = this.getUserGroupKey();
    if (typeof groupNumber == 'undefined') {
      groupNumber = Bliss.getRandomInt(min, max);
      this.setUserGroupKey(groupNumber);
    }
    return groupNumber;
  },
  stringify: function(variable) {
    return variable.toString();
  },
  //Pick one of an array of values - DOES NOT WORK WITH TRUE / FALSE BOOL VALUES
  values: function(values) {
    if (this.is_overridden()) {
      return this.getOverrideValue();
    }
    this.data.type   = 'values';
    this.data.values = '';
    
    //TODO: Throw error if groups is already defined?
    this.groups = [];

    var that = this;
    //TODO: Generalize for all tests in new function?
    $.each(values, function(index, value) {
      if (typeof index != 'string' && (typeof value == 'object' || typeof value == 'function')) {
        throw new Error('Bliss Error: You must provide an object with strings as keys to use SplitTest with Objects and Functions');
      }
      that.data.values += String(index) + that.stringify(value);
      var group_name = (typeof index == 'string') ? index : value; 
      group = {name: group_name, value: value};
      that.groups.push(group);
    });

    var group = this.getUserGroup();
    if (group === false) {
      index = Bliss.getRandomInt(0, this.groups.length - 1);
      group = this.groups[index];
      this.setUserGroup(group);
    }
    this.data.groupKey = group.name;

    return group.value;
  },
  //Wrapper for values
  truefalse: function() {
    if (this.is_overridden()) {
      return this.getOverrideValue() ? true : false;
    }
    return this.values([0, 1]) ? true : false;
  },
  //Split users into two groups, yes group gets callback executed, no group does nothing
  yesno: function(callback) {
    this.data.type     = 'yesno';
    this.data.callback = JSON.stringify(callback);
    this.groups = [{name: 'yes', value: 'yes'}, {name: 'no', value: 'no'}];
    var group = this.getUserGroup();
    if (group === false) {
      var rand = Math.random();
      Bliss.log(rand);
      group = (rand <= .5) ? {name: 'yes', value: 'yes'} :  {name: 'no', value: 'no'};
      this.setUserGroup(group);
    }
    if (group.value == 'yes') {
      callback.call(null);
    }
  },
  getGroupIndexByName: function(groupName) {
    var group_index = false;
    $.each(this.groups, function(index, group) {
      if (String(group.name) == String(groupName)) {
        group_index = index; 
      }
    });
    return (group_index !== false)  ? group_index : false;
  },
  //Save a group with name / value
  setUserGroup: function(group) {
    if (typeof group !== 'object' || typeof group.name == 'undefined' || typeof group.value == 'undefined') {
      throw new Error('Invalid group. Should be in the form: {name: "name", value: "value"}');
    }
    Storage.set(this.testName, String(group.name));
    this.saveToParse(group);
  },
  getUserGroup: function() {
    //Ensure this.groups is defined and an array
    if (this.groups == 'undefined' || this.groups.length == 'undefined') {
      throw new Error('Cannot get user group - this.groups is undefined or not array');
    }
    var groupName = Storage.get(this.testName);
    if (typeof groupName != 'undefined' && groupName !== false) {
      var index = this.getGroupIndexByName(groupName);
      if (index !== false) {
        return this.groups[index];
      }
    }
    return false;
  },
  //Set a simple integer / string identifier, for simple tests
  setUserGroupKey: function(key) {
    Storage.set(this.testName, key);
  },
  getUserGroupKey: function(key) {
    return Storage.get(this.testName);
  },
  set: function(attr, value) {
    this.data[attr] = value;
  },
  get: function(attr){
    return this.data[attr];
  },
  throttledSave: function(){
    if (!isset(this.saveTimeout)) {
      //setTimeout
    }
  },
  saveToParse: function (group) {
    //We can only run a split test if User is loaded
    //It is better to silently fail in some situations (login form)
    if (User.current()) {
      var testName = this.testName
      var that = this;
      var userTestGroup = Parse.Object.extend("UserTestGroup", {
        initialize: function(attrs, options) {
          this.set('test', that.testName);
          this.set('groupKey', String(group.name));
          this.set('user', that.user);
          this.set('values', that.data.values);
          var parse = this;
        },
      });
      var parseGroup = new userTestGroup(); 
      var acl = new Parse.ACL();
      acl.setReadAccess(User.current(), true);
      parseGroup.setACL(acl);
      parseGroup.save({
        error: function(user, error) {
          Bliss.log("Error: " + error.code + " " + error.message);
        }
      });
    }
  },
  override: function(value) {
    var testName = this.testName;
    var obj = {};
    obj[testName + '-overridden'] = 1;
    Storage.set(obj);
    Storage.set(this.testName + '-override-value', value)
    Bliss.saveData('testgroups', {test: testName, overridden: 1, overridden_time: Bliss.getTime(), overridden_value: value});
  },
  is_overridden: function() {
    return (Storage.get(this.testName + '-overridden') == 1)
  },
  getOverrideValue: function() {
    return Storage.get(this.testName + '-override-value')
  }
}

//Convenience Function
function split(testName){
  return new SplitTest(testName);
}



