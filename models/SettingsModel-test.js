User(function(data) {
  var settings = new SettingsModel();
  settings.onLoad(function(){
    var enabled  = settings.get('funkystuff-enabled');
    console.log(enabled);
  });
});
