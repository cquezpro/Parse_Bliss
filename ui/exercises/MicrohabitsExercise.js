MicrohabitsExercise = BlissExercise.extend({
  name: 'MicrohabitsExercise',
  display_name: 'Microhabits',
  description: "Turn a small practice into a life long habit",
  displayInPopup: 'always',
  initialDelayDays: 0,
  daysBetweenDeploy: 3,
  //  intro: 'MicrohabitsExerciseIntro.tpl.htm',
  templates: ['MicrohabitsExercise.tpl.htm', 'MicrohabitsExercise-Reminder.tpl.htm'],
  review_templates: ['MicrohabitsExercise-review.tpl.htm'],
 // templates: ['MicrohabitsExercise-Reminder.tpl.htm'],
  fields: {
    goal:       {defaultValue: '', dataType: 'string'},
    benefits:   {defaultValue: '', dataType: 'string'},
    first_step: {defaultValue: '', dataType: 'string'},
    time:       {defaultValue: '', dataType: 'string'},
    microhabit: {defaultValue: '', dataType: 'string'},
    identity:   {defaultValue: '', dataType: 'string'},
    hour:       {defaultValue: '', dataType: 'string'},
    minute:     {defaultValue: '', dataType: 'string'},
    ampm:       {defaultValue: '', dataType: 'string'},
  },
  constants: {
    time_options: {
      'wakeup': 'When I first wake up', 
      'afterbreakfast': 'After Breakfast', 
      'afterlunch': 'After Lunch', 
      'afterdinner': 'After Dinner', 
      'gettowork': 'When I first get to work', 
      'afterwork': 'After Work',
    },
    hour_options:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    minute_options: {0: '00', 15: '15', 30: '30', 45: '45'},
    ampm_options: {am: 'AM', pm: 'PM'}
  },
  PreSubmit: function(){
    var hour = Number(this.getModel().get('hour'));
    var minute = Number(this.getModel().get('minute'));
    var ampm = this.getModel().get('ampm');
    hour = ampm == 'pm' ? hour + 12 : hour;
    alert(hour +':'+ minute +' '+ ampm);
    var reminder = new Date();
    reminder.setHours(hour);
    reminder.setMinutes(minute);
    reminder.setSeconds(0);
    milliseconds = reminder.getTime();
  },
  completionMessage: 'Your Microhabit has been saved.'
});

