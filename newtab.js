$(document).ready(function() {
  var filename;
  if (Bliss.getUrlParam('img')) {
    filename = Bliss.getUrlParam('img');
  }
  else {
    var num = Bliss.getRandomInt(1, 16);
    filename = num + '.jpg';
  }
  $('body').css('background-image', "url('images/backgrounds/"+ filename + "')");

  $('.exercise').click(function(e) {
    var exercise_name = $(e.currentTarget).attr('href');
    chrome.tabs.create({url: Bliss.getExerciseUrl(exercise_name)});
  });
});
