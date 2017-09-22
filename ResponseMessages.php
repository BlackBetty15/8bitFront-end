<?php

/**
 * Created by PhpStorm.
 * User: milic
 * Date: 18.9.2017.
 * Time: 22:56
 */
require_once 'Connection.php';

class ResponseMessages
{
    private $messageId;
    private $receivedMessageId;
    private $receiver;
    private $sentStatus;
    private $finnished;
    private $message;


    public function __construct($id, $receivedMessageId, $receiver, $sentStatus, $finnished, $message)
    {
        $this->messageId = $id;
        $this->receivedMessageId = $receivedMessageId;
        $this->receiver = $receiver;
        $this->sentStatus = $sentStatus;
        $this->finnished = $finnished;
        $this->message = $message;

    }

    public static function getMyMessages()
    {

        $qry = "SELECT * FROM moje_poruke WHERE 1";
        $results = Connection::queryRequest($qry);
        $response = array();

        if (Connection::emptyQueryResults($qry)) {
            while ($row = $results->fetch_assoc()) {
                $response[] = $row;
            }
        }

        return $response;
    }

    public static function getSentMessages()
    {

        $qry = "SELECT * FROM moje_poruke WHERE poslata=1";
        $results = Connection::queryRequest($qry);
        $response = array();

        if (Connection::emptyQueryResults($qry)) {
            while ($row = $results->fetch_assoc()) {
                $response[] = $row;
            }
        }

        return $response;
    }

    public static function getDraftMessages()
    {
        $qry = "SELECT * FROM moje_poruke WHERE dovrsena=0";
        $results = Connection::queryRequest($qry);
        $response = array();

        if (Connection::emptyQueryResults($qry)) {
            while ($row = $results->fetch_assoc()) {
                $response[] = $row;
            }
        }

        return $response;
    }

    public static function writeMessage($idReceived, $receiver, $sentStatus, $finnished, $message)
    {
        $qry = "INSERT INTO moje_poruke( id_primljene,primalac, poslata, dovrsena, poruka)
              VALUES ($idReceived,'" . $receiver . "',$sentStatus,$finnished,'" . $message . "')";

        $result = Connection::queryRequest($qry);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendMessage($to, $subject, $message, $id)
    {

        $header = "From:8BitFrontEnd@gmail.com \r\n";
        $header .= "MIME-Version: 1.0\r\n";
        $header .= "Content-type: text/html\r\n";

        $retval = mail($to, $subject, $message, $header);

        $qry = "UPDATE moje_poruke SET poslata=1, dovrsena=1 WHERE id_primljene=$id";
        if ($retval == true) {
            $result = Connection::queryRequest($qry);

            if ($result) {
                return true;
            } else {
                return false;
            }

        } else {
            $result = ResponseMessages::makeDraftMessage($id);

            return $result;
        }
    }

    public static function deleteMessage($id)
    {
        $qry = " DELETE FROM moje_poruke WHERE id=$id";
        $result = Connection::queryRequest($qry);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public static function makeDraftMessage($id)
    {
        $qry="UPDATE moje_poruke SET poslata=0, dovrsena=0 WHERE id_primljene=$id";
        $result = Connection::queryRequest($qry);

        if ($result) {
            return true;
        } else {
            return false;
        }



    }


}