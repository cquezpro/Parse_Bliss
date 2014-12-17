ReviewRequestForm = BlissForm.extend({
  name: 'ReviewRequestForm',
  display_name: 'Thanks!',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  templates: ['ReviewRequestForm.tpl.htm'],
  dataClass: 'ReviewRequestForm',
  dataLoad: {startDate: 0},
  fields: {
    ReviewRequestForm: {defaultValue: '', dataType: 'string'},
  },
  completionMessage: '',
  PostRender: function() {
    $('#review-request').click(function() {
      Storage.set('review_clicked', Bliss.getTime());      
    });
  }
});

