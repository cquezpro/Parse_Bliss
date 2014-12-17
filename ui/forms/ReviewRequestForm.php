<?php require('../../functions.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <?php require('core.includes.php'); ?>
    <!-- Forms -->
    <script type="text/javascript" src="/ui/forms/ReviewRequestForm.js"></script>
  </head>
  <body>
    <script>
      Parse.initialize(Bliss.appId, Bliss.javascriptId);
      new User(function() {
      new ReviewRequestForm().deploy();
    });
    </script>
  </body>
</html>
