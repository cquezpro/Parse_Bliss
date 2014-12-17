SavoringExercise = BlissExercise.extend({
  name: 'SavoringExercise',
  display_name: 'Savoring',
  description: "'Treat yourself' with this scientifically proven method for increasing pleasure",
  displayInPopup: 'when_scheduled',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  intro: 'SavoringExerciseIntro.tpl.htm',
  templates: ['SavoringExercise.tpl.htm'],
  review_templates: ['SavoringExercise-review.tpl.htm'],
  fields: {
    SavoringExercise: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your Savoring exercise has been saved.',
});

