ExerciseTab = Parse.View.extend({
  templateDir: 'ui/review/',
  template: 'ExerciseTab.tpl.htm',
  events: {
    "click .exercise": "exerciseClicked",
    "exercise_select": "exerciseSelect",
  },
  onDeleteModel: function() {
  },
  //Called globally when a user selects an exercise from any exerciseTab
  exerciseSelect: function() {
    //Another exercise has been selected, remove active from all our exercises
    this.$el.find('.exercise').removeClass('active');
  },

  initialize: function(name, collection, target, options) {
    this.defaults = {expanded: true};
    this.options  = $.extend(this.defaults, options);
    this.name = name;
    this.target     = target;
    this.collection = collection;
    this.loaded     = false;
    this.expanded   = this.options.expanded;

    if (!this.templateDir) {
      throw new Error("No template directory is defined by sub-class!");
    }
    if (!this.template) {
      throw new Error("You must provide a template.");
    }
  },
  deploy: function() {
    $(this.target).append(this.$el);
    this.loadTemplate(function(){
      this.render();
      this.loaded = true;
      this.runOnLoad();
    });
  },
  render: function() {
    var that = this;
    var models     = [];
    if (this.collection.length() == 0) {
      this.empty = true;
      this.collection.addModel();
    }
    $.each(this.collection.getCollection(), function(key, model) {
      models.push(model.attributes);
    });


    var html = this.retrievedTemplate({empty: this.empty, models: models, name: this.name, expanded: this.expanded});
    this.$el.html(html);

    this.$el.find('.title').click(function() {
      $(this).toggleClass('active');
      that.$el.find('.exercise-tab').slideToggle('fast');
      that.expanded = !that.expanded;
    });
    this.setEventListeners();

  },
  setEventListeners: function() {
    var that = this;
    $('body').on('delete_model', function(e, args){
      if (that.collection.length() == 0) {
        that.empty = true;
        that.deployExercise('new');
      }
      that.render();
      that.getExerciseById(args.current_bliss_id).addClass('active');
    });

  },
  //Load HTML for a template
  loadTemplate: function(callback) {
    var url = Bliss.getLocalUrl(this.templateDir + this.template);
    var that = this;
    $.get(url, function(html) {
      that.retrievedTemplate = _.template(html);
      callback.call(that, that.retrievedTemplate);
    });
  },

  exerciseClicked: function(evt) {
    var element  = $(evt.currentTarget);
    var bliss_id = element.attr('bliss_id');
    
    $('.exercise-inner').removeClass('expanded');
    
    this.deployExercise(bliss_id);
    
  },
  deployExercise: function(bliss_id) {
    if (!bliss_id) {
      bliss_id = this.collection.getModel().get('bliss_id');
    }
    $('.default, .inverse').trigger('remove_view');
    $('.exercise-tab').trigger('exercise_select');
    var mode = this.empty ? 'edit' : 'review';
    var show_intro = this.empty;
    exercise = new window[this.collection.name](this.collection, {show_intro: show_intro, mode: mode, bliss_id: bliss_id, completeBehavior: 'review'});
    exercise.deploy();
    this.getExerciseById(bliss_id).addClass('active');
    var that = this;
    exercise.onComplete(function(){
      that.empty = false;
      that.render();
      var new_exercise_id = that.collection.getModel().get('bliss_id');
      that.getExerciseById(new_exercise_id).addClass('active');
    });
  }, 
  onLoad: function(callback) {
    this.onLoadCallback = callback;
    if (this.loaded) {
      this.runOnLoad();
    }
  },
  runOnLoad: function() {
    if (this.onLoadCallback) {
      this.onLoadCallback.call();
    }
  },
  getExerciseById: function(bliss_id) {
    return this.$el.find('div[bliss_id="'+ bliss_id +'"]');
  },

  
});
