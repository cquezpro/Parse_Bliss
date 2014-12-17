/**
 *
 * Bliss class encapsulates helper functions for Bliss. 
 * Code should go here if it is general purpose and isn't large enough to require a class
 *
 */
Bliss = {
  /**
   * Returns a random string of alphanumeric characters
   * @method
   * @param {Number} size - length of string to return in characters
   */
  getRandomString: function(size) {
    var text = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i <= size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  /** Returns random integer between min / man inclusive */
  getRandomInt: function(min, max) {
    max = max + 1; //Make it inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  },
  /** 
   * Loads a script and inserts it into the page 
   * TODO: Not used, remove?
   * */
  loadScript: function(resource_name, callback) {
    var url = Bliss.getLocalUrl(resource_name);
    $.getScript(url, function() {
      callback.call(null);
    });
  },
  /** 
   *  Returns local URL, depending on enviroment i.e.
   *  chrome-extension://asdfasdfasdfsfadfasdfsdf/myfile.htm
   *  @param {String} resource - the relative url of the resource from Bliss root
   */
  getLocalUrl: function(resource) {
    if (Bliss.getEnvironment() == 'chrome') {
      var url = chrome.extension.getURL(resource);
    }
    else if (Bliss.getEnvironment() == "phonegap") {
      var url = resource;
    }
    else {
      var url = '/' + resource;
    }
    return url;
  },
  /**
   * Returns correct URL for an exercise
   * */
  getExerciseUrl: function(exercise_name) {
    return Bliss.getLocalUrl("ui/deploy/deploy.htm?exercise=" + exercise_name);
  },
  /** Return number formatted as dollars */
  formatMoney: function(number) {
    return '$' + parseFloat(number, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
  },
  /**
   * Return string representation of a unix timestamp  
   * @param {Number} date - a unix timestamp in seconds
   */
  formatDate: function(timestamp) {
    var date = new Date(timestamp);
    var month = date.getMonth() + 1;
    return month + '/' + date.getDate() + '/' + date.getFullYear();
  },
  /**
   * Returns unix timestamp in seconds when user installed Bliss
   */
  getInstallTime: function() {
    if (Storage.get('bliss_install_time')) {
      return Number(Storage.get('bliss_install_time'));
    }
    else if (User.current()) {
      return moment(User.current().createdAt).unix();
    }
  },
  /**
   * Returns current unix timestamp in seconds
   */
  getTime: function() {
    var date   = new Date();
    //offset allows us to set time other than current time for dev purposes
    var offset = Bliss.getTimeOffset();
    return (date.getTime() / 1000) + Number(offset);
  },
  /**
   * Sets time adjustment - this allows us to set a date that is not the real date for testing purposes
   * @param {Number} offset - seconds to add to the current time offset
   */
  setTimeOffset: function(offset) {
    Storage.set('time-offset', offset);
  },
  /** Returns current time offset in seconds */
  getTimeOffset: function() {
    var offset = Storage.get('time-offset');
    return offset ? offset : 0;
  },
  /** Returns date object set to start of current day. Should be refactored to use Bliss.getTime()? */
  startOfDay: function() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  },
  /**
   *  Logs an error to our external website for debugging purposes.
   *  Useful to see what bugs are occuring on user's machines 
   *  @param error the javascript error object, or a manually created one
   *  @param {String} error.message The error message
   *  @param {Object} error.stack Stack trace of the error
   *  @param {String} [context] A string describing where the error occurred
   *  @param {Object} [errorData] Any additional data to include with the error log for debugging
   */
  logError: function(error, context, errorData) {
    //Log to console
    Bliss.log(error);
    Bliss.trace();
    var data = {}
    var user = User.current();
    if (user) {
      data.userid = user.id;
    }
    if (context) {
      data.context = context;
    }
    if (Bliss.getEnvironment() == 'chrome') {
      if (chrome.runtime) {
        data.bliss_version = chrome.runtime.getManifest().version;
      }
    }
    if (error.line_number) {
      data.line_number = error.line_number;
    }
    if (error.url) {
      data.url = error.url;
    }
    if (error.stack) {
      data.stack = error.stack;
    }
    if (error.message) {
      data.message = error.message;
    }
    if (window.navigator) {
      data.chrome_version = window.navigator.userAgent;
    }
    if (errorData) {
      data.data = JSON.stringify(errorData);
    }
    data.action = 'logError';
    $.post(Bliss.website + '/lg.php', data);
  },
  /** 
   * Throw a fatal error, using alert because stupid JS doesn't log errors for some reason 
   * @param {String} message  an error message for debugging  
   */
  error: function(message) {
    alert(message);
  },
  // 
  /** 
   * Logging for tracking purposes 
   * @param {String} eventName Any string to identify the event
   * @param {Object} eventData Any data associated with the event
   * @param {String} [eventData.userid] User id associated with event. Defaults to current user.
   * @param {Boolean} [async] Transmit asynchronosly. Defaults to true
   */
  logEvent: function(eventName, eventData, async) {
    if (Bliss.logEvents) {
      async = (async === false) ? false : true;
      var user = User.current();
      var data = {};
      if (user) {
        data.userid = user.id;
      }
      data.event = eventName;
      if (eventData) {
        if (eventData.obj_id) {
          data.obj_id = eventData.obj_id;  
          delete eventData.obj_id;
        }
        data.data = JSON.stringify(eventData);
      }
      data.action = 'logEvent';
      $.post(Bliss.website + '/lg.php', data);
    }
  },
  /**
   * Saves data to our external website database
   * @param tableName {String}  Name of the table to save to
   * @param data {Object}  Field / Values to save i.e. {name: 'Billy', occupation: 'developer'}
   * @param [async=true]  Save asynchronously
   */
  saveData: function(tableName, data, async) {
    async = (async === false) ? false : true;
    var user = User.current();
    if (user) {
      data.userid = user.id;
    }
    data.action = 'save';
    data.table  = tableName;
    $.ajax({
      type: 'POST',
      url:  Bliss.website + '/data.php',
      data: data,
      async: async,
      success: function(data) {
        Bliss.log(data);
      }
    })
  },
  //Not currently used
  getTracks: function(callback) {
    var userid;
    if (User.current()) {
      userid = User.current().id;
    }
    $.getJSON(Bliss.website + '/get.php', {action: 'getTracks', userid: userid}, function(data) {
      callback.call(null, data);
    });
  },
  /** Returns version number of Bliss */
  getVersion: function() {
    if (Bliss.getEnvironment() == 'chrome') {
      if (chrome.runtime) {
        return chrome.runtime.getManifest().version;
      }
    }
  },
  /** Round num to specified number of digits */
  round: function(num, digits) {
    digits = typeof(digits) != 'undefined' ? digits : 2;
    var round = Math.pow(10, digits);
    return Math.round(num * round) / round; 
  },
  /**
   * Display a message to the user
   * @param html {String}  Message to display
   * @param [settings]
   * @param {Number} [settings.duration=3000]  How long to display in seconds before fading out
   * @param {String} [settings.fadeOut='slow']  How fast to fadeOut
   * @param {Boolean} [settings.closable=false]  If true, message will not fade out until user clicks the close button
   */
  message: function(html, settings) {
    defaults = {duration: 3000, fadeOut: 'slow', closable: false};
    settings = $.extend(defaults, settings);
    settings.fadeOut = settings.fadeOut == false ? 0 : settings.fadeOut;
    
    var close_button = settings.closable ? '<div class="close-button">x</div>' : '';
    $('body').prepend('<div id="bliss-message">' + close_button + html + '</div>');
    if (!settings.closable) {
      if (settings.fadeOut) {
        $('#bliss-message').delay(settings.duration).fadeOut(settings.fadeOut);
      }
    }
    else {
      $('#bliss-message .close-button').click(function() {
        $('#bliss-message').fadeOut(settings.fadeOut);
      });
    }
  },
  /** Returns type of popup that should be used for our chrome popup */
  getPopupVersion: function() {
    var popup_version = new SplitTest('popup-version').values(['scheduled', 'todays']);
    if (Storage.get('7_day_challenge') == 'accepted') {
      popup_version = 'challenge';
    }
    return popup_version;
  },
  trace: function() {
    //Make sure printStackTrace Library is loaded
    if (typeof printStackTrace != 'undefined') {
      var trace = printStackTrace();
      if (Bliss.getEnvironment() == 'chrome') {
        trace = trace.slice(4);
      }
  //      console.log('\nStack trace:\n' + trace.join('\n'));
    }
  },
  alert: function(message) {
    if (Bliss.dev) {
      alert(message);
    }
  },
  /** Log a message to the console, if Bliss.dev == true */
  log: function(message) {
    if (Bliss.enableLogging) {
      console.log(message);
    }
  },
  /** Format a variable for pretty printing */
  format: function(arg) {
    if (typeof(arg) == 'object') {
      return JSON.stringify(arg);
    }
    //Crude check for a unix timestamp
    if (arg > 1400000000) {
      return arg + '  (' + new Date(arg * 1000).toString() + ')';
    }
    else {
      return arg;
    }
  },
  /**
   * Return the enviroment in which Bliss is currently running
   * @return {String} environment - "chrome", "webpage", or "phonegap"
   */
  getEnvironment: function() {
    if (window.chrome && chrome.runtime && chrome.runtime.id) {
      return 'chrome';
    }
    else if (Bliss.env == 'phonegap') {
      return 'phonegap';
    }
    else {
      return 'webpage';
    }
  },
  /**
   *  Get the value of a param in the URL, i.e. bliss.local/deploy/deploy.htm?exercise=BestPossibleFuture
   *  @param {String} name  name of the param
   */
  getUrlParam: function(name) {
    var href = document.URL;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(href);
    if (results == null) {
      return null;
    }
    else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  },
  /** returns an array of keys from an object */
  getObjectKeys: function(obj) {
    var keys = [];
    $.each(obj, function(key, value) {
      keys.push(key);
    });
    keys.sort();
    return keys;
  },
  /**
   * Passes a message to update notifications to our background script
   *
   * TODO: Should be brought into our messaging encapsulation (not yet written)
   */
  updateNotifications: function(callback) {
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.sendMessage({action: 'update_notifications', callback: callback});
    }
  },
  /**
   * Sorts an array of objects by the given key or keys
   * @param {String/Array} keys  string for single key to sort by, or an array of strings in order of priority sort
   * @param {Object[]} objects  the objects to sort
   * @param {String[]} sort Orders for each key i.e. ['asc', 'desc', 'asc']
   */
  sortObjects: function(keys, objects, orders) {
    if (typeof(keys) == 'string') {
      keys = [keys];
    }
    return objects.sort(dynamicSortMultiple(keys, orders));
  },
  /** Returns string representation of current date, i.e. Jan-1-2014 */
  getTodayString: function() {
    var s = moment(Bliss.getTime() * 1000).format('MMM-D-YYYY');
    return s;
  },
  /** Wrapper function for messaging apis */
  sendMessage: function(args, callback) {
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.sendMessage(args, callback);
    }
    else {
      console.log('No Messaging API defined');
    }
  }
}

/*
 *  property - the object property to sort the array by
 *  order - either 'asc' for ascending, or 'desc' for descending sort
 */
function dynamicSort(property, order) {
  order = order ? order : 'asc';
  return function(obj1, obj2) {
    var return_value = obj1[property] > obj2[property] ? 1 : obj1[property] < obj2[property] ? -1 : 0;
    return (order == 'asc' && return_value != 0) ? return_value : -return_value;
  }
}

function dynamicSortMultiple(props, orders) {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  return function(obj1, obj2) {
    var i = 0;
    result = 0;
    numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while (result === 0 && i < numberOfProperties) {
      //Get sort order, if provided
      order  = orders && orders[i] ? orders[i] : null;
      result = dynamicSort(props[i], order)(obj1, obj2);
      i++;
    }
    return result;
  }
}
