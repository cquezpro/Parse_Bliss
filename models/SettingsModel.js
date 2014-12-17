/**
 * Extends StorageModel
 */
extend(SettingsModel, StorageModel)

function SettingsModel() {
  SettingsModel.superclass.constructor.call(this, 'Settings');
}

SettingsModel.prototype.defaults = {
  //Initial delay
  'GratitudeExercise_delay': 0,
  'ThreeGoodThingsExercise_delay': 1,
  'HonoringPeopleExercise_delay': 2,
  'TransformingProblemsExercise_delay': 3,
  'BestFutureExercise_delay': 4,
  'CouldBeWorseExercise_delay': 5,
  'SavoringExercise_delay': 6,
  'MeaningInWorkExercise_delay': 7,
  //Repeat frequency
  'GratitudeExercise_repeat': 7,
  'ThreeGoodThingsExercise_repeat': 5,
  'HonoringPeopleExercise_repeat': 7,
  'TransformingProblemsExercise_repeat': 14,
  'BestFutureExercise_repeat': 30,
  'CouldBeWorseExercise_repeat': 30,
  'SavoringExercise_repeat': 30,
  'MeaningInWorkExercise_repeat': 30,
}

SettingsModel.prototype.getDefault = function(param) {
  if (typeof(this.defaults[param]) != 'undefined') {
    return this.defaults[param];
  }
  else if (param.indexOf('_enabled') != -1) {
    return true;      
  }
}
