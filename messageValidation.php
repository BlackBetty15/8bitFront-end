<?php
require_once 'captcha/securimage.php';
require_once 'Connection.php';
require_once 'Messages.php';

$firstName=$_POST['name'];
$lastName=$_POST['surname'];
$email=$_POST['email'];
$subject=$_POST['subject'];
$message=$_POST['message'];
$code=$_POST['captcha_code'];


$image = new Securimage();
if ($image->check($_POST['captcha_code']) == true) {

    if(!empty($firstName)&& !empty($lastName) && !empty($email) && !empty($subject) && !empty($message)){

        $result=Messages::sendMessage($subject,$email,$firstName,$lastName,$message);
        if($result){
            echo 1;
        }
        else{
            echo 0;
        }
    }


} else {
    echo 2;
}






?>