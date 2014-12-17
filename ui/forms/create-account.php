<?php require('../../functions.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <?php require('core.includes.php'); ?>

  </head>
  <body>
    <script type="text/javascript" src="/ui/forms/create-account.js"></script>
    <div class="content"></div>
    <script>
      Parse.initialize(Bliss.appId, Bliss.javascriptId);
      $(document).ready(function() {
        User(function(){
          if (!User.current()) {
            User.createAccount(function(){
              new CreateAccountForm().deploy();
            });
          }
          else {
            new CreateAccountForm().deploy();
          }
        });
      });
    </script>
    <div id='login'></div>

  </body>
</html>
