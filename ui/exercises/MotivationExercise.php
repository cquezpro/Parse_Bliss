<?php require('../../functions.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <?php require('core.includes.php'); ?>
    <!-- Exercises -->
    <script type="text/javascript" src="/ui/exercises/MotivationExercise.js"></script>
  </head>
  <body>
    <div id="cooldiv">a cool div</div>
    <div class="content"></div>
    <script>
      $(document).ready(function() {
        User(function(){
          Bliss.log('current user');
          Bliss.log(User.current().id);
          new MotivationForm().deploy();
        });
      });
    </script>
  </body>
</html>
