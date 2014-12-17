MeaningInWorkExercise = BlissExercise.extend({
  name: 'MeaningInWorkExercise',
  display_name: 'Meaning In Work',
  displayInPopup: 'when_scheduled',
  description: "",
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  intro: 'MeaningInWorkExerciseIntro.tpl.htm',
  description: "Make work more productive and enjoyable",
  templates: ['MeaningInWorkExercise.tpl.htm'],
  review_templates: ['MeaningInWorkExercise-review.tpl.htm'],
  dataClass: 'MeaningInWorkExercise',
  dataLoad: {startDate: Bliss.startOfDay()},
  fields: {
    help_others: {defaultValue: '', dataType: 'string'},
    strengths: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your MeaningInWorkExercise entry has been saved.',
});

