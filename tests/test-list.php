<?php require_once('../functions.php'); 

$tests = getFiles('tests', '.js');

//Remove these files, not real tests
$tests = array_diff($tests, ['test.js']);

foreach ($tests as $test) { 
  print "<a href='/tests/test.htm?script=$test'>$test</a><br><br>";
}

?>


