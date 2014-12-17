BlissExercise = BlissView.extend({
  normal_exercise: true,
  templateDir: 'ui/exercises/templates/',
  showCompletionMesssage: function (exerciseName) {
    var message = '';
    if (this.completionMessage && !this.noCompletionMessageTest) {
      message = this.completionMessage;
    }
    else {
      var purpose = new SplitTest('exercise-complete-purpose').truefalse();
      if (purpose) {
        message = 'You are building a stronger, happier brain.';
      }
      else {
        message = 'Your '+ this.display_name +' entry has been saved';
      }
    }
    Bliss.message(message);
  }
});
