BlissForm = BlissView.extend({
  templateDir: 'ui/forms/templates/',
  loadOld: true
});

$(document).on('focus', '.datepicker', function(){
    $(this).datepicker({
              changeYear:true, 
              changeMonth:true, 
              showMonthAfterYear:true,
              yearRange: '1900:+nn',
              inline: true,
              showOtherMonths: true,
              dateFormat: 'MM-dd-yy',
              dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              showOn: "both",
              buttonImage: "/ui/forms/images/calendar.png",
              buttonImageOnly: true,
              onClose : function(date){
                        
                        var selectedDate = date.split("-");
                  
                        $('#birthMonth').val(selectedDate[0]);
                        $('#birthDay').val(selectedDate[1]);
                        $('#birthYear').val(selectedDate[2]);
              }
        });
  });
