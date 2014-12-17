var collection = new ChromeStorageCollection('ThreeGoodThingsExercise');
collection.delete();
var d = new Date();
  //console.log(d.getTime());
  //collection.load(function() {
  //  collection.removeModel('YNNKP3y7Krq3ZFXj');
  //  console.log(d.getTime());
  //  console.log(collection);
  //  for (x=0; x < 1; x++) {
  //      model = collection.addModel();
  //    console.log(collection.currentModel);
  //    model.set('poo', 'smells bad');
  //      model.save();
  //  }
  //});
  

Storage.wrapper.get(null, function(data) {
  console.log('big data');
  console.log(data);
});
