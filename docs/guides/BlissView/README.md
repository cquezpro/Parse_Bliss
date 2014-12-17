#BlissView


BlissView extends backbones View class to provide specific functionality for Forms and Exercises. 

BlissView loads data from a model or collection and displays a series of templates which the user can move through. This allows to create multi-step forms, creating a template file for each step.  BlissViews will display the next template on submission, until there are no templates left, and then run a completion callback, which normally removes the view from the DOM.

The BlissForm and BlissExercise both extend BlissView with very little change.  In the future, we may move Exercise related code into BlissExercise, or we may eliminate BlissExercise and BlissForm and just use BlissView

##Creating a new form or exercise

To create a new form or exercise, you should create a sub-class of BlissForm or BlissExercise, both of which extend BlissView.

There are bash scripts for automatically creating a new exercise / form from a template:

/dev/scripts/addexercise/addexercise.sh
/dev/scripts/addexercise/addexercise.sh

The basic sub-class declaration looks like this:

    @example
    MyForm = BlissForm.extend({
      name: 'MyForm',  //Each view must provide a unique name
      dataClass: 'MyForm', //The key to use for model / collection retrieval - defaults to MyForm.name
      modelClass: ParseCollection, //The class that will act a collection, defaults to ParseCollection
      display_name: 'My Cool Form', //Name shown to the user
      templates: ['MyForm.tpl.htm'], //Either an array of templates, or a function returning an array of templates
      fields: {  //An objects containing fields that will be loaded by the model
        myfield: {dataType: 'boolean', defaultValue: true, fieldType: 'checkbox'},
      },
      //BLISS VIEW HOOKS
      Init: function() {
        //Initialization code
      },
      PreRender: function() {
        //Do stuff before view is rendered
      },
      PostRender: function() {
        //Set custom event handlers or other things after view is rendered
      },


##BlissView Hooks

You can implement hooks in your sub-class of BlissForm and BlissExercise (inherited from BlissView)

Available Hooks
-Init
-PreRender
-PostRender
-ChangeHandler
-PreSubmit


###Init

First hook called when a View is created.  Useful sometimes for settings default values for fields with generated values that aren't available at class declaration.

i.e.
    @example
    Init: function() {
      this.fields.mood_tracker_times_per_day.defaultValue = new SplitTest('Initiator-launches-per-day').values([1,2,3]); 
    },

###PreRender

Called before the template is paired with data from the model and rendered. Mainly useful for setting data that must be determined at run time and 
can't be defined in the fields

    @example
    PreRender: function() {
      //Get the model that is currently bound to our view
      var model = this.getModel();
      if (Bliss.getRandomInt(1, 100) == 100) {
        model.set('winner', true);
        Bliss.message("You are the lucky winner of an all-expense paid trip to Hawaii!");
      }
    }

###ChangeHandler

Called whenever a form element is changed.  If you set one on the field, it's your responsibility to update the model:

    @example
    fields: {
      myfield: {dataType: 'boolean', defaultValue: true, fieldType: 'checkbox', ChangeHandler: 'myChangeHandler'},
    },

    myChangeHandler: function(field, value, changed) {
      this.getModel().set(field.name, value);
    }

##TemplateHooks

If you only want your code to run when a specfic template is loaded, you can use a template hook.

    @example
    templateHooks: {
      'honoring-people-email.tpl.htm': {
        //The following hooks only run when honoring-people-email.tpl.htm is loaded
        //And will not run for other templates in the view
        PreRender: function() {
          Bliss.message('Your Honoring People exercise has been saved.')
          this.save();
        },
        PostRender: function() {
          var that = this;
          $('a.email').click(function(e){
            that.getModel().set('email_link_clicked', 1);
            that.save();
          });
        }
      }
    }





