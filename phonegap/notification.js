User(function(){
  var trainer = new Trainer();
  trainer.onLoad(function(){
    var exercise = trainer.getTodaysExercise();
    $('body').append(JSON.stringify(exercise));
  });
});
