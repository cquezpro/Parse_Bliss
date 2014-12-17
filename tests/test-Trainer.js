Storage.loadAll(function(){
  $(document).ready(function() {
    console.log('Bliss');
    console.log(Bliss);
    Parse.initialize(Bliss.appId, Bliss.javascriptId);
    new User(function(){
      var trainer = new Trainer();
      trainer.onLoad(function() {
        console.log('SCHEDULED EXERCISES');
        console.log(trainer.getScheduledExercises());
        trainer.getPopupExercises();
        var exercises = trainer.getScheduledExercises();
        var todays_exercise = trainer.getTodaysExercise();
        $.each(exercises, function(key, exercise) {
          $('body').append('<h2>'+exercise.name+'</h2>');
        });
      })
    });
  });
});
