function TrackSlider(settings) {
  TrackSlider.superclass.constructor.call(this, settings);
}
extend(TrackSlider, Track); 

TrackSlider.prototype.trackerName = 'track-slider';
TrackSlider.prototype.template = 'templates/track-slider.ejs';

TrackSlider.prototype.trackController = function() {
  var that = this;
  //Set default state of 5
  that.set('happiness', 5);
  $(document).ready(function(){
    var initial_margin = $('#slide-value', that.iframe).css('margin-left'); 
    initial_margin = -8;
    $('#bliss-slider', that.iframe).on('input change', function(e){
      var slide_value = $(this, that.iframe).val() / 10;
      that.set('happiness', Number(slide_value));
      that.set('touched', true);
      var adjustment  = (slide_value - 5) * 36;
      //Special adjustment for the narrower value '10'
      var ten_adjust  = slide_value != 10 ? 0 : 1;
      var margin      = initial_margin + adjustment + ten_adjust; 
      $('#slide-value', that.iframe).css({'margin-left': margin});
      slide_value = slide_value != 10 ? slide_value.toFixed(1) : 10;
      $('#slide-value', that.iframe).text(slide_value);
    });
    $('#bliss-slider', that.iframe).focus();

    $('#bliss-track .help', that.iframe).hide();
    //Show help text for keyboard tracker control
    var keyboard_help_reminds = Storage.get('tracker-keyboard-help');
    keyboard_help_reminds = (typeof keyboard_help_reminds == 'undefined') ? 0 : Number(keyboard_help_reminds);
    if (keyboard_help_reminds < 1) {
      Storage.set('tracker-keyboard-help', keyboard_help_reminds + 1);

      $('#bliss-slider', that.iframe).mousedown(function(e){
        $('#bliss-track .help', that.iframe).fadeIn('2000');
      });
    }
  });
}
