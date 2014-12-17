$(document).ready(function(){
  var script = Bliss.getUrlParam('script');
  if (script) {
    $.getScript('/tests/'+ script);
  }
  else {
    $.get('/tests/test-list.htm', function(html) {
      $('body').append(html);
    });
  }
});
