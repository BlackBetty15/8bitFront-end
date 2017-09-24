<?php

require_once 'Connection.php';

class Cours
{

    private $coursId;
    private $coursName;
    private $coursDescription;
    private $coursStatus;


    public function __construct($id,$name,$description,$status)
    {
        $this->coursId=$id;
        $this->coursName=$name;
        $this->coursDescription=$description;
        $this->coursStatus=$status;
    }

    public static function getOneCourse($id){

        $qry="SELECT * FROM  kursevi WHERE id=$id";
        $results=Connection::queryRequest($qry);
        if(Connection::emptyQueryResults($results)){
            return $results->fetch_assoc();
        }
        else{
            return "Kurs ne postoji";
        }

    }
    public static function getAllCourses(){
        $qry="SELECT * FROM  kursevi WHERE 1";

        $results=Connection::queryRequest($qry);
        $emptyResultMessage="Trenutno ne postoji nijedan kurs";
        $response=array();
        if(Connection::emptyQueryResults($results)){

            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }
            return ($response);
        }
        else{
            return $emptyResultMessage;
        }
    }
    public static function getAllActiveCourses(){

        $qry="SELECT * FROM kursevi WHERE status=1";

        $results=Connection::queryRequest($qry);
        $emptyReslutMessage='Trenutno nema aktivnih kurseva';
        $respose=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $respose[]=$row;
            }
            return $respose;
        }
        else{
            return $emptyReslutMessage;
        }

    }

    public static function makeNewCours($name,$description,$status){



        $qry="INSERT INTO kursevi(naziv, opis, status) VALUES ('".$name."','".$description."', $status)";
        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste dodali kurs';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }
    }
    public static function deleteCours($id){

        //todo delete all other things that are related to this cours
        $qry="DELETE FROM kursevi WHERE id=$id";

        $responseStatus=Connection::queryRequest($qry);
        if($responseStatus){
            return 'Uspešno ste obrisali kurs';
        }
        else{
            return 'Došlo je do greške';
        }


    }

    public static function changeStatus($id,$status){

        $now='';
        if($status==0){
            $now='deaktivirali';
        }
        else{
            $now='aktivirali';
        }

        $qry="UPDATE kursevi SET status= $status WHERE id=$id";
        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste '.$now.' kurs.';
        }
        else{
            return 'Došlo je do greške';
        }
    }

    public static function changeDescription($id,$description){

        $qry="UPDATE kursevi SET opis='".$description."' WHERE id=$id";
        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste promenili opis kursa.';
        }
        else{
            return 'Došlo je do greške.';
        }
    }
}