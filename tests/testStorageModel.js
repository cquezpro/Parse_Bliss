new StorageModel('pookie_bear').load(function(model) {
  var platitude = model.get('honey');
  alert(platitude);
  model.set('honey', 'BAAAAAD for bears!', function(){
  });
});
