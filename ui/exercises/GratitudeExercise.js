GratitudeExercise = BlissExercise.extend({
  name: 'GratitudeExercise',
  display_name: 'Gratitude Journal',
  displayInPopup: 'when_scheduled',
  description: "Build a happier brain with this simple, widely-used exercise",
  intro: 'gratitude-intro.tpl.htm',
  templates: ['gratitude.tpl.htm'],
  review_templates: ['gratitude-review.tpl.htm'],
  fields: {
    gratitude: {defaultValue: '', fieldType: 'multistring', dataType: 'string', minFields: 3, maxFields: 3},
  },
  completionMessage: 'Your Gratitude Journal exercise has been saved.',
});

