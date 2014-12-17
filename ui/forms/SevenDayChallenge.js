SevenDayChallenge = BlissForm.extend({
  name: 'SevenDayChallenge',
  display_name: 'Take the 7 day challenge',
  templates: ['SevenDayChallenge.tpl.htm'],
  bodyClasses: 'challenge-page',
  modelClass: DirectStorageModel,
  dataLoad: {startDate: Bliss.startOfDay()},
  fields: {
  },
  completionMessage: '',
  PreRender: function() {
    // This is needed because use_day_count doesn't get uploaded after first
    // exercise submission before this view loads. User can only get to this page
    // by submitting an exercise, so it should always be accurate.
    // Consider other solutions if this type of Storage write timing issue occurs again
    if (!this.getModel().get('use_day_count')) { 
      this.getModel().set('use_day_count', 1);
    }
  },
  PostRender: function() {
    var that = this;
    $('.cprogress').data('targetValue', $('.cprogress').val());
    $('#challengeProgress').knob({
      'min': 0,
      'max': 100,
      'readOnly': true,
      'fgColor': '#1ba889',
      'font': 'QuickSandRegular',
      'fontWeight': 'normal',
      'inputColor': '#fff',
      'thickness' : .2,
      'width': 120,
      'height': 120,
      'angleOffset': 180,
      'easing': 'swing',
      'format' : function (value) {
         return value + '%';
      },
      'draw': function() {
        $('#challengeProgress').css({"font-size":"28px"});
      }
    });

    $('#challengeProgress').animate(
      {
        value: 100
      }, 
      {
        duration: 1000,
        easing: 'swing',
        progress: function() {
          $(this).val(Math.round(this.value/100*$(this).data('targetValue'))).trigger('change')
        }
      }
    );

    $('#challengeProgress').show();

    $('#acceptChallenge').click(function() {
      Bliss.logEvent('7_day_challenge_accepted');
      Storage.set('7_day_challenge', 'accepted');
      //that.complete();
      window.location.href = Bliss.getExerciseUrl('MotivationForm');
    });
    $('#BlissAnonymous').click(function() {
      Bliss.logEvent('7_day_challenge_declined');
      Storage.set('7_day_challenge', 'declined');
    });
  }
});
