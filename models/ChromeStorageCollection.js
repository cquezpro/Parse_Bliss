/**
 *  Functionality for loading a collection of models from ChromeStorage
 *  
 *  name - the name of the class which will be loaded
 *  Extends AbstractCollection
 *
 */
function ChromeStorageCollection(name, options) {
  ChromeStorageCollection.superclass.constructor.apply(this, arguments);
  this.modelClass = StorageModel;
}
extend(ChromeStorageCollection, AbstractCollection);

ChromeStorageCollection.prototype.getKey = function() {
  return 'storage-collection-' + this.name;
}

/**
 * Returns true on success, false on error
 */

ChromeStorageCollection.prototype.load = function(callback) {
  //If already loaded, run callback
  if (this.loaded) {
    callback.call(this, true);
  }
  //Else, load collection
  else {
    var key = this.getKey();
    var that = this;
    Storage.get(key, function(collection) {
      if (typeof collection != 'undefined') {
        that.loadModels(collection, callback); 
      }
      else {
        that.loaded = true;
        that.afterLoad(callback);
      }
    });
  }
}

ChromeStorageCollection.prototype.loadModels = function(collection, callback) {
  var that = this;
  //Start at 1 because we must finish looping before we can consider models loaded
  var loadCount = 1; 
  $.each(collection, function(key, model_id) {
    var model = new that.modelClass(model_id);
    loadCount++;
    model.onLoad(function(model) {
      that.models.push(model);
      loadCount--;
      if (loadCount == 0) {
        that.loaded = true;
        that.afterLoad(callback); 
      }
    });
  });
  loadCount--;
  if (!loaded && loadCount == 0) {
    this.afterLoad(callback);
  }
}

ChromeStorageCollection.prototype.afterLoad = function(callback) {
  this.last();
  callback.call(this, true);
}

ChromeStorageCollection.prototype.addModel = function(attributes) {
  console.log('addModel');
  console.log(this);
  return this._addModel(attributes);
}

//Adds a model to the collection and moves pointer to that model
ChromeStorageCollection.prototype._addModel = function(attributes) {
  attributes = (typeof attributes != 'undefined') ? attributes : {};
  var model  = new this.modelClass(attributes, this);
  this.models.push(model);
  return this.last();
}

ChromeStorageCollection.prototype.removeModel = function(id) {
  var index = this.getIndexById(id);  
  this.models.splice(index, 1);
}

ChromeStorageCollection.prototype.save = function(callback) {
  var model_ids = [];   
  $.each(this.models, function(key, model) {
    model_ids.push(model.id);
  });

  var obj = {};
  var key = this.getKey();
  obj[key] = model_ids;

  Storage.set(obj, function() {
    console.log('save collection');
    console.log(chrome.runtime.lastError);
    callback.call(null, true);
  });
}

ChromeStorageCollection.prototype.delete = function() {
    if (chrome.storage) {
      Storage.remove(this.getKey());
    }
  }
