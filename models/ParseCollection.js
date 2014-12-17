/**
 *  Functionality for loading a collection of models from Parse.com
 *  
 *  name - the name of the class which will be loaded
 *  Extends AbstractCollection
 *
 */
function ParseCollection(name, options) {
  ParseCollection.superclass.constructor.apply(this, arguments);
}
extend(ParseCollection, AbstractCollection);

/**
 * Returns true on success, false on error
 */

ParseCollection.prototype.load = function(callback) {
  var dateStart = 'createdAt';
  //If already loaded, run callback
  if (this.loaded) {
    callback.call(this, true);
  }
  //Else, load collection
  else {
    var that = this;
    var query = new Parse.Query(this.name);
    query.equalTo("user", User.current());

    if (this.options.startDate) {
      var startDate = new Date(this.options.startDate);
      query.greaterThan('createdAt', startDate);
    }

    query.equalTo("user", User.current());

    if (this.options.startDate) {
      var startDate = this.options.startDate;
      var startDate = typeof startDate == 'object' ? startDate : new Date(startDate);
      query.greaterThan('createdAt', startDate);
    }
    if (this.options.endDate) {
      var endDate = this.options.endDate;
      var endDate = typeof endDate == 'object' ? endDate : new Date(endDate);
      query.lessThan('createdAt', endDate);
    }

    query.ascending('createdAt');
    query.find({
      success: function(results) {
        that.loaded = true;
        that.models = results;
        Bliss.log("Successfully retrieved " + results.length + " results from Parse.");
        Bliss.log(results);
        that.currentModel = that.models.length - 1;
        callback.call(that, true);
      },
      error: function(error) {
        callback.call(that, false);
      }
    });
  }
}

//Adds a model to the collection and moves pointer to that model
ParseCollection.prototype.addModel = function(attributes) {
  if (!attributes) {
    attributes = {};
  }
  var Model = Parse.Object.extend({
    className: this.name,
  });
  var model = new Model();
  var user = attributes.user ? attributes.user : User.current();
  
  model.set('user', user);
  model.set('createTime', Bliss.getTime());
  model.set('bliss_id', Bliss.getRandomString(20));
  model.createdAt = new Date();
  $.each(attributes, function(key, value) {
    model.set(key, value);
  });
  this.models.push(model);
  this.last();
}

//Save all models in the collection
ParseCollection.prototype.saveAll = function() {
  $.each(this.models, function(key, model) {
    var acl = new Parse.ACL(user);
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    model.setACL(acl);
  });
  Parse.Object.saveAll(this.models);
}

