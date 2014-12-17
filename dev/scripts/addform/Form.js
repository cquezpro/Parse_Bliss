_Form_Name_ = BlissForm.extend({
  name: '_Form_Name_',
  display_name: '_Form_Name_',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  templates: ['_Form_Name_.tpl.htm'],
  dataClass: '_Form_Name_',
  dataLoad: {startDate: 0},
  fields: {
    _Form_Name_: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your _Form_Name_ entry has been saved.',
});

