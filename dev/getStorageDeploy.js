Parse.initialize(Bliss.appId, Bliss.javascriptId);
Storage.loadAll(function(){
  if (Bliss.getUrlParam('deploy')) {
    DeployGetStorage();
  }

  function DeployGetStorage() {
    var Stor = {};
    if (chrome.storage) {
      Storage.wrapper.get(null, function(variables) {
        console.log('variables');
        console.log(variables);
        $.each(variables, function(key, value) {
          console.log(key +' = '+ value);
          Stor[key] = value;
        });
        BlissDeployStorageForm(Stor);
      });
    }
    else {
      $.each(localStorage, function(key, value) {
        Stor[key] = value;
      });
      BlissDeployStorageForm(Stor);
    }
  }

  function BlissDeployStorageForm(Stor) {
    var form = new GetStorageForm();
    form.constants = {};
    form.constants.storage = Stor;
    form.deploy(); 
  }

});

