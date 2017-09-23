<?php

?>
<!doctype html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>8-bit Front-end</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/userinterface.css">
    <link rel="stylesheet" href="css/responsive.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>
<header>

    <nav class="navbar navbar-default" id="mainnav">
        <div class="container-fluid">
            <div class="navbar-header">
            </div>
            <ul class="nav navbar-nav">
                <li <?php if(isset($_SESSION['page']) && ($_SESSION['page']=='index'))
                {echo'class="active"';} ?>><a href="index.php">Početna</a></li>
                <li <?php if(isset($_SESSION['page']) && ($_SESSION['page']=='about'))
                {echo'class="active"';} ?>><a href="about.php">O projektu</a></li>
                <li <?php if(isset($_SESSION['page']) && ($_SESSION['page']=='messages'))
                {echo'class="active"';} ?>><a href="message.php">Pošalji nam poruku</a></li>
            </ul>
        </div>

    </nav>

</header>
