<?php require_once('functions.php'); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <!-- Stylesheets -->
    <link rel="stylesheet" href="lib/jquery-ui.css" type="text/css" media="all">
    <link rel="stylesheet" href="reset.css" type="text/css" media="all">
    <link rel="stylesheet" href="ui/style.css" type="text/css" media="all">
    <link rel="stylesheet" href="ui/exercises/exercises.css" type="text/css" media="all">
    <link rel="stylesheet" href="ui/form.css" type="text/css" media="all">
    <link rel="stylesheet" href="content_script.css" type="text/css" media="all">
    <!-- Dev -->
    <script src='phonegap.js'></script>
    <script type="text/javascript" src="phonegap/index.js"></script>
    <script type="text/javascript" src="dev/stacktrace.js"></script>
    <!-- Core Lib -->
    <script type='text/javascript' src="lib/jquery.js"></script>
    <script type='text/javascript' src="lib/jquery-ui.js"></script>
    <script type='text/javascript' src="lib/ejs/ejs.js"></script>
    <script type='text/javascript' src="lib/parse.js"></script>
    <script type='text/javascript' src="lib/moment.min.js"></script>
    <script type='text/javascript' src="lib/underscore.js"></script>
    <script type='text/javascript' src="lib/Interface.js"></script>
    <script type='text/javascript' src="lib/extend.js"></script>
    <script type='text/javascript' src="lib/jquery.autosize.js"></script>
    <script type='text/javascript' src="lib/jquery.touchwipe.js"></script>
    <script type='text/javascript' src="lib/jquery.knob.min.js"></script>
    <script type='text/javascript' src="Bliss.js"></script>
    <script type='text/javascript' src="config.js"></script>
    <script type='text/javascript' src='models/AbstractCollection.js'></script>
    <script type='text/javascript' src='models/ParseCollection.js'></script>
    <script type='text/javascript' src='models/StorageModel.js'></script>
    <script type='text/javascript' src='models/DirectStorageModel.js'></script>
    <script type='text/javascript' src='models/ChromeStorageCollection.js'></script>
    <script type='text/javascript' src='models/SettingsModel.js'></script>
    <script type='text/javascript' src='classes/User.js'></script>
    <script type='text/javascript' src='classes/Storage.js'></script>
    <script type='text/javascript' src='classes/SplitTest.js'></script>
    <script type='text/javascript' src='classes/Trainer.js'></script>
    <script type='text/javascript' src='classes/Presenter.js'></script>
    <script type='text/javascript' src='ui/BlissView.js'></script>
    <!-- Exercises -->
    <script type='text/javascript' src='/ui/exercises/BlissExercise.js'></script>
    <?php require('exercises.includes.php'); ?>
    <!-- Forms -->
    <script type='text/javascript' src='/ui/forms/BlissForm.js'></script>
    <?php require('forms.includes.php'); ?>

    <script type='text/javascript' src='classes/Storage.js'></script>

    <link rel="stylesheet" href="lib/css/icomoon.css" type="text/css" media="all">
    <script type="text/javascript" src="ui/review/Review.js"></script>
    <script type="text/javascript" src="ui/forms/BlissForm.js"></script>
    <script type="text/javascript" src="ui/forms/LoginForm.js"></script>
    <script type="text/javascript" src="ui/forms/create-account.js"></script>
    <script type="text/javascript" src="ui/review/ExerciseTab.js"></script>
    <link rel="stylesheet" href="ui/review/ExerciseTab.css" type="text/css" media="all">
    <link rel="stylesheet" href="ui/review/Review.css" type="text/css" media="all">
  </head>
  <body>
  <div id="exercise-tab-container" class="clearfix">

    <header class="exercise-tab-header clearfix">
       <a class="exerciseExpander" href="#"><span class="icon-menu2 menu-icon"></span></a>
      <center><h2>Your Exercises</h2></center> 

    </header>
    <div class="exercise-inner expanded"></div>
  </div>
  </body>
</html>
