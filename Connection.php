<?php

include_once 'config.php';

class Connection
{

    private $con; /*konekcija*/
    private static $point;

    private function __construct()
    {
        $host= DB_HOST;
        $user= DB_USER;
        $pass= DB_PASS;
        $name= DB_NAME;


        $this->con= @mysqli_connect($host,$user,$pass,$name)
            OR
        die('Database error'.mysqli_connect_error());

        mysqli_set_charset($this->con, 'utf8');
    }

    public static function pointerConnection(){

        if(self::$point==null){
            self::$point= new Connection();
        }

        return self::$point;
    }

    public function getConnection(){

        if($this->con==null){
            self::pointerConnection();
        }
        return $this->con;
    }

    public static function queryRequest($query){
        return Connection::pointerConnection()->getConnection()->query($query);
    }

    public static function emptyQueryResults($result){
        if($result->num_rows===0)
            return 0;
        else
            return 1;
    }
    public function __destruct()
    {
        @mysqli_close($this->con) OR die('Disconnect problem');
    }

    public static function redirectUser($page){

        $url='http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
        /*Dodeljuje se ime hosta(domaćina) a zatim postavlja u tekući direktorijum, a to je direktorijum iz kog se poziva funkcija*/

        $url=trim($url,'/\\'); /*uklanja kose crtne na kraju*/

        $url.='/'.$page; /*dodaje ime stranice na koju preusmeravamo*/

        header('Location:'.$url);/*Preusmeravanje*/
        exit(); /*Prekida izvršavanje skripta*/

    }
}