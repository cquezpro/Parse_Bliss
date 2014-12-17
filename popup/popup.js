$(document).ready(function() {
  //    var template = new EJS({url: 'popup-challenge.tpl.ejs'});
  //    popup_version = 'scheduled';

    Bliss.logEvent('popup_click');
    Storage.loadAll(function(data) {
      var popup_version = Bliss.getPopupVersion();
      var template = new EJS({url: 'popup-'+ popup_version +'.tpl.ejs'});
      try {
        exercise = data.popup_todays_exercise;
        data.exercise = exercise;
        data.use_day_streak  = data.use_day_streak ? data.use_day_streak : 0;
        data.use_day_count   = data.use_day_count ? data.use_day_count : 0;
          
        if (popup_version == 'todays' || popup_version == 'challenge') {
          var today            = moment.unix(Bliss.getTime()).startOf('day');
          if (!moment.unix(data.last_use_day).startOf('day').isSame(today, 'day')) {
            data.challenge_day = data.use_day_count + 1;
          }
          else {
            data.challenge_day = data.use_day_count;
          }
          if (exercise) {
            if (exercise.name == data.popup_new) {
              Storage.wrapper.remove('popup_new');
              chrome.browserAction.setBadgeText({text: ''});
              chrome.browserAction.setBadgeBackgroundColor({color: '#F00'});
            }
          }
        }

        var html = template.render(data)
        $('body').append(html);

        /**
         * Event Handlers
         */

        $('.exercise').click(function(e) {
          var exercise_name = $(e.currentTarget).attr('href');
          Bliss.logEvent('popup_exercise_click', {exercise: exercise_name});
          chrome.tabs.create({url: Bliss.getExerciseUrl(exercise_name)});
          window.close();
        });
        $('.popup-actions').click(function(e) {
          if ($(e.currentTarget).attr('href')) {
            var url = Bliss.getLocalUrl($(e.currentTarget).attr('href'));
            chrome.tabs.create({url: url});
          }
        });
        $('.clear-notifications').click(function() {
          $('.new').remove();
          chrome.runtime.sendMessage({action: "clear-notifications"}, function(response) {
          });
        });
        $('.dev').click(function(e){
          e.preventDefault();
          var url = $(e.currentTarget).attr('href');
          chrome.tabs.create({url: url});
        });
      }
      catch (error) {
        alert(error.message);
      }

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
      'width': 50,
      'height': 50,
      'angleOffset': 180,
      'easing': 'swing',
      'format' : function (value) {
          return value + '%';
      },
      'draw': function(){
        $('#challengeProgress').css("font-size","15px");
      }
    });

    $('#challengeProgress').animate({
      value: 100
      }, {
          duration: 1000,
          easing: 'swing',
          progress: function () {
          $(this).val(Math.round(this.value/100*$(this).data('targetValue'))).trigger('change')
          }
      });

    $('.today-and-challenge-popup .exercise-container').fadeIn('slow');
  });
});

