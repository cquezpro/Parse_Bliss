CreateAccountForm = BlissForm.extend({
  name: 'CreateAccountForm',
  //Does not use a model, but causes problems if not specfied
  //TODO: Update BlissView to support views without models
  dataClass: 'dummy',
  modelClass: StorageModel,
  ignoreUnsaved: true,
  bodyClasses: 'page-userAccess',
  template: 'create-account.tpl.htm',
  fields: {
    BlissPassword: {defaultValue: '', dataType: 'string', required: true},
    BlissEmail: {defaultValue: '', dataType: 'string', required: true},
    BlissUsername: {defaultValue: '', dataType: 'string'},
    chose_username: {defaultValue: false, dataType: 'boolean'},
  },
  PreRender: function() {
    var username = Storage.get('username');
    //Only use username if it's a user set email address
    //not our autogenerated random string username for auto-account creation
    if (username && username.indexOf('@') != -1) {
      this.getModel().set('BlissEmail', Storage.get('username'));
    }
  },
  PostRender: function() {
    $('#BlissEmail').focus();
    var that = this;
    $('#BlissPassword').keypress(function(e){
      if (e.which == 13) {
        $(this).blur();
        that.submit();
      }
    });
  },
  //Over-ride save method - we're dealing with User object which is special
  save: function(callback) {
    var email    = $('#BlissEmail').val();
    var username = email;
    var password = this.getModel().get('BlissPassword');
    var current_user = User.current();

    if (current_user) {
      this.updateUser(current_user, email, password);
    }
    else {
      //Create user should only really run if something goes wrong
      //Since there should always be an autogenerated Parse account active
      this.createUser(email, password);
    }
  },
  updateUser: function(current_user, email, password) {
    current_user.set('username', email);
    current_user.set('email', email);
    current_user.set('password', password);
    current_user.set('manually_created', true);
    var that = this;
        
    current_user.save(null, {
      success: function() {
        Storage.set({username: email, pass: password});
        //Update credentials in our chrome app (if this is the website)
        //chrome.runtime.sendMessage(Bliss.chromeExtensionId, {action: 'update_credentials', username: username, pass: password}, function(response) {});
        //callback.call(that);
        that.bliss_exit = true;
        Bliss.message('Account Created for '+ email);
        setTimeout(function(){
          location.reload();
        }, 2000);
      },
      error: function(promise, error) {
        Bliss.logError(error, 'parse-signup');
        Bliss.message(error.message);
      }
    });
  },
  createUser: function(email, password) {
    var user = new Parse.User();
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    user.set('manually_created', true);
    var that = this;
     
    user.signUp(null, {
      success: function(user) {
        Bliss.message('Account Created for '+ email);
        Storage.set({username: email, pass: password});
        setTimeout(function(){
          location.reload();
        }, 2000);
      },
      error: function(user, error) {
        Bliss.logError(error, 'parse-signup');
        Bliss.message(error.message);
      }
    });
  }
});
