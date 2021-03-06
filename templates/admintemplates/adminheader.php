<?php
session_start();
if(isset($_SESSION['ime'])&& isset($_SESSION['prezime'])){
    $ime=$_SESSION['ime'];
    $prezime=$_SESSION['prezime'];
    $korisnik=$ime.' '.$prezime;
}

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="css/adminpanel.css">
    <link href="css/mailStyle.css" rel="stylesheet">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>

<nav class="navbar navbar-default" id="headerNavigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false" id="burgerButton">
                <span class="sr-only">Toggle navigation</span>
                <span class="glyphicon glyphicon-menu-hamburger"></span>
            </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <?php if(isset($korisnik)){  ?>
            <ul class="nav navbar-nav navbar-right">
                <li class="spanLi" data-panel="superuserSettings" onclick="switchCards(this)">
                    <span class="userSpan"><?php echo $korisnik;?>
                    </span>
                </li>
                <li class="spanLi">
                <a href="logout.php"><span class="glyphicon glyphicon-off" id="logoutSpan"></span></a>
                    <a href="logout.php" id="logoutText">Log out</a>
                </li>
            </ul>
            <?php } ?>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>