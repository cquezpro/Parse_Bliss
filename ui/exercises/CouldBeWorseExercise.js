CouldBeWorseExercise = BlissExercise.extend({
  name: 'CouldBeWorseExercise',
  display_name: 'Could Be Worse',
  description: "Appreciate what you have by considering how much worse things could be",
  displayInPopup: 'when_scheduled',
  intro: 'CouldBeWorseExerciseIntro.tpl.htm',
  templates: ['CouldBeWorseExercise.tpl.htm'],
  review_templates: ['CouldBeWorseExercise-review.tpl.htm'],
  fields: {
    CouldBeWorseExercise: {defaultValue: '', dataType: 'string'},
  },
  PostRender: function() {
    $('textarea').focus();
  },
  completionMessage: 'Your Could Be Worse entry has been saved.',
});

