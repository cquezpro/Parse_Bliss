/*
 *  This is a weird form because we are dealing with values that are initially set by SplitTest, but which
 *  can be overridden by the user. The ugly thing about SplitTest is it requires the testing values to be specified each time the test is instantiated.
 *  The advantage of that is we can easily create SplitTests in code without having to specify all SplitTests in another file
 *
 *  Deciding to allow the ugliness here, because I don't think there will be many similiar instances where we need to pull SplitTest Values, but
 *  if that proves incorrect then we should consider refactoring SplitTest
 *
 *
 */
SettingsForm = BlissForm.extend({
  name: 'SettingsForm',
  display_name: 'Settings',
  templates: ['SettingsForm.tpl.htm'],
  dataClass: 'Settings',
  modelClass: SettingsModel,
  dataLoad: {startDate: 0},
  fields: function(callback) {
    var that   = this;
    var fields = {};
    var trainer  = new Trainer();
    trainer.onLoad(function(){
      var exercises = trainer.getExercises();
      that.constants.exercises = [];
      $.each(exercises, function(key, exercise) {
        if (Bliss.getTime() > exercise.first_scheduled) {
          that.constants.exercises.push(exercise);
          fields[exercise.name + '_enabled'] = {dataType: 'boolean', fieldType: 'checkbox'}
          fields[exercise.name + '_repeat']  = {dataType: 'number'}
        }
      });
      callback.call(that, fields);
    });
  },
  PostRender: function() {
    var that  = this;
    var model = this.getModel();
    $.each(this.constants.exercises, function(key, exercise) {
      if (model.get(exercise.name + '_enabled') == false) {
        $('#'+exercise.name +'_repeat').prop('disabled', true);
      }
      $('#'+exercise.name +'_enabled').change(function(e) {
        //Change fires before value is updated, so get the opposite of current value
        var enabled = !$(e.currentTarget).prop('checked');
        $('#'+exercise.name +'_repeat').prop('disabled', enabled);
      });
    });
  },
  completionMessage: 'Settings saved'
});

