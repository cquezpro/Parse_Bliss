var time_offset;
var count = 1;
var template = new EJS({url: '/tests/exercise.tpl.ejs'});
$(document).ready(function() {
  Parse.initialize(Bliss.appId, Bliss.javascriptId);
 new User(function(){
    time_offset = Bliss.getTimeOffset();
    runSchedule();
  });

  function runSchedule() {
      if (count > 16) {
        return;
      }
      var trar = new Trainer();
      trar.onLoad(function() {
        var exercise = trar.getTodaysExercise();
        console.log(exercise.name);
        var html = template.render({exercise: exercise});
        $('body').append(html);
        
        time_offset += 60 * 60 * 24;
        Bliss.setTimeOffset(time_offset);
        count++;
        Storage.set(exercise.name +'-last-submit', Bliss.getTime());
        Bliss.updateNotifications();
        setTimeout(function(){
          runSchedule();
        }, 500);
      });
  }



});


