IntroForm = BlissForm.extend({
  name: 'IntroForm',
  id: 'intro',
  dataClass: 'Intro',
  templates: ['intro-app-bar.tpl.htm'],
  fields: {
    //TODO: Should be a constant
    tracker_image: {defaultValue: '', dataType:'string'}
  },
  templateHooks: {
    'intro-app-bar.tpl.htm': {
      PostRender: function() {
        setTimeout(function(){
          video.play();
        }, 5000);
        var video = $("#app-bar-video").get(0);
        $('#arrow-image').animate({right: '280px', top: '-20px'}).animate({right: '300px', top: '0px'})
                         .animate({right: '280px', top: '-20px'}).animate({right: '300px', top: '0px'}); 
        $("#app-bar-video").bind("ended", function() {
          setTimeout(function(){
            video.play();
          }, 5000);
        });
      }
    },
    'intro-tracker.tpl.htm': {
      //Set the correct image file depending on which SplitTest group user belongs to
      PreRender: function() {
        var test    = new SplitTest('tracker-type')
        var tracker = test.values({slider: TrackSlider, radios: TrackRadios, easyradios: TrackEasyRadios});
        var image   = 'intro-'+ tracker.name +'.jpeg'
        this.getModel().set('tracker_image', image);
      }
    }
  }
});

