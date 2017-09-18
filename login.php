<?php

require_once 'Connection.php';
require_once 'User.php';
session_start();

if (!empty($_POST['usr'])&& !empty($_POST['psd'])){

    $usr=$_POST['usr'];
    $psd=$_POST['psd'];

    $vrednost=User::login($usr,$psd);

    if (is_array($vrednost)){

        //todo set this things accordingly to fields
//        $_SESSION['idKorisnik']=$vrednost['id'];
//        $_SESSION['tip']=$vrednost['tip'];
//        $_SESSION['korisnik']=$vrednost['username'];
//        $_SESSION['lozinka']=$vrednost['pass'];
//        $_SESSION['aktivan']=$vrednost['aktivan'];
//        $_SESSION['ime']=$vrednost['ime'];
//        $_SESSION['prezime']=$vrednost['prezime'];

        Connection::redirectUser($page='adiminpanel.php');
        exit();

    }

    else{

        Connection::redirectUser($page='admin.php');
        exit();
    }



}
?>