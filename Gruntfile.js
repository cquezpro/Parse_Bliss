module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
              "lib/jquery.js",
              "lib/jquery-ui.js",
              "lib/ejs/ejs.js",
              "lib/parse.js",
              "lib/moment.min.js",
              "lib/underscore.js",
              "lib/Interface.js",
              "lib/extend.js",
              "lib/jquery.autosize.js",
              "lib/jquery.touchwipe.js",
              "lib/jquery.knob.min.js",
              "Bliss.js",
              "config.js",
              'models/AbstractCollection.js',
              'models/ParseCollection.js',
              'models/StorageModel.js',
              'models/DirectStorageModel.js',
              'models/ChromeStorageCollection.js',
              'models/SettingsModel.js',
              'classes/User.js',
              'classes/Storage.js',
              'classes/SplitTest.js',
              'classes/Trainer.js',
              'classes/Presenter.js',
              'ui/BlissView.js',
              'ui/exercises/BlissExercise.js',
              'ui/exercises/*.js',
              'ui/forms/BlissForm.js',
              'ui/forms/*js'
              
              ],
        dest: 'Blissmass.min.js'
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
