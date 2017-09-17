<?php

/**
 * Created by PhpStorm.
 * User: milic
 * Date: 17.9.2017.
 * Time: 14:47
 */
class Messages
{
    private $messageId;
    private $messageSubject;
    private $messageSender;
    private $messageReadStatus;
    private $message;
    private $messageResponseStatus;
    private $messageSenderFirstName;
    private $messageDate;
    private $senderLastName;

    public function __construct($id,$subject,$sender,$readStatus,$message,$responseStatus,$senderFirstName,
                                $senderLastName,$messageDate)
    {
        $this->messageId=$id;
        $this->messageSubject=$subject;
        $this->messageSender=$sender;
        $this->messageReadStatus=$readStatus;
        $this->message=$message;
        $this->messageResponseStatus=$responseStatus;
        $this->messageSenderFirstName=$senderFirstName;
        $this->messageDate=$messageDate;
        $this->senderLastName=$senderLastName;
    }


    public static function sendMessage($subject,$sender,$senderFirstName,$senderLastName,$message){
        
        $qry="INSERT INTO posta(naslov ,  posiljalac , posiljalac_ime, posiljalac_prezime,  procitana ,  poruka ,  odgovoreno)
        VALUES ('".$subject."','".$sender."','".$senderFirstName."','".$senderLastName."',0,'".$message."',0)";
    }

//SELECT  id ,  naslov ,  posiljalac ,  procitana ,  poruka ,  odgovoreno ,  tip ,  datum  FROM  posta  WHERE 1
}