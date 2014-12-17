document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    var trainer = new Trainer();
    var now                  = new Date().getTime(),
    _3_seconds_from_now = new Date(now + 3*1000);
    
    trainer.onLoad(function(){
           var exercise = trainer.getTodaysExercise();
           //alert(exercise.is_scheduled);
           //alert(JSON.stringify(exercise));
           if(exercise.is_scheduled == true) {
	           window.plugin.notification.local.add({
	             id:      1,
	             title:   exercise.display_name,
	             message: exercise.description,
	             repeat:  'daily',
	             date:    _3_seconds_from_now
	     		});
           }
            
    });
    

   /* window.plugin.notification.local.isScheduled(id, function (isScheduled) {
    	console.log('Notification with ID ' + id + ' is scheduled: ' + isScheduled);
	});*/
   
}

