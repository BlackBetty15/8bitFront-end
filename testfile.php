<?php

require_once 'Connection.php';
require_once 'Cours.php';


if (!isset($_GET['action'])){
    header("HTTP/1.1 403 Žao nam je, nemate pristup ovoj stranici... ");
}
$action = trim($_GET['action']);



switch($action){

    //todo try this but instead of returning an array return data, it's easier to check if it's not valid
    case 'get-courses':{
        $courses=Cours::getAllCourses();
        echo (json_encode( $courses));
        break;
    }
    case 'get-active-courses':{
        $courses=Cours::getAllActiveCourses();
        echo (json_encode($courses));
        break;
    }
    case 'add-course':{

        $name=trim($_POST['name']);
        $description=trim($_POST['description']);
        $status=1;

        $response=Cours::makeNewCours($name,$description,$status);
        echo $response;
        break;
    }
    case 'delete-course':{
        $id=trim($_POST['id']);

        $response=Cours::deleteCours($id);
        echo $response;
        break;
    }
    case 'change-course-status':{
        $id=trim($_POST['id']);
        $status=trim($_POST['status']);

        $response=Cours::changeStatus($id,$status);
        echo $response;
        break;
    }
    case 'change-course-description':{
        $id=trim($_POST['id']);
        $description=trim($_POST['description']);

        $response=Cours::changeDescription($id,$description);
        echo $response;

        break;
    }

}
?>