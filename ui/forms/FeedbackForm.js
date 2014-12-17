FeedbackForm = BlissForm.extend({
  name: 'FeedbackForm',
  display_name: 'Feedback',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  templates: ['FeedbackForm.tpl.htm'],
  dataClass: 'FeedbackForm',
  dataLoad: {startDate: Bliss.startOfDay()},
  fields: {
    feedback: {defaultValue: '', dataType: 'string'},
    rating: {defaultValue: 5, fieldType: 'slider', dataType: 'number'},
  },
  completionMessage: 'Thanks for your feedback!'
});

