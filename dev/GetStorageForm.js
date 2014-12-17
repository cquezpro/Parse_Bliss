GetStorageForm = BlissForm.extend({
  name: 'GetStorageForm',
  display_name: 'Get Storage',
  ignoreUnsaved: true,
  modelClass: StorageModel,
  daysBetweenDeploy: 3,
  dev: true,
  templateDir: 'dev/templates/',
  templates: ['getStorage.tpl.htm'],
  dataClass: 'storage',
  dataLoad: {startDate: Bliss.startOfDay()},
  changed: function() { }, //Over-ride BlissView Change handler
  //Constants set by getStorageDeploy.js
  PostRender: function() {
    //Delete buttons
    $('.delete').click(function(e){
      e.preventDefault();
      var variable = $(e.target.parentNode).attr('variable');
      Storage.remove(variable);
      $(e.target.parentNode).remove();
    });

    //Edit in place fields with jeditable plugin
    $('.value').editable(function(value, settings) {
      var variable = $(this).parent().attr('variable');
      Storage.set(variable, value);
      chrome.runtime.sendMessage({'action': 'exerciseComplete'})
      return value;
    },
    {
      placeholder: '',
    }
    );

    //Load Storage form
    $('#loadButton').click(function(){
      var json = $('#storageText').val();
      json     = JSON.parse(json);
      console.log(json);
      localStorage.clear();
      Storage.wrapper.clear(function() {
        Storage.wrapper.set(json, function() {
          alert('Storage set!');
        });
      });
    });
  },
});

