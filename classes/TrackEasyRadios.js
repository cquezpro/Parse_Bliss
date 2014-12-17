function TrackEasyRadios(settings) {
  TrackEasyRadios.superclass.constructor.call(this, settings);
}
extend(TrackEasyRadios, Track); 

TrackEasyRadios.prototype.trackerName = 'track-easy-radios';
TrackEasyRadios.prototype.template = 'templates/track-easy-radios.ejs';
TrackEasyRadios.prototype.buttonController = function() {
 //Not using a button, so we over-ride with empty function 
}
TrackEasyRadios.prototype.trackController = function() {
  var that = this;
  var date = new Date().getTime() / 1000;
  this.set('deployed', date);
  $('#track-container .radio-container', this.iframe).click(function(e){
   $(this, that.iframe).find('input').prop('checked', true);
    value = $("#track-container input[name='track_radio']:checked", that.iframe).val();
    that.set('happiness', Number(value));
    that.set('touched', true);
    that.submit();
  });
}
