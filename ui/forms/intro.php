<?php require('../../functions.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <?php require('core.includes.php'); ?>
    <?php require('track.includes.php'); ?>

  </head>
  <body>
    <script type="text/javascript" src="/ui/forms/intro.js"></script>
    <div class="content"></div>
    <script>
      Parse.initialize(Bliss.appId, Bliss.javascriptId);
      $(document).ready(function() {
        User(function(){
          new IntroForm().deploy();
        });
      });
    </script>

  </body>
</html>
