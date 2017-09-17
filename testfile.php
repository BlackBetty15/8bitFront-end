<?php

require_once 'Connection.php';
require_once 'Cours.php';
require_once 'User.php';

if (!isset($_GET['action'])){
    header("HTTP/1.1 403 Žao nam je, nemate pristup ovoj stranici... ");
}
else{
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
    case 'add-user':{
        $firstName=trim($_POST['first_name']);
        $lastName=trim($_POST['last_name']);
        $username=trim($_POST['username']);
        $email=trim($_POST['email']);
        $password=trim($_POST['password']);
        $status=trim($_POST['status']);
        $role=trim($_POST['role']);

        $response=User::createUser($firstName,$lastName,$username,$password,$email,$status,$role);

        echo $response;
        break;
    }
    case 'delete-user':{break;}
    case 'change-user-first-name':{break;}
    case 'change-user-last-name':{break;}
    case 'change-user-status':{break;}
    case 'change-user-role':{break;}
    case 'change-user-password':{break;}
    case 'get-all-users':{break;}
    case 'get-specific-user':{break;}
    case 'get-user-role':{break;}
    case 'get-all-roles':{break;}
    case 'get-all-lessons':{break;}
    case 'get-all-lessons-of-cours':{break;}
    case 'get-all-active-lessons':{break;}
    case 'change-lessons-name':{break;}
    case 'change-lessons-status':{break;}
    case 'change-lessons-code':{break;}
    case 'change-lessons-description':{break;}
    case 'delete-lesson':{break;}
    case 'add-new-lesson':{break;}
    case 'change-lessons-cours':{break;}

}
}
?>
