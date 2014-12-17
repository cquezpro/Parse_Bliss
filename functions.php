<?php
  define('BLISS_ROOT', dirname(__FILE__));
  chdir(BLISS_ROOT);

  function endsWith($haystack, $needle) {
    return substr($haystack, -strlen($needle)) === $needle;
  }

  function getFiles($dir, $file_type) {
    $files = scandir($dir);
    $include = array();
    foreach ($files as $file) { 
      if (!in_array($file, array('.','..'))) {
        if (endsWith($file, $file_type)) {
          $include[] = $file;
        }
      }
    }
    return $include;
  }

  function getLinks($dir, $file_type) {
    $files = getFiles($dir, $file_type);
    $html = '';
    foreach ($files as $file) { 
      $html .= "<a href='/$dir/$file'>$file</a>" .'<br>';
    }
    return $html;
  }

  function includeJs($dir, $path) {
    $files = getFiles($dir, '.js');
    $html = '';
    if ($path == 'absolute') {
      $dir = '/'.$dir;
    }
    foreach ($files as $file) {
      $html .= "<script type='text/javascript' src='$dir/$file'></script>\r\n";
    }
    print $html;
  }

  function includeCss($dir) {
    $files = getFiles($dir, '.css');
    $html = '';
    foreach ($files as $file) { 
      $html .= "<link rel='stylesheet' href='$file'>\r\n";
    }
    print $html;
  }


?>


