<?php

require_once 'Connection.php';
require_once 'User.php';
session_start();

if (!empty($_POST['usr'])&& !empty($_POST['psd'])){

    $usr=$_POST['usr'];
    $psd=$_POST['psd'];

    $vrednost=User::login($usr,$psd);

    if (is_array($vrednost)){


        $_SESSION['idKorisnik']=$vrednost['id'];
        $_SESSION['rola']=$vrednost['role'];
        $_SESSION['korisnik']=$vrednost['korisnicko_ime'];
        $_SESSION['status']=$vrednost['status'];
        $_SESSION['ime']=$vrednost['ime'];
        $_SESSION['prezime']=$vrednost['prezime'];
        $_SESSION['email']=$vrednost['email'];

        Connection::redirectUser($page='adiminpanel.php');
        exit();

    }

    else{

        Connection::redirectUser($page='admin.php');
        exit();
    }



}
?>