Parse.initialize(Bliss.appId, Bliss.javascriptId);
var User = function(callback) {
  var that = User;
  Storage.loadAll(function(data) {
    if (User.current() && User.current().get('username') != Storage.get('username')) {
      Bliss.log('Parse / localStorage missmatch, logging user out');
      User.logOut();
    }
    var currentUser = User.current();
    if (currentUser) {
      Bliss.log('returning current user '+ currentUser.id);
      User.loginSource = 'current user';
      callback.call(null, currentUser);
    }
    else if (typeof data.username == "undefined" || typeof data.pass == 'undefined') {
      User.requireLogin(callback);
    }
    else {
      Parse.User.logIn(data.username, data.pass, {
        success: function(user) {
          Bliss.log('Logged user in successfully');
          User.parseUser = user;
          callback.call(null, user);
        },
        error: function(user, error) {
          User.requireLogin(callback);
          Bliss.log('Error logging user in');
          Bliss.logError(error, 'user_signin', {username: data.username, pass: data.pass, code: error.code});
        }
      });
    }
  });
}
User.current = function() {
  return Parse.User.current();  
}

User.logOut = function() {
  Parse.User.logOut();
}
User.requireLogin = function(callback) {
  var current_view = Bliss.getUrlParam('exercise')
  //TODO: Need to make sure this never happens outside of Bliss
  if (current_view && current_view != 'LoginForm' && current_view != 'CreateAccountForm') {
    window.location.href = Bliss.getExerciseUrl('LoginForm') + '&redirect='+ current_view;
  }
  else {
    callback.call(null, false);
  }
}

User.createAccount = function(callback) {
  Storage.loadAll(function() {
    Bliss.log('Creating new user account');
    username = Bliss.getRandomString(12);
    pass     = Bliss.getRandomString(12);
    Storage.set({'username': username, 'pass': pass});
    User.parseUser = new Parse.User();
    User.parseUser.set("username", username);
    User.parseUser.set("password", pass);
     
    User.parseUser.signUp(null, {
      success: function(user) {
        callback.call(null, user);
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        Bliss.logError(error, 'account_creation');
        alert("Error: " + error.code + " " + error.message);
      }
    });
  });
}

User.current = function() {
  return Parse.User.current();  
}

User.set = function() {
  return User.parseUser.set.apply(this.parse, arguments);
}

User.get = function() {
  return User.parseUser.get.apply(this.parse, arguments);
}

User.save = function() {
  return this.parseUser.save.apply(this.parse, arguments);
}


