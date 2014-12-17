/**
 *  @class AbstractCollection
 *  @abstract
 *
 *  Abstract class for collections
 *
 *  Collections are a list of related models, which we can navigate through. For instance, we can load a collection for all of a user's Gratitude Journal entries. This
 *  allows us to load all journal entries in collection, and provide them to {@link BlissView} allowing the user to navigate through all entries.
 *
 *  Sub-classes can extend AbstractCollection in order to allow for different storage mechanisms
 *
 */

 /**
  *  @param name  the name of the class which will be loaded. Should be unique to the collection as it is used for storage / retrieval
  *  @param options
  *  @param options.dataLoad  Options pertaining to loading models for the collection
  *  @param options.dataLoad.startDate  {Number} Unix timestamp only load models after this time
  *  @param options.dataLoad.endDate    {Number} Unix timestamp only load models before this time
  */
function AbstractCollection(name, options) {
  var defaults = {dataLoad: {startDate: null}};
  this.options = $.extend(defaults, options);
  this.loaded  = false;
  this.models  = [];
  this.pointer = 0;
  if (!name) {
    throw new Error("You must provide a name in your instantiation of AbstractCollection");
  }
  this.name = name;
}

AbstractCollection.prototype = {
  /**
   * Throw an error if the collection is not yet loaded
   */
  ensureLoaded: function() {
    if (!this.loaded) {
      alert('Model is not loaded ('+ this.name + ')');
      throw new Error('Model is not loaded ('+ this.name + ')');
    }
  },
  /**
   * @abstract
   * Abstract method to load collection which should be implemented by the sub-class
   * @param {Function} callback  Callback function which will be executed when the collection is loaded
   */
  load: function(callback) {
    alert('AbstractiCollection.load must be implemented by your sub-class');
  },
  /**
   * Get the current model indexed in the collection based on our internal pointer
   * @return {Object} model
   */
  getModel: function() {
    return this.models[this.pointer];
  },
  /**
   * Get the attributes of currently index model - field names / values
   * @return {Object} attributes
   */
  getModelAttrs: function() {
    var attrs = [];
    $.each(this.models, function(key, model) {
      attrs.push(model.attributes);
    });
    return attrs;
  },

  /**
   * Return all models in the collection
   * @return {Object[]} models
   */
  getCollection: function() {
    return this.models;
  },
  /**
   * Return number of models in the collection
   * @return {Number} length
   */
  length: function() {
    return this.models.length
  },
  /**
   * Return number of models in the collection that have been saved before (are not newly created)
   * @return {Number} length
   */
  savedCount: function() {
    var count = 0;
    $.each(this.models, function(key, model) {
      if (!model.isNew()) {
        count++;
      }
    });
    return count;
  },
  /** 
   * Set collection index to point to the model with id of 'id'
   * @param {String} id  the id of the model to set the index to
   * @return {Number/Boolean} Index of model. False if model id is not in index
   */
  goToId: function(id) {
    var index = this.getIndexById(id);
    if (index !== false) {
      return this.index(index);
    }
    return false;
  },
  /** 
   * Get index of the model in collection by id 
   * @param {String} id  the id of the model to find the index for
   * @return {Number/Boolean} Index of model. False if model id is not in index
   */
  getIndexById: function(id) {
    var that = this;
    var match = false;
    $.each(this.models, function(key, model) {
      if (model.attributes.bliss_id == id || model.id == id) {
        match = key;
      }
    });
    return match;
  },
  /** 
   * Advances the pointer to the next model and returns it
   * @return {Object/Boolean} model returns false if no model exists
   *
   */ 
  next: function(e) {
    if (this.models[this.pointer + 1]) {
      this.pointer++;
      return this.getModel();
    }
    else {
      return false;
    }
  },
  
  /** 
   * Advances the pointer to the previous model and returns it
   * @return {Object/Boolean} model returns false if no model exists
   */ 
  prev: function(e) {
    if (this.models[this.pointer - 1]) {
      this.pointer--;
      return this.getModel();
    }
    else {
      return false;
    }
  },
  /** 
   * Advances the pointer to the first model and returns it
   * @return {Object} model
   */ 
  last: function() {
    this.index(this.length() - 1)
    return this.getModel();
  },
  /** 
   * Advances the pointer to the last model and returns it
   * @return {Object} model
   */ 
  first: function() {
    this.index(0);
    return this.getModel();
  },
  /** 
   * Advances the pointer to the model at index and returns it, or false if doesn't exist
   * @return {Object/Boolean} model
   */ 
  index: function(index) {
    if (this.models[index]) {
      this.pointer = index;
      return this.getModel();
    }
    else {
      return false;
    }
  },
  /** 
   * Deletes model at current index
   */ 
  deleteModel: function() {
    this.getModel().destroy();
    //Remove model from index
    this.models.splice(this.pointer, 1);
    //Make sure index is still in bounds
    if (!this.models[this.pointer] && this.length() > 0) {
      this.last();
    }
  }
}


