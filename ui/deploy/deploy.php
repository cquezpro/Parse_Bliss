<?php require_once('../../functions.php'); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!--Make page fit in any screen sizes-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <?php require_once('core.includes.php'); ?>
    <!-- Exercises -->
    <?php require_once('exercises.includes.php'); ?>
    <!-- Trackers -->
    <?php require_once('track.includes.php'); ?>
    <!-- Forms -->
    <?php require_once('forms.includes.php'); ?>
    <!-- Deploy -->
    <script type="text/javascript" src="/dev/getStorageDeploy.js"></script>
    <script type="text/javascript" src="/dev/GetStorageForm.js"></script>
    <script type="text/javascript" src="/ui/deploy/deploy.js"></script>

  </head>
  <body>
    <div class="connection-status" style="display: none;">
      <h3>Could not connect to server</h3>
      <p>Sorry, Bliss requires an internet connection to work</p>
      <p><a href="#">Click here to try reloading</a></p>
    </div>
  </body>
  </html>
