$(document).ready(function(){
  User(function() {
  //    Storage.wrapper.get('bliss_install_time', function(data) { console.log('install_time'); console.log(data); });
    console.log('Storage.container');
    console.log(Storage.container);
    displayDates();
    var date = new Date()
    $('#datetimepicker').val(Bliss.getTime());
    $('#datetimepicker').datetimepicker({
      format: 'unixtime',
      onClose: function(dp, $input) {
        Bliss.setTimeOffset(Number($input.val() - (date.getTime())/1000));
        update();
      }
    });

    $('#reset_offset').click(function(){
      Bliss.setTimeOffset(0);
      update();
    });
  });

  function update() {
    setTimeout(function(){
      displayDates();
      $('#datetimepicker').val(Bliss.getTime());
      Bliss.updateNotifications();
    }, 100);
  }
  function displayDates() {
    console.log('Storage.container');
    console.log(Storage.container);
    var date = new Date()
    var bliss_date = new Date(Bliss.getTime() * 1000);
    var install_date = new Date(Bliss.getInstallTime() * 1000);

    $('#current_date').html(date);
    $('#bliss_date').html(bliss_date);
    $('#install_date').html(install_date);
  }
});

