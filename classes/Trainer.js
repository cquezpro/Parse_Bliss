/**
 * Class Trainer 
 *   
 * The Trainer class keeps track of all of a user's exercises and is responsible for:
 *
 * * Providing a list of exercises to display in popup
 * 
 * * Scheduling exercises
 * 
 * * Calculating notification to display on the bliss icon in chrome
 *
 */

Trainer = function() {
  var that = this;
  this.settingsModel = new SettingsModel();
  this.settingsModel.onLoad(function() {
    that.initExercises();
    that.loaded = true;
    if (that.onLoadCallback) {
      that.onLoadCallback.call(null); 
    }
  });
  return this;
}

Trainer.prototype = {
  /**
   *  Executes callback when the Trainer loads, must be used to do anything with Trainer
   *  @param {Function} callback  The function to execute when trainer has loaded
   *  i.e. var trainer = new Trainer(); trainer.onLoad(function() { var exercise = trainer.getTodaysExercise(); });
   */
  onLoad: function(callback) {
    if (this.loaded) {
      callback.call(this, this);
    }
    else {
      this.onLoadCallback = callback;
    }
  },
  ensureLoaded: function() {
    if (!this.loaded) {
      alert('Trainer not yet loaded!');
      Bliss.logError('Called trainer function before trainer loaded');
    }
  },
  /**
   *  Returns all exercise classes, not instantiated in an array.
   *  @return {Object} exercise
   *  @return {String} return.name Machine name
   *  @return {String} return.display_name Display name to display to user
   *  @return {String} return.description  Description to display to user
   *  @return {Object} return.fields Fields as originally defined by the exercise sub-class (see /ui/exercises/ for sub-classes)
   *  @return {String[]} return.templates Array of templates defined, or a callback to return templates
   *  @return {Object}  return.Etc  All other fields (not listed here) defined in sub-class (see /ui/exercises/ for sub-classes)
   */
  getExerciseClasses: function() {
    exercise_data = [];
    exercise_data.push(GratitudeExercise);
    exercise_data.push(ThreeGoodThingsExercise);
    exercise_data.push(HonoringPeopleExercise);
    exercise_data.push(TransformingProblemsExercise);
    exercise_data.push(BestFutureExercise);
    exercise_data.push(CouldBeWorseExercise);
    exercise_data.push(SavoringExercise);
    exercise_data.push(MeaningInWorkExercise);
    this.exercise_data = exercise_data;
    return exercise_data;
  },
  /**
   *  Initializes exercises, called on Trainer creation to set the delay, enabled, repeat
   *  parameters based on values from Storage
   */
  initExercises: function() {
    var that = this;
    that.exercises = [];
    var exercise_classes = that.getExerciseClasses();
    $.each(exercise_classes, function(key, exercise_class) {
       var exercise = new exercise_class();
       exercise.delay = that.settingsModel.get(exercise.name + '_delay');
       exercise.repeat = that.settingsModel.get(exercise.name + '_repeat');
       exercise.enabled = that.settingsModel.get(exercise.name + '_enabled');
       that.exercises.push(exercise);
    });
    that.setExerciseSchedule();
  },
  getNotificationCount: function() {
    var count = 0;
    $.each(this.exercises, function(key, exercise) {
      if (exercise.enabled && exercise.notification) {
        count++;
      }
    });
    return count;
  },
  /**
   *  Returns an array of all exercises that are currently scheduled
   *  @return {Object[]} exercise
   *  @return {String} return.name
   *  @return {String} return.display_name
   *  @return {String} return.is_scheduled
   *  @return {String} return.scheduled_time
   *  @return {String} return.description  Description to display to user
   *  @return {Object} return.fields Fields as originally defined by the exercise sub-class (see /ui/exercises/ for sub-classes)
   *  @return {String[]} return.templates Array of templates defined, or a callback to return templates
   *  @return {Object}  return.Etc  All other fields (not listed here) defined in sub-class (see /ui/exercises/ for sub-classes)
   */
  getScheduledExercises: function() {
    this.setExerciseSchedule();
    var that = this;
    var scheduled_exercises = [];
    $.each(this.exercises, function(key, exercise) {
      if (exercise.is_scheduled && exercise.enabled) {
        scheduled_exercises.push(exercise);
      }
    });
    return scheduled_exercises;
  },
  /** 
   *     Runs on Trainer creation <br>
   *     Sets exercise.is_scheduled   - true if exercise is scheduled <br>
   *     exercise.notification   - true if exercise should have a popup notification displayed <br>
   *     exercise.scheduled_time  - timestamp when exercise became scheduled <br>
   *     exercise.wait_time      - seconds the exercise has been scheduled for <br>
   */
  setExerciseSchedule: function() {
    $.each(this.exercises, function(key, exercise) {
      var install_time  = Bliss.getInstallTime();
      var now = Bliss.getTime();
      //Time when the exercise will first be scheduled
      exercise.first_scheduled = moment.unix(install_time).add(exercise.delay, 'days').startOf('day').unix();
      //If exercise is set to 'never' repeat, don't schedule it
      if (exercise.repeat > 0) {
        var last_submit = exercise.getLastSubmit() ? Number(exercise.getLastSubmit()) : 0;
        var notification_clear_time = Storage.get(exercise.name +'_notification_clear_time') ? Number(Storage.get(exercise.name +'_notification_clear_time')) : 0;
        //If exercise has been submitted or cleared, calculate based on repeat setting
        if (last_submit || notification_clear_time > exercise.first_scheduled) {
          var base_time = (notification_clear_time > last_submit) ? notification_clear_time : last_submit;
          exercise.scheduled_time = moment.unix(base_time).startOf('day').add(exercise.repeat, 'days').unix();
        }
        //If not yet submitted or cleared, use first_scheduled time
        else {
          exercise.scheduled_time = exercise.first_scheduled;
        }
        exercise.wait_time = Bliss.round(now - exercise.scheduled_time);
      }

      if (now > exercise.scheduled_time) {
        exercise.notification = true;
        exercise.is_scheduled = true;
      }
      else {
        exercise.notification = false;
        exercise.is_scheduled = false;
      }
    });
  },

  /**
   *  Returns an array of all exercises including non-scheduled and disabled exercises
   *  @return {Object[]} exercise
   *  @return {String} return.name the machine name of the exercise
   *  @return {String} return.dataClass the name of the key used for storage to chrome or parse
   *  @return {String} return.display_name  the display name of the exercise
   *  @return {Boolean} return.is_scheduled  true if the exercise is scheduled
   *  @return {Number} return.scheduled_time  The unix time stamp of when the exercise became scheduled most recently
   *  @return {Number} return.first_scheduled  The unix time stamp of when the exercise first became scheduled
   *  @return {Number} return.wait_time  Seconds since the exercise became scheduled
   *  @return {Object} return.options  Options for the exercise
   *  @return {String} return.description  Description to display to user
   *  @return {Object} return.fields Fields as originally defined by the exercise sub-class (see /ui/exercises/ for sub-classes)
   *  @return {String[]} return.templates Array of templates defined, or a callback to return templates
   *  @return {Object}  return.Etc  All other fields (not listed here) defined in sub-class (see /ui/exercises/ for sub-classes)
   */
  getExercises: function() {
    return this.exercises;
  },
  /**
   *  Clear all scheduled exercises
   *  @param {Number} [time]  Unix timestamp in seconds as to when the clearing took place. Defaults to current time
   *  but can optionally be set to past to clear exercises that have been scheduled longer than X seconds
   */
  clearNotifications: function(time) {
    var that = this;
    if (typeof time == 'undefined') {
      time = Bliss.getTime();
    }
    var exercises = that.getScheduledExercises();
    $.each(exercises, function(key, exercise) {
      Storage.set(exercise.name +'_notification_clear_time', time);
    });
    that.setExerciseSchedule();
  },
  getAvailableExercises: function() {
    var that = this;
    var scheduled_exercises = [];
    $.each(this.exercises, function(key, exercise) {
      if (exercise.enabled) {
        if (exercise.displayInPopup == 'always') {
          scheduled_exercises.push(exercise);
        }
        else if (exercise.displayInPopup == 'when_scheduled' && exercise.is_scheduled) {
          scheduled_exercises.push(exercise);
        }
      }
    });
    return scheduled_exercises;
  },
  /**
   *  Return a minimal version of the exercise (containing only fields needed for display)
   *  that will be presented to the user today (if using today's popup version)
   *
   *  @inheritdoc #minifyExercise
   */
  getTodaysExercise: function() {
    var that = this;
    var today    = Bliss.getTodayString();
    var last_run = Storage.get('trainer_last_scheduled_date');
    if (today != last_run) {
      var exercises = [];
      var log = [];
      //New day, set new exercise for today
      $.each(this.exercises, function(key, exercise) {
        exercise.last_featured = Storage.get(exercise.name + '-last-featured') ? Number(Storage.get(exercise.name + '-last-featured')) : 0;
        //If exercise became scheduled after last scheduled time, reset to 0 and schedule again
        if (exercise.is_scheduled && exercise.last_featured < exercise.scheduled_time) {
          exercise.last_featured = 0;
        }
        if (exercise.enabled) {
          exercises.push(that.minifyExercise(exercise));
          log.push(that.minifyExercise(exercise));
        }
      });
      Bliss.sortObjects(['last_featured', 'scheduled_time'], exercises, ['asc', 'asc']);
      console.log('new run');
      //console.table(log);
      var todays_exercise = exercises.shift();
      Storage.set('trainer_todays_exercise', todays_exercise);
      Storage.set('trainer_last_scheduled_date', today);
      Storage.set(todays_exercise.name +'-last-featured', Bliss.getTime());
      var todays_exercise = this.minifyExercise(todays_exercise);
      Storage.set('trainer_todays_exercise', todays_exercise);
    }
    else {
      console.log('already set');
      var todays_exercise = Storage.get('trainer_todays_exercise');
    }
    //Check if exercise has been submitted today
    todays_exercise.last_submit = Storage.get(todays_exercise.name + '-last-submit');
    todays_exercise.last_submit = todays_exercise.last_submit ? todays_exercise.last_submit : 0;

    var last_submit = moment.unix(todays_exercise.last_submit).startOf('day');
    var today       = moment.unix(Bliss.getTime()).startOf('day');
    if (last_submit.isSame(today, 'day')) {
      todays_exercise.completed = true;
      Storage.set('trainer_todays_exercise', todays_exercise);
    }
    return todays_exercise;
  },
  /**
   * Returns an array of minimal exercises (containing only fields needed for display) to display in chrome extension popup window
   * @inheritdoc #minifyExercise
   */
  getPopupExercises: function() {
    var popup_exercises = [];
    var exercises = this.getAvailableExercises();
    var that = this;
    $.each(exercises, function(key, exercise) {
      if (exercise.dev !== true || Bliss.dev == true) {
        popup_exercise = that.minifyExercise(exercise);
        popup_exercises.push(popup_exercise);
      }
    });
    return popup_exercises;
  },
  /** 
   * Takes a fully loaded exercise and returns minimal version for display in popup   
   *  @return {Object} exercise
   *  @return {String} return.name  Machine name for the exercise
   *  @return {String} return.display_name    Name to display to the user when referring to the exercise
   *  @return {Boolean} return.displayInPopup  True if exercise should be displayed in the popup (scheduled popup version only)
   *  @return {Boolean} return.is_scheduled  True is exercise is scheduled
   *  @return {String} return.description  A description to display to the user, set in the exercise sub-class definition
   *  @return {Number} return.last_featured  Unix time stamp when the exercise was last "Today's Exercise"
   *  @return {Number} return.scheduled_time  Unix time stamp when the exercise was last scheduled
   *  @return {Number} return.repeat  Delay in day of how often the exercise should be re-scheduled, controlled by settings form
   *  @return {Number} return.delay  Delay in days after install before the exercise will be scheduled for the first time
   */
  minifyExercise: function(exercise) {
    var popup_exercise = {};
    popup_exercise.name = exercise.name;
    popup_exercise.display_name = exercise.display_name;
    popup_exercise.displayInPopup = exercise.displayInPopup;
    popup_exercise.is_scheduled   = exercise.is_scheduled;
    popup_exercise.description    = exercise.description;
    popup_exercise.last_featured  = exercise.last_featured;
    popup_exercise.scheduled_time = exercise.scheduled_time;
    popup_exercise.repeat         = exercise.repeat;
    popup_exercise.delay          = exercise.delay;
    return popup_exercise;
  }

}


