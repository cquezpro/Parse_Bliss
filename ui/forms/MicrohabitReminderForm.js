MicrohabitReminderForm = BlissForm.extend({
  name: 'MicrohabitReminderForm',
  display_name: 'MicrohabitReminderForm',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  templates: ['MicrohabitReminderForm.tpl.htm'],
  dataClass: 'MicrohabitReminderForm',
  dataLoad: {startDate: 0},
  fields: {
    MicrohabitReminderForm: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: 'Your MicrohabitReminderForm entry has been saved.',
});

