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

        $responseStatus=Connection::queryRequest($qry);
        if($responseStatus){
            return 'Uspešno ste poslali poruku';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }

    public static function listAllMessages(){

        $qry="SELECT * FROM posta WHERE 1";
        $results=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }
        }
        return $response;

    }
    public static function listAllRespondedMessages(){

        $qry="SELECT * FROM posta WHERE odgovoreno=1";
        $results=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row= $results->fetch_assoc()){
                $response[]=$row;
            }
        }
        return $response;
    }

    public static function getOneMessage($id){

        $qry="SELECT * FROM posta WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return $result;
        }
        else{
            return 'Tražena poruka ne postoji';
        }
    }

    public static function readMessage($id){
        $qry="UPDATE posta SET procitana=1 WHERE  id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return true;
        }
        else{
            return false;
        }
    }
    public static function getUnrespondedMessages(){

        $qry="SELECT * FROM posta WHERE odgovorena=0";
        $results=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($qry)){
            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }
        }
        return $response;
    }
    public static function openMessage($id){

        $qry="SELECT * FROM posta WHERE id=$id";
        $result=Connection::queryRequest($qry);
        $response=array();
        if(Connection::emptyQueryResults($result)){
            while($row=$result->fetch_assoc()){
                $response[]=$row;
            }
        }

        return $response;
    }



    public static function markAllRead($ids){

        $queryCondition='WHERE ';
        $size=sizeof($ids);

        for($i=0;$i<$size;$i++){

            if($i!=$size-1){
                $queryCondition.="id=".$ids[$i]."OR";
            }
            else{
                $queryCondition.="id=".$ids[$i];
            }
        }

        $qry="UPDATE posta SET procitana=1 ".$queryCondition;

        $result=Connection::queryRequest($qry);

        if($result){
            return true;
        }
        else{
            return false;
        }
    }
    public static function deleteAllMessages($ids){
        $queryCondition='WHERE ';
        $size=sizeof($ids);

        for($i=0;$i<$size;$i++){

            if($i!=$size-1){
                $queryCondition.="id=".$ids[$i]."OR";
            }
            else{
                $queryCondition.="id=".$ids[$i];
            }
        }
        $qry="DELETE  FROM posta ".$queryCondition;
        $result=Connection::queryRequest($qry);

        if($result){
            return true;
        }
        else{
            return false;
        }
    }

    public static function markAllUnread($ids){
        $queryCondition='WHERE ';
        $size=sizeof($ids);

        for($i=0;$i<$size;$i++){

            if($i!=$size-1){
                $queryCondition.="id=".$ids[$i]."OR";
            }
            else{
                $queryCondition.="id=".$ids[$i];
            }
        }

        $qry="UPDATE posta SET procitana=0 ".$queryCondition;
        $result=Connection::queryRequest($qry);

        if($result){
            return true;
        }
        else{
            return false;
        }
    }

    public static function getReadMessages(){
        $qry="SELECT * FROM posta WHERE procitana=1";
        $results=Connection::queryRequest($qry);

        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $results[]=$row;
            }
        }
        return $response;

    }
    public static function getUnreadMessages(){
        $qry="SELECT * FROM posta WHERE procitana=0";
        $results=Connection::queryRequest($qry);

        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $results[]=$row;
            }
        }
        return $response;

    }
    public static function respondedMessages(){

        $qry="SELECT * FROM posta WHERE odgovoreno=1";
        $results=Connection::queryRequest($qry);

        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $results[]=$row;
            }
        }
        return $response;
    }


//SELECT  id ,  naslov ,  posiljalac ,  procitana ,  poruka ,  odgovoreno ,  tip ,  datum  FROM  posta  WHERE 1
}