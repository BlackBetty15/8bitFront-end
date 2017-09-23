<?php

require_once 'Connection.php';

class Lesson
{

    private $lessonId;
    private $coursId;
    private $lessonName;
    private $lessonDescription;
    private $lessonCode;
    private $lessonStatus;

    public function __construct($id, $coursId, $lessonName, $lessonDescription, $lessonCode,$lessonStatus)
    {
        $this->lessonId=$id;
        $this->coursId=$coursId;
        $this->lessonName=$lessonName;
        $this->lessonDescription=$lessonDescription;
        $this->lessonCode=$lessonCode;
        $this->lessonStatus=$lessonStatus;
    }

    public static function getAllLessons(){


        $qry="SELECT * FROM lekcije WHERE 1";
        $results=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }

        }

        return $response;


    }

    public static function getAllActiveLessons(){


        $qry="SELECT * FROM lekcije WHERE status=1";
        $results=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $results[]=$row;
            }
            
        }
        
        return $response;


    }

    public static function getLessonsOfCours($coursId){

        $qry="SELECT * FROM lekcije WHERE id_kursa=$coursId";
        $results= Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }
        }

        return $response;
    }

    public static function getOneLesson($id){

        $qry="SELECT * FROM lekcije WHERE id=$id";
        $result=Connection::queryRequest($qry);
        $response=array();

        if(Connection::emptyQueryResults($result)){
            $response[]=$result->fetch_assoc();
        }
        return $response;
    }
    public static function lessonModification($id,$coursId, $lessonName, $lessonDescription, $lessonCode,$lessonStatus){

        $qry="UPDATE lekcije  SET  id_kursa =$coursId,
              naziv ='".$lessonName."', opis ='".$lessonDescription."', primer_koda ='".$lessonCode."',
              status=$lessonStatus WHERE id=$id";
            $result=Connection::queryRequest($qry);
            if($result){
                return "Uspešno ste izmenili parametre lekcije";
            }
        else{
                return'Došlo je do greške, pokušajte kasnije';
        }

    }

    public static function deleteLesson($id){


        $qry="DELETE FROM lekcije WHERE id=$id";
        $result=Connection::queryRequest($qry);
        if($result){
            return 'Uspešno ste obrisali lekciju';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije.';
        }

    }

    public static function addNewLesson($coursId,$name,$description,$code,$status){

        $qry="INSERT INTO lekcije (id_kursa,  naziv ,  opis ,  primer_koda ,  status )
              VALUES ($coursId, '".$name."','".$description."','".$code."',$status )";

        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste dodali kurs';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }
    public static function changeLessonName($id, $newName){


        $qry="UPDATE lekcije SET naziv='".$newName."'WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste promenili naziv lekcije';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }

    public static function changeLessonStatus($id,$status){

        $now='';
        if($status==1){
            $now='aktivirali';
        }
        else{
            $now='deaktivirali';
        }


        $qry="UPDATE lekcije SET status=$status WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste '.$now.' lekciju';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }
    }

    public static function changeLessonDescription($id,$description){


        $qry="UPDATE lekcije SET opis='".$description."' WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste promenili opsi kursa';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }
    public static function changeLessonCours($id,$coursId){

        $qry="UPDATE lekcije SET id_kursa=$coursId  WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste promenili kurs za lekciju';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }
    public static function changeLessonCode($id, $code){

        $qry="UPDATE lekcije SET primer_koda='".$code."' WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if($result){
            return 'Uspešno ste izmenili kod za lekciju';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }
}