/**
 *  A Model which can be saved / loaded from Storage
 *
 *  @attributes - either the id of a model to load from storage, or an object of attributes for the model
 *  @callback   - if passing an id, will be called when model loads
 */
function StorageModel(attributes, collection) {
  console.log('running storage model constructor');
  if (collection) {
    this.collection = collection;
  }
  if (!attributes) {
    attributes = {};
  }
  //attributes is just the object id to load
  else if (typeof attributes == 'string' || typeof attributes == 'number') {
    this.id = attributes;
    attributes = {};
  }
  this.attributes = this.defaults;
  $.extend(this.attributes, attributes);

  this.attributes = attributes ? attributes : {};

  if (attributes.id) {
    this.id = this.attributes.id;
  }

  if (!this.id) {
    this.id = Bliss.getRandomString(15);
    this.initNewModel();
    this.loaded = true;
  }
  else {
    this.load();
  }
}

StorageModel.prototype = {
  //Default values for properties - can be over-ridden by sub-classes
  defaults: {},
  //Returns key to identify model for storage
  getKey: function() {
    return 'model-' + this.id;
  },
  isLoaded: function() {
    return this.loaded;
  },
  load: function() {
    var that = this;
    if (Bliss.getEnvironment() == 'chrome') {
      Storage.get(this.getKey(), function(data) {
        if (data && data[that.getKey()]) { 
          attributes = data[that.getKey()];
          that.attributes = attributes;
          if (attributes.createdAt) {
            that.createdAt = attributes.createdAt;
          }
        }
        else {
          that.initNewModel();
        }
        that.loaded = true;
        that.runOnLoadCallback();
      });
    }
    else if (localStorage) {
      if (localStorage[this.getKey()]) {
        this.attributes = JSON.parse(localStorage[this.getKey()]);
      }
      else {
        this.initNewModel();
      }
      this.loaded = true;
      this.runOnLoadCallback();
    }
  },
  initNewModel: function(callback) {
    var time        = Bliss.getTime();
    this.attributes = {id: this.id, createdAt: time, _is_new: true};
    $.extend(this.attributes, this.defaults);
  },
  onLoad: function(callback) {
    if (this.loaded) {
      callback.call(this, this);
    }
    else {
      this.onLoadCallback = callback;
    }
  },
  runOnLoadCallback: function() {
    if (this.onLoadCallback) {
      this.onLoadCallback.call(this, this);
    }
  },
  isNew: function() {
    return this.attributes._is_new;
  },
  get: function(param) {
    if (!this.isLoaded()) {
      Bliss.alert('Must call StorageModel.load before calling .get');
    }
    returnValue = (typeof(this.attributes[param]) != 'undefined') ? this.attributes[param] : this.getDefault(param);
    Bliss.log('StorageModel get '+ param + ' : '+ returnValue);
    return returnValue;
  },
  set: function(params, value, callback) {
    if (!this.isLoaded()) {
      Bliss.alert('Must call StorageModel.load before calling .set');
    }
    if (typeof(value) == 'function') {
      callback = value;
    }
    if (typeof(params) == 'string' || typeof(params) == 'number') {
      //Single variable is being set, format as an object
      obj_to_save = {};
      obj_to_save[params] = value;
      params = obj_to_save;
    }
    else if (typeof(params) == 'object') {
      obj_to_save = params;
    }
    else {
      Bliss.alert('Bad variable id in StorageModel.set '+ params);
      Bliss.log('Bad variable id in StorageModel.set '+ params);
      Bliss.log(params);
    }
    
    $.extend(this.attributes, obj_to_save);
    return this;
  },
  getDefault: function (param) {
    if (this.defaults[param] !== 'undefined') {
      return this.defaults[param];
    }
  },
  // @attrs - not actually implemented
  //TODO: Need to wrap parse models to remove need for this arg
  save: function(attrs, callbacks) {
    var that = this;
    var obj = {};
    obj[this.getKey()] = this.attributes;
    if (chrome.storage) {
      Storage.wrapper.set(obj, function() {
        if (that.collection) {
          that.collection.save();
        }
        console.log(chrome.runtime.lastError);
        if (callbacks && callbacks.success) {
          callbacks.success.call(null, true);
        }
      });
    }
    else if (localStorage) {
      localStorage[this.getKey()] = this.attributes;
    }
    return this;
  },
  unset: function(param, callback) {
    if (!this.isLoaded()) {
      Bliss.alert('Must call StorageModel.load before calling .unset');
    }
    delete this.attributes[param];
    return this;
  },
  delete: function() {
    Storage.wrapper.remove(this.getKey());
  },
  //Here for compatibility with Parse.com objects
  destroy: function() {
    this.delete();
  }
}
