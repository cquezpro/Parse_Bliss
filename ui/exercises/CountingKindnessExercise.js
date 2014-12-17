CountingKindnessExercise = BlissExercise.extend({
  name: 'CountingKindnessExercise',
  display_name: 'Counting Kindness',
  description: "",
  displayInPopup: 'when_scheduled',
  intro: 'CountingKindnessExerciseIntro.tpl.htm',
  templates: ['CountingKindnessExercise.tpl.htm'],
  review_templates: ['CountingKindnessExercise-review.tpl.htm'],
  fields: {
    CountingKindnessExercise: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your Counting Kindness exercise has been saved.',
});

