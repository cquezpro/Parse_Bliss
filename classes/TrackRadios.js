function TrackRadios(settings) {
  TrackRadios.superclass.constructor.call(this, settings);
}
extend(TrackRadios, Track); 

TrackRadios.prototype.trackerName = 'track-radios';
TrackRadios.prototype.template = 'templates/track-radios.ejs';
TrackRadios.prototype.trackController = function() {
  var that = this;
  var date = new Date().getTime() / 1000;
  this.set('deployed', date);
  $('#track-container .radio-container', this.iframe).click(function(e){
   $(this, that.iframe).find('input').prop('checked', true);
    value = $("#track-container input[name='track_radio']:checked", that.iframe).val();
    that.set('happiness', Number(value));
    that.set('touched', true);
  });
}
