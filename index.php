<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home page of Vue-Sandbox Repository</title>
</head>
<body>
<h1>Home page of Vue-Sandbox Repository</h1>
<?php if (file_exists("favicon.ico") == true) { ?>
    <img src="favicon.ico" alt="favicon" style="height: 100px">
<?php } ?>
<h2>Choose an exercice under:</h2>
<div style="font-size: 1.5em">
   <?php
   $excludedFilesOrFolder = [".git", ".idea", "index.php", ".gitignore", "README.md", "favicon.ico", "node_modules"];
   $files = scandir('.');
   foreach ($files as $file) { //foreach files in the document root folder
      if ($file != '.' && $file != '..' && in_array($file, $excludedFilesOrFolder) == false) {
         echo "<a href='" . "/" . $file . "/'> " . $file . "</a>" . '<br>';
      }
   }
   ?>
</div>
</body>
</html>