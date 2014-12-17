<?php require('../../functions.php'); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <?php require('core.includes.php'); ?>
    <!-- Exercises -->
    <?php require('exercises.includes.php'); ?>
    <link rel="stylesheet" href="/lib/css/icomoon.css" type="text/css" media="all">
    <script type="text/javascript" src="/ui/review/Review.js"></script>
    <script type="text/javascript" src="/ui/forms/BlissForm.js"></script>
    <script type="text/javascript" src="/ui/forms/LoginForm.js"></script>
    <script type="text/javascript" src="/ui/forms/create-account.js"></script>
    <script type="text/javascript" src="/ui/review/ExerciseTab.js"></script>
    <link rel="stylesheet" href="/ui/review/ExerciseTab.css" type="text/css" media="all">
    <link rel="stylesheet" href="/ui/review/Review.css" type="text/css" media="all">
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
