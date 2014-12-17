//Set up the 'Initiate' Interface
function Initiator(TrackClass) {
  //        Storage.clear(); 
  //    Storage.set('launchesSoFarToday', 0);
  this.track = TrackClass;
  this.name = 'Initiator';
  this.minRepeatTime = 120 //Minimum time between initiations in minutes
  var that = this;    
  this.timesPerDay = new SplitTest('Initiator-launches-per-day').values([1,2,3]);
  //Check if today is a new day, if so recalculate launches needed
  var lastRunDay = Storage.get('lastRunDay')
  var today = new Date().toLocaleDateString();
  if (today != lastRunDay) {
    Bliss.logEvent('new_day', {'today': today, 'lastRunDay': lastRunDay});
    that.launchesNeededToday = that.timesPerDay;
    Storage.set('lastRunDay', today);
    Storage.set('launchesToday', 0);
    that.setNextLaunch();
  }
  //Otherwise calculate launches still needed for today and check for launch
  else {
    launches = Storage.get('launchesToday');
    launches = launches ? Number(launches) : 0;
    that.launchesNeededToday = that.timesPerDay - launches;
    that.launchesNeededToday = that.launchesNeededToday < 0 ? 0 : that.launchesNeededToday;
    that.launchesToday = launches;
    if (that.launchesNeededToday > 0) {
      that.checkForLaunch();
    }
  }
}
Initiator.prototype.setNextLaunch = function() {
  if (this.launchesNeededToday > 0) {
    var minRepeatTime = this.minRepeatTime * 60 * 1000;
    var today = new Date();
    var midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);
    var timeLeftToday = midnight.getTime() - today.getTime();
    var targetInterval = (timeLeftToday/this.launchesNeededToday);
    var minTime = today.getTime() + minRepeatTime;
    //Set max time such that we have an average expected value of targetInterval
    if (targetInterval > minRepeatTime) {
      var maxTime = today.getTime() + minRepeatTime + 2 * (targetInterval - minRepeatTime);
    }
    else {
      var maxTime = today.getTime() + targetInterval;
    }

    var time = Bliss.getRandomInt(minTime, maxTime);
    launchTime  = new Date(time);
    launchTimeString = launchTime.toString();

    Storage.set('nextLaunch', launchTime.toString());
    //Debuging our problem with excessive tracker deploys
    var debug = {'minRepeatTime': minRepeatTime, 'currentTime': today.getTime(), 'midnight': midnight, 'timeLeftToday': timeLeftToday,
                 'minTime': minTime, 'maxTime': maxTime, 'targetInterval': targetInterval, 'time': time, 'launchTime': launchTime, 
                 'launchTimeString': launchTimeString}
    Bliss.logEvent('setNextLaunch', debug);
    Bliss.log('Set next launch: '+ launchTime.toString());
  }
}
Initiator.prototype.checkForLaunch = function() {
  var now = new Date();
  var that = this;
  Storage.get('nextLaunch', function(nextLaunch) {
    if (typeof(nextLaunch) == 'string') {
      nextLaunch = new Date(nextLaunch);
      if (nextLaunch.getTime() < now.getTime()) {
        that.launch();
      }
    }
    else {
      that.setNextLaunch();
    }
  });
}
Initiator.prototype.trackerErrors = function(tracks) {
    var errors = [];
    //Check for violations of our mood tracker business logic
    if (tracks.tracksSubmittedToday >= 3) {
      errors.push('tracker_over_daily_submit_limit');
    }
    if (tracks.tracksSubmittedLastHour > 0) {
      errors.push('tracker_over_hourly_submit_limit');
    }
    if (tracks.tracksDeployedLastHour > 3) {
      errors.push('tracker_over_hourly_deploy_limit');
    }
    if (tracks.tracksDeployedToday > 11) { 
      errors.push('tracker_over_hourly_deploy_limit');
    }

    if (errors.length > 0) {
      var message = errors.split(';');
      Bliss.logError({message: message}, 'tracker_deploy', localStorage);   
      return true
    }
    else {
      return false;
    }
}
Initiator.prototype.launch = function() {
  var that = this;
  Bliss.getTracks(function(tracks) {
    if (!that.trackerErrors(tracks)) {
      var currentTracker = new that.track();
      currentTracker.onSubmit(function() {
        Bliss.logEvent('tracker_submit', localStorage, true);
        Storage.set('launchesToday', Number(that.launchesToday) + 1);
        Storage.remove('nextLaunch');
        that.setNextLaunch();
      });
      currentTracker.save({
        success: function() {
          Bliss.log('successfully saved to parse');
        },
        error: function(tracker, error) {
          Bliss.logError(error, 'tracker_save', {code: error.code});
        }
      });
      Bliss.logEvent('tracker_deploy', localStorage, true);
      currentTracker.deploy();
    }
  });
}
Initiator.prototype.todayDateString = function() {
  var today = new Date();
  return this.getDateString(today);
}
Initiator.prototype.getDateString = function(date) {
  return date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear();
}
