
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var _ = require('underscore');
var moment = require('moment');


Parse.Cloud.define("fixAcl", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user      = {};
  var obj_ids   = [];

  var query = new Parse.Query(request.params.class);
  var count = 0;
  query.limit(1000);
  query.ascending("updatedAt");
  query.find().then(function(exercises) {
    _.each(exercises, function(exercise) {
      user = exercise.get('user');
      if (user) {
        var existing_acl = exercise.getACL();
        if (existing_acl && existing_acl.getPublicReadAccess()) {
          count++;
        }
        var acl = new Parse.ACL(user);
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        exercise.setACL(acl);
      }
      else {
        obj_ids.push(exercise.id)
      }
    });
    Parse.Object.saveAll(exercises, {
      success: function(exercise) {
        response.success({message: 'success!', failed: obj_ids});
      },
      error: function(exercise, error) {
        response.success(error);
      }
    });
  //    response.success({ids: obj_ids, count: count});
  });
});

Parse.Cloud.define("fixUserAcl", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user      = {};
  var obj_ids   = [];

  var query = new Parse.Query(request.params.class);
  var count = 0;
  query.limit(100);
  query.ascending("updatedAt");
  query.find().then(function(users) {
    _.each(users, function(user) {
      if (user) {
        var acl = new Parse.ACL(user);
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        user.setACL(acl);
      }
      else {
        obj_ids.push(user.id)
      }
    });
    Parse.Object.saveAll(users, {
      success: function(user) {
        response.success({message: 'success!', failed: obj_ids});
      },
      error: function(user, error) {
        response.success(error);
      }
    });
  //    response.success({ids: obj_ids, count: count});
  });
});
