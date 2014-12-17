MotivationForm = BlissExercise.extend({
  name: 'MotivationForm',
  dataClass: 'Motivation',
  bodyClasses: 'challenge-page',
  normal_exercise: false,
  display_name: 'Motivation',
  description: "",
  id: 'user-form',
  templates: ['motivation.tpl.htm'],
  fields: {
    reasons: {defaultValue: '', fieldType: 'checkboxes', dataType: 'string'},
    other: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: '',
  PostRender: function() {
  }
});
