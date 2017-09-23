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
        $_SESSION['role']=$vrednost['role'];
        $_SESSION['korisnik']=$vrednost['korisnicko_ime'];
        $_SESSION['status']=$vrednost['statuts'];
        $_SESSION['ime']=$vrednost['ime'];
        $_SESSION['prezime']=$vrednost['prezime'];
        $_SESSION['email']=$vrednost['email'];

        if($_SESSION['status']==1){
        Connection::redirectUser($page='adminpanel.php');
        exit();
        }
        else{
            session_unset();
            session_destroy();
            $_SESSION['neaktivan']='Vaš nalog nije aktivan, obratite se glavnom adminu.';
            Connection::redirectUser($page='admin.php');
            exit();
        }

    }

    else{
        $_SESSION['nePostoji']='Pogrešno korisničko ime ili lozinka';
        Connection::redirectUser($page='admin.php');
        exit();

    }



}
?>