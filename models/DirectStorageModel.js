/**
 *  A model that wraps up our /classes/Storage.js class
 *
 *  NOTE: This class should go away after we refcactor Storage.js to use Storage Model - it's just a temporary fix
 *  
 */
function DirectStorageModel() {
  console.log(this);
  this.load();
}

extend(DirectStorageModel, StorageModel);

DirectStorageModel.prototype.load = function() {
  var that = this;
  console.log('THAT');
  console.log(that);
  Storage.get(null, function(attributes) {
    that.attributes = attributes;
    if (attributes.createdAt) {
      that.createdAt = attributes.createdAt;
    }
    that.loaded = true;
    that.runOnLoadCallback();
  });
};

// @attrs - not actually implemented
//TODO: Need to wrap parse models to remove need for this arg
DirectStorageModel.prototype.save = function(attrs, callbacks) {
  var that = this;
  Storage.set(this.attributes, function() {
    console.log(chrome.runtime.lastError);
    if (callbacks && callbacks.success) {
      callbacks.success.call(null, true);
    }
  });
  return this;
};

DirectStorageModel.prototype.delete = function() {
  //Storage.wrapper.remove(this.getKey());
};

//Here for compatibility with Parse.com objects
DirectStorageModel.prototype.destroy = function() {
  //this.delete();
};
