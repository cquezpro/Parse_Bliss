_Exercise_Name_ = BlissExercise.extend({
  name: '_Exercise_Name_',
  display_name: '_Exercise_Name_',
  displayInPopup: 'always',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  intro: '_Exercise_Name_Intro.tpl.htm',
  templates: ['_Exercise_Name_.tpl.htm'],
  dataClass: '_Exercise_Name_',
  dataLoad: {startDate: Bliss.startOfDay()},
  fields: {
    _Exercise_Name_: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your _Exercise_Name_ entry has been saved.',
});

