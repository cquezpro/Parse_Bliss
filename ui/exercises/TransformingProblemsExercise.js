TransformingProblemsExercise = BlissExercise.extend({
  name: 'TransformingProblemsExercise',
  display_name: 'Transforming Problems',
  description: "Turn the most troubling things in your life into sources of meaning.",
  displayInPopup: 'when_scheduled',
  intro: 'transforming-problems-intro.tpl.htm',
  templates: ['transforming-problems.tpl.htm'],
  review_templates: ['transforming-problems-review.tpl.htm'],
  fields: {
    problem: {defaultValue: '', dataType: 'string'},
    transformation: {defaultValue: '', dataType: 'string'},
    response: {defaultValue: '', dataType: 'string'}
  },
  completionMessage: 'Your Transforming Problems exercise has been saved.',
});

