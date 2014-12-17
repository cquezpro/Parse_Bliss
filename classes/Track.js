/**
 *  Class for creating a happiness tracker
 *  
 *  settings
 *    onSubmit: callback function fired after user submission
 *
 */
function Track(settings) {
  settings = $.extend(this.defaults, settings);
  settings.user = User.current();
  if (settings.onSubmit) {
    this.onSubmit(settings.onSubmit);
  }
  this.template = (settings.template ? settings.template : this.template);
  var that = this;
  var date = new Date().getTime() / 1000;
  //Initialize all settings at once, extending default object with
  //Settings passed from client function
  var parseTrack = Parse.Object.extend("MoodTracker", {
    initialize: function(attrs, options) {
      this.set(settings);
      this.save();
    },
  });
  this.parse = new parseTrack();
  var acl = new Parse.ACL();
  acl.setReadAccess(Parse.User.current(), true);
  acl.setWriteAccess(Parse.User.current(), true);
  this.parse.setACL(acl);
  var tracker = this;
  Bliss.log('adding listener');
  //Fade out trackers on other pages if one tracker is submitted
  if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.action == 'trackerSubmit') {
          that.afterSubmit();
        }
      }
    );
  }
}
Track.prototype = {
  onSubmitCallbacks: [],
  onSubmit: function(callback) {
    Bliss.log('Adding onsubmit callback');
    Bliss.log(callback);
    Bliss.log(this);
    this.onSubmitCallbacks.push(callback);
  },
  runOnSubmitCallback: function() {
    $.each(this.onSubmitCallbacks, function(key, callback) {
      callback.call(null);
    });
  },
  getImage: function() {
    return this.parse.attributes;
  },
  loadImage: function(image) {
  //    this.parse.set(image);
  },
  defaults: {
    'touched': false,
    'user': null,
    'trackerName': this.trackerName,
  },
  deploy: function(callback) {
    this.display(function() {
      this.parse.set('deployed', Bliss.getTime());
      this.parse.set('currentUrl', document.URL);
      this.parse.set('currentDomain', window.location.host);
      this.trackController();
      this.buttonController();  
      this.closeButtonController();  
      if (callback) {
        callback.call(null);
      }
    });
  },
  display: function(callback) {
    var that = this;
    var url = Bliss.getLocalUrl(this.template);
    $.get(url, function(html) {
      $('body').append('<iframe style="top: -100px;" id="bliss-track-iframe"></iframe>');
      html = new EJS({text: html}).render()
      that.iframe = $('#bliss-track-iframe')[0].contentWindow.document
      $body = $('body', that.iframe);
      $body.html(html);
      $('#bliss-track-iframe').animate({top: 0});
      callback.call(that);
    });
  },
  trackController: function(){
  },
  buttonController: function() {
    Bliss.log('button controller');
    var that = this;
    $("#bliss-button", this.iframe).click(function() {
      that.submit();
    });
  },
  closeButtonController: function() {
    var that = this;
    $('.close-button', this.iframe).click(function() {
      that.set('closed', 1);
      that.submit();
    });
  },
  afterSubmit: function() {
    var that = this;
    $('#bliss-track-iframe').fadeOut('slow', function(){
      if (!that.get('closed')) {
        $('body').prepend('<div id="bliss-message">Your mood tracker entry has been saved</div>');
        $('#bliss-message').delay('2500').fadeOut('slow');
      }
    });
  },
  broadcastSubmit: function(){
    if (chrome.runtime) {
      chrome.runtime.sendMessage({action: "trackerSubmit"}, function(response) {
      });
    }
  },
  submit: function() {
    var submitTime = new Date().getTime() / 1000;
    var responseTime = submitTime - this.get('deployed');
    this.set('submitted', submitTime);
    this.set('responseTime', responseTime);
    var that = this;
    this.save(null, {
      success: function() {
        that.afterSubmit();
        that.broadcastSubmit();
        that.runOnSubmitCallback();
      },
      error: function(track, error) {
        Bliss.logError(error, 'tracker_submit', {code: error.code});
        that.afterSubmit();
        that.broadcastSubmit();
        that.runOnSubmitCallback();
      }
    });
  },
  set: function() {
    return this.parse.set.apply(this.parse, arguments);
  },
  get: function() {
    return this.parse.get.apply(this.parse, arguments);
  },
  save: function() {
    return this.parse.save.apply(this.parse, arguments);
  }

}

