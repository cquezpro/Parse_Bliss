Parse.initialize(Bliss.appId, Bliss.javascriptId);

function BlissDeployGetStorage(){
  var Stor = {};
  if (chrome.storage) {
    Storage.wrapper.get(null, function(variables) {
      $.each(variables, function(key, value) {
        Stor[key] = {chrome: value, local: ''};
      });
      BlissGetLocal(Stor);
      BlissDeployStorageForm(Stor);
    });
  }
  //Can't get chrome storage (because we're not in extension environment probably)
  //Get local only
  else {
    BlissGetLocal(Stor);
    BlissDeployStorageForm(Stor);
  }
}


function BlissDeployStorageForm(Stor) {
  var form = new GetStorageForm();
  form.fields.storage.defaultValue = Stor;
  form.deploy(); 
}
  
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'getStorage') {
      BlissDeployGetStorage();
    }
  }
);

