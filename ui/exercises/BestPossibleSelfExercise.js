/**
 * This exercise is different than most - it's the same data class as BestPossibleFuture
 * but we are using a new exercise class to present the info differently on installation
 */
BestPossibleSelfExercise = BlissExercise.extend({
  name: 'BestPossibleSelfExercise',
  //We are using BestFutureExercise with a different class for install
  dataClass: 'BestFutureExercise',
  display_name: 'Best Possible Self',
  description: "",
  intro: 'BestPossibleSelfExerciseIntro.tpl.htm',
  templates: ['BestPossibleSelfExercise.tpl.htm'],
  fields: {
    //Field matches first field in Best Possible Future
    personal: {defaultValue: '', dataType: 'string'},
  },
  PreRender: function() {
    this.getModel().set('BestPossibleSelf', 1);
  },
  completionMessage: 'Your Best Possible Self entry has been saved.',
});

