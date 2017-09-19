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
    case 'delete-user':{
        $id=trim($_POST['id']);

        $response=User::deleteUser($id);
        echo $response;
        break;
    }
    case 'change-user-first-name':{
        $firstName=trim($_POST['first_name']);
        $id=trim($_POST['id']);

        $response=User::changeFirstName($id,$firstName);
        echo $response;

        break;
    }
    case 'change-user-last-name':{
        $lastName=trim($_POST['last_name']);
        $id=trim($_POST['id']);

        $response=User::changeLastName($id,$lastName);
        echo $response;

        break;}
    case 'change-user-status':{
        $id=trim($_POST['id']);
        $status=trim($_POST['status']);

        $response=User::changeUsersStatus($id,$status);
        echo $response;
        break;}

    case 'change-user-role':{
        $id=trim($_POST['id']);
        $role=trim($_POST['role']);

        $response=User::changeUsersRole($id,$role);
        echo $response;

        break;}
    case 'change-user-password':{
        $old=trim($_POST['old_password']);
        $new=trim($_POST['new_password']);
        $id=trim($_POST['id']);

        $response=User::changePassword($id,$old,$new);
        echo $response;

        break;}
    case 'get-all-users':{

        $response=User::getAllUsers();
        echo (json_encode($response));

        break;}

    case 'get-specific-user':{

        $id=trim($_POST['id']);
        $response=User::getSpecificUser($id);
        echo (json_encode($response)) ;

        break;
    }
    case 'get-user-role':{
        $id=trim($_POST['id']);
        $response=User::getUserRole($id);
        echo $response ;
        break;
    }
    case 'get-all-roles':{
          $response=User::getAllRoles();
        echo (json_encode($response));

        break;
    }
    case 'get-all-lessons': {

        $response=Lesson::getAllLessons();
        echo (json_encode($response));

        break;
    }
    case 'get-all-lessons-of-cours':{
        $courseId=trim($_POST['course_id']);
        $response=Lesson::getLessonsOfCours($courseId);
        echo (json_encode($response));
        break;
    }
    case 'get-all-active-lessons':{

        $response=Lesson::getAllActiveLessons();
        echo (json_encode($response));

        break;
    }
    case 'change-lessons-name':{

        $id=trim($_POST['id']);
        $newName=trim($_POST['new-name']);
        $response=Lesson::changeLessonName($id,$newName);
        echo $response;

        break;
    }
    case 'change-lessons-status':{

        $id=trim($_POST['id']);
        $newStatus=trim($_POST['new-status']);
        $response=Lesson::changeLessonStatus($id,$newStatus);
        echo $response;

        break;}
    case 'change-lessons-code':{
        $id=trim($_POST['id']);
        $newCode=trim($_POST['new-code']);
        $response=Lesson::changeLessonCode($id,$newCode);
        echo $response;

        break;
    }
    case 'change-lessons-description':{

        $id=trim($_POST['id']);
        $newDesc=trim($_POST['new_description']);
        $response=Lesson::changeLessonDescription($id,$newDesc);

        echo $response;

        break;}

    case 'delete-lesson':{

        $id=trim($_POST['id']);
        $response=Lesson::deleteLesson($id);

        echo $response;

        break;}

    case 'add-new-lesson':{

        $courseId=trim($_POST['course_id']);
        $lessonName=trim($_POST['lesson_name']);
        $lessonDesc=trim($_POST['lesson_description']);
        $lessonCode=trim($_POST['lesson_code']);
        $lessonStatus=trim($_POST['lesson_status']);
        $response=Lesson::addNewLesson($courseId, $lessonName, $lessonDesc,$lessonCode,$lessonName);

        echo $response;

        break;
    }

    case 'change-lessons-cours':{

        $id=trim($_POST['id']);
        $courseId=trim($_POST['course_id']);
        $response=Lesson::changeLessonCours($id,$courseId);

        echo $response;

        break;
    }

    case 'get-all-messages':{

        $response=Messages::listAllMessages();
        echo (json_encode($response));

        break;
    }

    case 'delete-messages':{

        $ids=trim($_POST['id_array']);
        $response=Messages::deleteAllMessages($ids);

        echo $response;
        break;
    }

    case 'mark-as-unread-messages':{

        $ids=trim($_POST['id_array']);
        $response=Messages::markAllUnread($ids);
        echo $response;

        break;
    }
    case 'send-message':{
        //todo send message

        break;
    }
    case 'get-responded-messages': {

        $response=Messages::respondedMessages();
        echo (json_encode($response));

        break;
    }
    case 'get-unresponded-messages':{
//        $response=Messages::respo
       //todo fix this shit
        break;
    }
    case 'open-message':{

        $id=trim($_POST['id']);
        $response=Messages::readMessage($id);
        //fixme fix this function
        echo $response;

        break;}
    case 'mark-as-read-message':{

        $ids=trim($_POST['id_array']);
        $response=Messages::markAllRead($ids);
        
        echo $response;

        break;
    }
//    case '':{break;}
//    case '':{break;}
//    case '':{break;}
//    case '':{break;}
//    case '':{break;}
}
}
?>
