BestFutureExercise = BlissExercise.extend({
  name: 'BestFutureExercise',
  display_name: 'Best Possible Future',
  description: "Increase happiness and motivation with a compelling vision of future.",
  displayInPopup: 'when_scheduled',
  intro: 'best-future-intro.tpl.htm',
  templates: ['best-future.tpl.htm'],
  review_templates: ['BestFutureExercise-review.tpl.htm'],
  fields: {
    personal: {defaultValue: '', dataType: 'string'},
    social: {defaultValue: '', dataType: 'string'},
    professional: {defaultValue: '', dataType: 'string'},
  },
  init: function() {
  },
  completionMessage: 'Your Best Possible Future exercise has been saved.',
});

