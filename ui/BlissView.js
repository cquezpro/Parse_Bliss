/**
 *  @class BlissView
 *  @extends Backbone.View
 *  
 *  Our base UI class for displaying exercises and forms.  Views typically display a series of one or more templates, which are populated
 *  with data from a provided model class, or a collection class containing multiple models. Binding with collections allows a user to, for instance, flip through
 *  all the Gratitude Journal entries she has submitted.
 *
 */
BlissViewObj = {
  selector: undefined,
  /** @property {String} name  a unique name for the view */
  name: null,
  /** @property {String} dataClass  Storage key for the model or collection from which to load */
  dataClass: null,  
  /** @property {String} bodyClasses  Space seperated string of CSS classes to add to the page body */
  bodyClasses: '', 
  /** 
   * @property collectionClass The collection class which provides models for the view. Allows loading from different storage types 
   * For example: {@link ChromeStorageCollection} or {@link ParseCollection}
   */
  collectionClass: null, 
  /** 
   * @property modelClass  The class which will serve as a model. Allows loading from different storage types 
   * Such as: {@link StorageModel}
   *
   */
  modelClass: null,
  /** @property {Object} dataLoad  Params passed to our collection class for loading models */
  dataLoad: {},
  /** @property {String}  templateDir Directory from which to load templates */
  templateDir: null,
  /** @property {String[]/Function} templates  an array of templates to use for the view, or a function which will callback with an array
   * i.e. function(callback) { callback.call(this, myCoolTemplates); }
   */
  templates: [],
  events: {
    "change input": "changed",
    "change textarea": "changed",
    "change select": "changed",
    "input input[type='range']": "changed",
    "keypress input": "trackChange",
    "keypress textarea": "trackChange",
    "blur input": "blur",
    "remove_view": "remove_view",
    "click #submitButton": "submit", 
    "click #nextButton": "nextButtonHandler", //Load next template
    "click #next": "view_action_next",  //Load Next model
    "click #previous": "view_action_prev", //Load Previous model
    "click .view_action_edit": "view_action_edit", //Edit model
    "click .view_action_delete": "view_action_delete", //Delete model
    "click .view_action_add": "view_action_add", //Add model
  },
  //TODO: Refactor to use standard handler schema
  nextButtonHandler: function() {
    var view_duration = this.getTemplateViewDuration();
    this.logEvent('view_next_temp', {duration: view_duration});
    var that = this;
    //Bug with jquery fadeOut - using remove instead
    $(this.selector).fadeOut('fast', function(){
      that.displayNextTemplate();
    });
  },
  /** @property {Object/Function} fields  an object of field definitions keyed by name, to use for the view, or a function which will callback with an array
   * such as {field_name: {defaultValue: 19, type: 'number'}, second_field:...},
   * or function(callback) { callback.call(this, myCoolFields); }
   * @property fields.field 
   * @property {String} fields.field.name  a unique name of the field for data storage, i.e. 'favorite_color'
   * @property {"string"/"number"/"boolean"} fields.field.dataType  Type of data stored in this view
   * @property {String} fields.field.defaultValue  Value to display for field if field is not set in our model
   */
  fields: {
  },
  /** @property {Object} constants  An object of constants, keyed by name - Use this for static values that are accessible in templates but which we don't want 
   * to save to the server. You can put any data here needed by the view which does not change */
  constants: {
  },
  /** @property {String} intro The template which will only be shown the first time user submits the exercise */
  intro: null,
  /** @property {Object} templateHooks  An object keyed by template name, containing objects with functions for any implemented hooks
   *    @example
   *    templateHooks: {
   *      'supercool-template.tpl.htm': {
   *        'PostRender': function() {
   *          alert('super cool template has been rendered!');
   *        }
   *      },
   *    }
   *
   */
  templateHooks: {},
  //Implement Slide Interface
  onCompleteCallbacks: [],
  onComplete: function(callback) {
    this.onCompleteCallbacks.push(callback);
  },
  /** Called by BlissView on completion. Executes callbacks after the user submits the view */
  runOnCompleteCallbacks: function() {
    $.each(this.onCompleteCallbacks, function(key, callback) {
      callback.call(null);
    });
  },
  /**
   * Returns data for a field, or an array of all fields if name is not specified
   * @param {String} [name]  name of the field to get data for
   * @return {Object/Object[]}  field
   * @return {Object}  field.name  the name of the field
   * @return {"string"/"number"/"boolean"} field.dataType 
   * @return {String} field.defaultValue
   *
   */
  getFieldData: function(name) {
    if (name) {
      return this.fields[name];
    }
    else {
      return this.fields;
    }
  },
  /**
   * Returns an object of default field values keyed by name  
   * @return {Object} defaultValues {fieldname: value,...}
   **/
  getDefaultFieldValues: function() {
    var that = this;
    var defaultValues = {};
    var model = this.getModel();
    $.each(this.fields, function(name, field) {
      //First get default value if provided by the model
      if (model.getDefault && typeof(model.getDefault(name)) != 'undefined') {
        defaultValues[name] = that.setFieldDataType(name, model.getDefault(name));  
      }
      //Else get if defined by the sub-class
      else {
        defaultValues[name] = that.setFieldDataType(name, field.defaultValue);  
      }
    }); 
    return defaultValues;
  },
  /** @static {'ChangeHandler', 'KeypressHandler', 'Init', 'PreRender', 'PostRender'} 
   *  Hooks which may be implemented by a sub-class of BlissView 
   */
  hooks: ['ChangeHandler', 'KeypressHandler', 'Init', 'PreRender', 'PostRender'],
  /**
   * Loads fields from BlissView sub-class and returns via provided callback
   * Callback is needed because fields for a view may be loaded asynchronously from storage
   * @param {Function} callback
   */
  loadFields: function(callback) {
    var that = this;
    //Fields is a function, load dynamically
    if (typeof(this.fields) == 'function') {
      this.fields.call(this, function(fields){  
        that.fields = fields;
        callback.call(that);
      });
    }
    //Fields is static (not a function) 
    else {
      callback.call(that);
    }
  },
  initFields: function() {
    var that = this;
    $.each(this.fields, function(name, field) {
      that.fields[name].name = name;

      //Set handlers for special field types, if not specified by sub-class
      $.each(that.hooks, function(index, handler) {
        if (!field[handler] && that[field.fieldType + handler]) {
          that.fields[name][handler] = field.fieldType + handler;
        }
      });
      //Init handler
      if (field.Init) {
        that[field.Init].call(that, field);  
      }
    });
  },
  setFieldDataType: function(name, value) {
    if (this.fields[name]) {
      var type = this.fields[name].dataType;
      switch (type) {
        case 'number':
          return Number(value);
          break;
        case 'string':
          return String(value);
          break;
        case 'boolean':
          return (value == true)
        case undefined:
          Bliss.alert("You must set a dataType for field "+ name +" use 'string' or 'number'");
          break;
        default:
          Bliss.alert("'"+ type  +"' is not a valid dataType ("+ name +") use 'string' 'number' or 'boolean'");
      }
    }
  },
  initialize: function(collection, options) {
    this.defaults = {completeBehavior: 'closeOut'};
    this.options  = $.extend(this.defaults, options);
    //MUST INITIALIZE ALL INSTANCES VARIABLES HERE
    //OR THEY WILL BE SHARED BETWEEN SUBCLASSES
    this.templateNumber = 0;
    this.onCompleteCallbacks = [];
    this.character_count = 0;
    this.unsaved_changes = 0;
    if (!this.name) {
      Bliss.error("You must provide a name in your sub-class of BlissForm");
    }
    if (!this.templateDir) {
      Bliss.error("No template directory is defined by sub-class!");
    }
    if (!this.dataClass) {
      this.dataClass = this.name;
    }
    if (typeof this.templates == 'string') {
      this.templates = [this.templates];
    }
    else if (this.template && typeof this.template == 'string') {
      this.templates = [this.template];
    }
    else if (typeof this.templates == 'undefined') {
      Bliss.error("You must provide an array templates in your sub-class '"+ this.name +"' of BlissForm");
    }
    if (this.collectionClass && this.modelClass) {
      Bliss.error('You many specify a modelClass or collectionClass, but not both ('+ this.name +')');
    }
    this.collection = collection ? collection : false;

    this.mode = this.options.mode ? this.options.mode : 'edit';

    $('body').append(this.$el);
    //TODO: This is a bit conflated with the Init hook in renderTemplate - Split into 2 different hooks?
    this.executeHook('Init');
    var that = this;
    var unsaved_prompt = new SplitTest('unsaved_prompt').values({normal: 'You have unsaved changes.', loss: 'Your changes will be permanently lost.'});
    window.onbeforeunload = function(e) {
      e = e || window.event;
      // For IE and Firefox prior to version 4
      if (!that.bliss_exit) {
        var view_duration = that.getTemplateViewDuration();
        that.logEvent('view_early_exit', {duration: view_duration, character_count: that.character_count, unsaved_changes: that.unsaved_changes}, false);
      }
      if (that.unsaved_changes && !that.ignoreUnsaved) {
        if (e) {
          e.returnValue = unsaved_prompt;
        }
        that.getModel().set('unsaved_prompt', 1);
        return unsaved_prompt;
      }
    }
    //Set a default collection class
    if (!this.collectionClass && !this.modelClass) {
      this.collectionClass = ParseCollection;
    }
    if (Bliss.getEnvironment() == 'phonegap') {
      this.modelClass = StorageModel;
      delete this.collectionClass;
    }
  },
  initTemplates: function() {
    var templates = this.getMode() == 'review' ? this.review_templates : this.templates;
    if (typeof templates == 'function') {
      this.templateStack = templates();
    }
    else {
      this.templateStack = templates.slice();
    }
  },
  /**
   *  Loads the view and inserts it into the DOM
   */
  deploy: function() {
    this.loadFields(function() {
      this.loadData(function() {
        this.logEvent('view_deploy');
        this.initTemplates();
        $('body').addClass(this.bodyClasses);
        //If form has introduction, check if user has submitted before
        if (this.intro) {
          if (this.isFirstDeploy() || this.options.show_intro) {
            //Add intro to our template array for first time users
            this.templateStack.unshift(this.intro);
          }
          this.displayNextTemplate();
        }
        //Otherwise display first template
        else {
          this.displayNextTemplate();
        }
      });
    });
  },
  loadData: function(callback) {
    debugger;
    if (this.collectionClass) {
      this.loadCollection(callback);
    }
    else if (this.modelClass) {
      this.loadModel(callback);
    }
  },
  loadCollection: function(callback) {
    //If a collection was not passed on instantiation, load one from the dataClass
    if (this.collectionClass && !this.collection) {
      this.collection = new this.collectionClass(this.dataClass, {dataLoad: this.dataLoad});
    }
    var that = this;
    //Function below is in the scope of our model
    // this = collection model, that = BlissView
    this.collection.load(function(success) {
      if (success) {
        if (that.options.bliss_id) {
          this.goToId(that.options.bliss_id);
        }
        else {
          //Set pointer to last (most recent) exercise
          this.last();
        }
        if (this.length() == 0 || that.showBlankForm()) {
          this.addModel();
        }
        callback.call(that, this.getModel()); 
      }
    });
  },
  loadModel: function(callback) {
    var that = this;
    this.model = new this.modelClass(this.dataClass);
    this.model.onLoad(function() {
      callback.call(that);
    });
  },
  /**
   * Returns last time the view was submitted by current user from storage
   *   @return {Number} timestamp  unix time stamp for submit time
   * */
  getLastSubmit: function() {
    return Storage.get(this.name +'-last-submit') ? Number(Storage.get(this.name +'-last-submit')) : false;
  },
  /**
   * Sets last time the view was submitted by current user in storage
   *   @param {Number} timestamp  unix time stamp for submit time
   * */
  setLastSubmit: function(timestamp) {
    timestamp = typeof timestamp != 'undefined' ? timestamp : Bliss.getTime();
    Storage.set(this.name +'-last-submit', Bliss.getTime());
  },
  //Increase number of exercises user has submitted by 1
  increaseExerciseCount: function() {
    var count = Storage.get('exercises_submitted');
    count = count ? Number(count) : 0;
    count++;
    Storage.set('exercises_submitted', count);
  },

  /**
   * Returns true if user has not yet submitted this view
   *   @return {Boolean}
   */
  isFirstDeploy: function() {
    return this.collection.savedCount() == 0  ? true : false;
  },
  executeHook: function (hook_name) {
    //turn arguments into a real array
    var args = Array.prototype.slice.call(arguments, 0);
    var hook_name = args.shift();
    //First execute hook class implementation of hook, if exists
    if (this[hook_name]) {
      this[hook_name].apply(this, args);
    }
    //Next execute template hook, if current template has one specified
    if (this.templateHooks[this.currentTemplate] && this.templateHooks[this.currentTemplate][hook_name]) {
      this.templateHooks[this.currentTemplate][hook_name].apply(this, args);  
    }
    var that = this;
    //Finally execute any hooks set on the field
    $.each(this.getFieldData(), function(key, field) {
      if (field && field[hook_name]) {
        //Change handler should only fire on the field that has changed
        //Can't think of a more elegant way to do that
        if (hook_name != 'ChangeHandler' || field.name == args[0].name) {
          //Add field to our arguments array, it's needed by field-level hooks
          var field_args = [field].concat(args); 
          if (typeof field[hook_name] == 'function') {
            field[hook_name].apply(that, field_args);
          }
          else if (typeof that[field[hook_name]] == 'function') {
            that[field[hook_name]].apply(that, field_args);
          }
          else {
            Bliss.error(hook_name +' handler "'+ hook_name +'" for field "'+ field.name +'" is not a function or the name of a class method');
          }
        }
      }
    });
  },
  executeFieldHook: function(hook, field) {
  },
  /**
   *  Displays the next template in the current view
   *
   *  Load template, load data, bind together, insert into DOM and set up event handlers
   *
   */
  displayNextTemplate: function() {
    var that = this;
    //Fade out current template
    this.loadNextTemplate(function(template) {
      if (template) {
        that.logEvent('template_display');
        that.currentTemplateDisplayTime = Bliss.getTime();
        that.renderTemplate();
      }
      else {
        this.complete();
      }
    });
  },
  //Load HTML for a template
  loadNextTemplate: function(callback) {
    this.currentTemplate = this.templateStack.shift();
    if (this.currentTemplate) {
      var url = Bliss.getLocalUrl(this.templateDir + this.currentTemplate);
      var that = this;
      $.get(url, function(html) {
        that.retrievedTemplate = _.template(html);
        callback.call(that, that.retrievedTemplate);
      });
    }
    else {
      callback.call(this, false);
    }
  },
  /**
   *  Return the current model that the view is using
   *  @return model
   *  @return {Function} model.get
   *  @return {Function} model.set
   *  @return {Object}   model.params
   *
   */
  getModel: function() {
    if (this.collection) {
      return this.collection.getModel();
    }
    else {
      return this.model;
    }
  },
  /**
   *  Returns true if we should load the view with a blank form, based on last user submission
   *  and properties set in sub-class
   */
  showBlankForm: function() {
    if (this.loadOld) {
      return false;
    }
    else if (this.options.mode == 'review') {
      return false;
    }
    else if (this.loadNew) {
      return true;
    }
    var model = this.getModel();

    //var created_time = model.createdAt.getTime() / 1000;
    var today = new Date();
    if (Bliss.formatDate(today) != Bliss.formatDate(model.createdAt)) {
      return true;
    }
    return false;
  },
  /**
   * Add a new model to the Views collection
   */
  addModel: function() {
    this.collection.addModel();
    this.initFields();
  },
  /**
   * Delete the current model being used in the views collection
   */
  deleteModel: function() {
    this.collection.deleteModel();
  },
  changed: function(evt) {
     var changed = $(evt.currentTarget);
     var name = changed.attr('name') ? changed.attr('name') : changed.attr("field");
     if (!name && changed.attr('id')) {
       name = changed.attr('id');
     }
     if (!name) {
       alert('Could not determine field name');
       Bliss.error('Could not find field definition for '+ evt.currentTarget +' in template '+ this.currentTemplate);
     }

     var field = this.getFieldData(name);
     if (field) {
       var value  = this.setFieldDataType(name, changed.val());
       //if no change handler set
       if (!field.ChangeHandler) {
         this.getModel().set(name, value);
       }
       this.executeHook('ChangeHandler', field, value, changed);
     }
     else {
       Bliss.log("No field defined with name '" + name + '"');
     }
  },
  trackChange: function() {
    this.unsaved_changes = true;
  },
  blur: function(evt) {
    this.setCharacterCount();
  },
  keypress: function(evt) {
     //If this is passed explicitly, use that value
     var that = evt.data.this ? evt.data.this : this;
     var changed = $(evt.currentTarget);
     var name = changed.attr('name') ? changed.attr('name') : changed.attr("field");
     name = name ? name : changed.attr('id');
     var field = that.getFieldData(name);

     if (field && field.KeypressHandler) {
       that[field.KeypressHandler].call(that, field, changed);
     }
     if (field.submitOnEnter) {
       this.getModel().set(field.name, changed.val());
       if (evt.which == 13) {
         that.submit();
       }
     }
     //Next template on enter if it's the intro
     if (that.intro && that.templateNumber == 1 && that.isFirstDeploy() && evt.which == 13) {
       that.submit();
     }
  },
  logEvent: function(eventName, data, async) {
    data = data ? data : {};
    async = (async === false) ? false : true;
    var model = this.getModel();
    var params = {view: this.name, templ: this.currentTemplate, num: this.templateNumber};
    if (this.getModel()) {
      params.obj_id = this.getModel().get('bliss_id');
    }
    $.extend(params, data);
    Bliss.logEvent(eventName, params, async);
  },
  /**
   * Submit the view, saving model to storage
   */
  submit: function() {
    var view_duration = this.getTemplateViewDuration();
    this.logEvent('view_submit', {duration: view_duration});
    var that = this;
    this.executeHook('PreSubmit', this.getModel())
    if (this.validate()) {
      this.save(function(){
        this.setLastSubmit(Bliss.getTime());
        this.displayNextTemplate();
      });
    }
  },
  /**
   * Validate data entered in view by the user and display any errors
   * @return {Boolean} Returns true unless there were validation errors
   */
  validate: function() {
    var that = this;
    var errors = [];
    $.each(this.getFieldData(), function(key, field) {
      var model = that.getModel();
      if (field.required && !that.getModel().get(field.name)) {
        that.formError(field);
        errors.push(field);
      }
    });
    
    if (errors.length > 0) {
      $('#'+errors[0].name).focus();
      return false;
    }
    else {
      return true;
    }
  },
  formError: function(field) {
    $('#'+field.name).css({border: '2px solid red'});
    Bliss.message('Field '+ field.name +' is required');
  },
  /**
   * Save the current model in the view
   * @param {Function} callback  called after save
   */
  save: function(callback) {
    var that = this;
    var model = this.getModel();
    model.set('user', User.current());
    if (!model.get('firstSubmit')) {
      model.set('firstSubmit', Bliss.getTime());
    }
    var character_count = this.getCharacterCount();
    model.set('responseTime', model.get('firstSubmit') - model.get('createTime'));
    model.set('character_count', character_count);
    //Set ACL for Parse
    if (model.setACL) {
      var acl = new Parse.ACL(User.current());
      acl.setPublicReadAccess(false);
      acl.setPublicWriteAccess(false);
      model.setACL(acl);
    }
    model.save(null, {
      success: function(data) {
        if (callback) {
          //Count as a legit submitted exercise
          if (character_count > 5 && that.normal_exercise && that.unsaved_changes) {
            that.increaseExerciseCount();
          }
          that.unsaved_changes = false; 
          callback.call(that);
        }
      },
      error: function(data, error) {
        alert('error ('+ error.code +'): '+ error.message);
        Bliss.logError(error, 'saveToParse');
        return false;
      }
    });
  },
  /**
   *  Called after the view is completed in order to close the tab and/or run completion callbacks
   */
  complete: function() {
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.sendMessage({'action': 'exerciseComplete', 'normal_exercise': this.normal_exercise});
    }
    var that = this;
    if (this.options.completeBehavior == 'closeOut') { 
      this.closeOut(function() {
        this.showCompletionMessage();
        this.runOnCompleteCallbacks();
      });
    }
    else if (this.options.completeBehavior == 'saveOnly') {
      Bliss.message('Saved');
      this.runOnCompleteCallbacks();
    }
    else if (this.options.completeBehavior == 'review') {
      Bliss.message('Saved');
      setTimeout(function(){
        that.setMode('review');
      }, 1000);
      this.runOnCompleteCallbacks();
    }
  },
  //Run completion callbacks, remove view, display complete message
  closeOut: function(callback) {
    var that = this;
    this.bliss_exit = true;
    this.clearReminders();

    this.$el.fadeOut(800, function(){
      if (that.bodyClasses) {
        $('body').removeClass(that.bodyClasses);
      }
      callback.call(that);
    });
  },
  showCompletionMessage: function() {
    if (this.completionMessage) {
      Bliss.message(this.completionMessage);
    }
  },
  /**
   *  Get the values from our current model for our template
   *  @return {Object} vars  an object of field values, keyed by name
   */
  getTemplateVars: function() {
    //Set model as a global so we can access from templates
    window.BlissViewModel = this;
    var model = this.getModel();
    var vars  = this.getDefaultFieldValues();
    $.extend(vars, model.attributes);
    vars.createdAt = model.createdAt;
    vars.submit_button_text = new SplitTest('submit-button-text').values(['Submit', 'Save']);
    //Put all vars in attributes obj so we can programatically refer to them in the template if necessary
    //Use $.extend to avoid creating a circular reference
    vars.attributes = $.extend({}, vars);
    $.extend(vars, this.constants);
    return vars;
  },
  renderTemplate: function() {
    var that = this;
    this.executeHook('Init', this.getModel());
    this.initFields();
    this.executeHook('PreRender', this.getModel());
    this.render();
    //Call constructor, which is implemented by sub-classes
  },
  //TODO: Too many render functions, needs to be refactored
  render: function() {
    var that = this;
    if (this.$el.html()) {
      var container = this.$el.parent();
      var child = this.$el.children().first(); //.position('absolute').appendTo(container).fadeOut(800);
      var cssobj = {top: $(child).offset().top, left: $(child).offset().left, position: 'fixed'};
      $(child).css(cssobj).detach().appendTo(container).fadeOut(800);
      that._render();
    }
    else {
      that._render();
    }
  },
  _render: function() {
    var that = this;
    var vars = this.getTemplateVars(); 
    var html = this.retrievedTemplate(vars);
    this.setSelector(html);
  //    this.$el.children().remove();
    var element = $(html).hide();
    $(element).appendTo(that.$el)
    that.templateNumber++;
    $(element).fadeIn(800);
    _.bindAll(that, "changed");

    $('textarea').first().focus();
    that.executeHook('PostRender', that.getModel(), that.currentTemplate);
    that.afterRender();
  },
  //Set top level selector for template based on it's html
  setSelector: function(html) {
    var elements = $.parseHTML(html);
    var that = this;
    $.each(elements, function(key, element) {
      if (element.id) {
        that.selector = '#'+element.id;
      }
    });
    if (typeof this.selector == 'undefined') {
      Bliss.error('Could not get top-level id from template. Malformed template? \r\n '+ html);
    }
  },
  afterRender: function() {
    var that = this;
    $(document).bind('keypress', {'this': that}, this.keypress);
    //jquery autosize textarea plugin
    if ($('textarea').autosize) {
      $('textarea').autosize();
    }
    //If user clicks a launcher deploy the launched view 
    $('.launcher').click(function(e){
      var view = $(this).attr('view');
      view = new window[view]();
      //Hide current view, and re-show after launched view completes
      if (that.displayAfterSubLaunch) {
        $(that.selector).hide();
        view.onComplete(function(){
          $(that.selector).show();
        });
        view.deploy();
      }
      //Remove current view and show new one
      else {
        $(that.selector).remove();
        view.deploy();
      }
    });
    $('.inverse').touchwipe({
      'wipeLeft': function() { that.view_action_next(); },
      'wipeRight': function() { that.view_action_prev(); },
      'preventDefaultEvents': false,
    });
  },
  // View actions allow for manipulating / traversing the collection of models
  // These are used as direct callbacks to click events
  /**
   *  Put the view into review mode
   */
  view_action_review: function(e) {
    if (e) { e.preventDefault(); }
    this.setMode('review');
  },
  /**
   *  Add a new model and put view in edit mode
   */
  view_action_add: function(e) {
    if (e) { e.preventDefault(); }
    this.addModel();
    this.newModel = true;
    this.setMode('edit');
  },
  /**
   *  Put the view into edit mode
   */
  view_action_edit: function(e) {
    if (e) { e.preventDefault(); }
    this.setMode('edit');
  },
  /**
   *  Delete the current model, prompting first for user confimation
   */
  view_action_delete: function(e) {
    if (e) { e.preventDefault(); }
    if (confirm('Are you sure you want to delete this entry?')) {
      var deleted_bliss_id = this.getModel().get('bliss_id');
      this.deleteModel();
      var current_bliss_id = this.getModel() ? this.getModel().get('bliss_id') : false;
      $('body').trigger('delete_model', {current_bliss_id: current_bliss_id, deleted_bliss_id: deleted_bliss_id});
      if (current_bliss_id) {
        this.renderTemplate();
      }
      Bliss.message('Deleted');
    }
  },
  /**
   *  Select and render previous model in the view
   */
  view_action_prev: function(e) {
    if (typeof e != 'undefined') {
      e.preventDefault();
    }
    if (this.collection.prev()) {
      this.renderTemplate();
      this.newModel = false;
    }
    else {
      Bliss.message('You have no previous entries');
    }
  },
  /**
   *  Select and render next model in the view
   */
  view_action_next: function(e) {
    if (typeof e != 'undefined') {
      e.preventDefault();
    }
    if (this.collection.next()) {
      this.renderTemplate();
    }
    else if (!this.newModel && this.options.mode !== 'review') {
      this.collection.addModel();
      this.newModel = true;
      this.renderTemplate();
    }
    else {
      Bliss.message('You have no more entries');
    }
  },
  /**
   * Set the editing mode for the view
   * @param {'review'|'edit'} mode
   */
  setMode: function(mode) {
    this.mode = mode;
    this.initTemplates();
    this.displayNextTemplate();
  },

  /**
   * Get the editing mode for the view
   * @return {'review'|'edit'} mode
   */
  getMode: function() {
    return this.mode;
  },
  /**
   * Fade out the view and remove from DOM
   */
  remove_view: function() {
    //TODO: should be consoldated with code in BlissView::render()
    var that = this;
    var container = this.$el.parent();
    var child = this.$el.children().first(); //.position('absolute').appendTo(container).fadeOut(800);
    var cssobj = {top: $(child).offset().top, left: $(child).offset().left, position: 'fixed'};
    $(child).css(cssobj).detach().appendTo(container).fadeOut(800);
  },
  logReminder: function() {
    var times_reminded = Storage.get(this.name +'-times-reminded');
    times_reminded = times_reminded ? times_reminded : 0;
    Storage.set(this.name +'-times-reminded', Number(times_reminded) + 1);
  },
  clearReminders: function() {
    Storage.remove(this.name +'-times-reminded');
  },
  shouldRemind: function() {
    var times_reminded = Storage.get(this.name +'-times-reminded');
    times_reminded = times_reminded ? Number(times_reminded) : 0;
    //Return true if we have a reminder scheduled for that interval in this.remind_times
    var should_remind = (this.remind_times.indexOf(times_reminded) !== -1);
    return should_remind;
  },
  remind_times: [1,5,10,20,30],
  getTemplateViewDuration: function() {
    var view_duration = Bliss.round(Bliss.getTime() - this.currentTemplateDisplayTime);
    return view_duration;
  },
  /**
   * Retrieve number of characters user has entered in the current view model / template
   * @return {Number} count
   */
  getCharacterCount: function() {
    var that = this;
    var fields = this.getFieldData();
    var count = 0;
    $.each(fields, function(key, field) {
      var val = that.getModel().get(field.name);
      if (typeof val == 'string') {
        count += val.trim().length
      }
    });
    return count;
  },
  setCharacterCount: function() {
    this.character_count = this.getCharacterCount();
  },

  /*
   *  FIELD TYPES
   *  Define custom field types which can be used by sub-classes
   *
   *  If we can think of a good way to move these into separate files, that would be good
   *
   *
   */

  checkboxChangeHandler: function(field, changed) {
    var value = this.$el.find('#'+field.name).prop('checked') == true ? 1 : 0;
    this.getModel().set(field.name, value);
  },

  /*
   *  checkboxes - a field for grouping multiple checkboxes into a single string of values
   */
  checkboxesChangeHandler: function(field, changed) {
    var selector = '#'+field.name+' [name="'+ field.name +'"]:checked';
    var values = [];
    this.$el.find(selector).each(function(index, element) {
      values.push($(element).val());
    });
    this.getModel().set(field.name, values.join(';;'));
  },
  checkboxesPostRender: function(field) {
    var selector = '#'+field.name+' [name="'+ field.name +'"]';
    var values  = field.value ? field.value.split(';;') : [];
    //Check all of our checkboxes
    this.$el.find(selector).each(function(index, element) {
      if (values.indexOf($(element).val()) >= 0) {
        $(element).prop('checked', true);
      }

    });
  },

  /*
   *  multistring - a field to handle multiple textareas as a single string 
   */
  multistringPostRender: function(field) {
    var that = this;
    field.minFields   = field.minFields ? field.minFields : 3;
    field.maxFields   = field.maxFields ? field.maxFields : 100;
    var value         = this.getModel().get(field.name);
    var values  = value ? value.split(';;') : [];
    var inputSelector = '#'+field.name+' [name="'+ field.name +'"]';
    var templateField = this.$el.find(inputSelector).clone();
    field.input       = templateField.is('input') ? 'input' : 'textarea'; 
    //Remove template field now that we have our model
    this.$el.find(inputSelector).remove();
    for (var index = 0; index <= values.length || index < field.minFields; index++) {
      if (index < field.maxFields) {
        var value = values[index] ? values[index] : '';
        var temp  = templateField.clone();
        temp.attr('index', index).val(value);
        this.$el.find('#'+field.name).append(temp);
      }
    }
    $(inputSelector).first().focus();
  },
  multistringChangeHandler: function(field, value, changed) {
    var values     = [];
    var fieldCount = 0;
    var valueCount = 0;
    var inputSelector = '#'+field.name+' [name="'+ field.name +'"]';

    this.$el.find(inputSelector).each(function(index, element) {
      fieldCount++;
      var value = $(element).val();
      if (value) {
        $(element).attr('empty', 'false');
        valueCount++;
        values.push($(element).val());
        $(element).val(value);
      }
      else {
        $(element).attr('empty', 'true');
      }
    });
    this.getModel().set(field.name, values.join(';;'));
    if (valueCount == fieldCount && (valueCount + 1) < field.maxFields) {
      changed.clone().val('').attr('index', fieldCount + 1).appendTo('#'+field.name).focus();
    }
    else if (fieldCount > field.minFields) {
      //Remove empty inputs besides the last
      this.$el.find(inputSelector+"[empty='true']:not(':last')").remove();
    }
  },

  /*
   * Slider field - HTML5 range for taking numeric input (1-10)
   */

  sliderPostRender: function(field) {
    this.sliderSetLabel(field);
    //Show help 
    this.sliderInitHelp(field);
  },
  sliderChangeHandler: function(field, changed) {
    var slide_value = this.$el.find('#'+field.name).val() / 10;
    this.getModel().set(field.name, Number(slide_value));
    this.sliderSetLabel(field);
  },
  //Sets the numerics (1-10) label on the slider
  sliderSetLabel: function(field) {
    var el = this.$el.find('#'+field.name);
    var initial_margin = 0;
    var slide_value = $(el).val() / 10;
    //var ratingWidth = $('#rating').outerWidth() + 1;
    
    //This is tied to the CSS but there's no easy way to calculate it
    //var step = ratingWidth / 10 * 1.77;
    //var adjustment  = (slide_value - 5) * step;
    //Special adjustment for the narrower value '10'
    //var ten_adjust  = slide_value != 10 ? 0 : 1;
    //var margin      = initial_margin + adjustment + ten_adjust; 
    var slide_label = $(el).parent().find('.slide-value');
    //Make decimal, unless value is 10
    slide_value = slide_value != 10 ? slide_value.toFixed(1) : 10;
    $(slide_label).text(slide_value);
    //$('.slider-container .test').css({'width' : ratingWidth});
    //$(slide_label).css({'margin-left': margin});
  },
  sliderInitHelp: function(field) {
    var el, help;
    el   = this.$el.find('#'+field.name);
    help = $(el).parent().find('.help'); 
    $(help).hide();
    //Show help text for keyboard tracker control
    $('#'+field.name).one('mousedown', function(e){
      var keyboard_help_reminds = Storage.get('tracker-keyboard-help');
      keyboard_help_reminds = keyboard_help_reminds ? Number(keyboard_help_reminds) : 0;
      
      if (keyboard_help_reminds < 1) {
        Storage.set('tracker-keyboard-help', keyboard_help_reminds + 1);
        $(help).fadeIn('2000').delay('5000').fadeOut('slow');
      }
    });
  }

}
BlissView = Parse.View.extend(BlissViewObj);
