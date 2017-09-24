<?php
session_start();
$_SESSION['page']='';
include_once "templates/usertemplates/userheader.php";
require_once "Cours.php";
require_once "Lesson.php";

?>

<div class="container">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="jumbotron jumbotron-fluid" id="courseDescriptionJumbatron">
                    <div class="container">
                        <h1 class="display-3">Opis kursa:</h1>
                        <p class="lead" id="courseDescription">
                            <?php
                            $id = trim($_GET['id']);
                            $results = Cours::getOneCourse($id);
                            if (is_array($results)) {
                                echo $results['opis'];
                            } else {
                                echo $results;
                            }


                            ?>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="jumbotron jumbotron-fluid" id="courseLessonsJumbatron">
                    <div class="container">
                        <h1 class="display-3">Lekcije:</h1>

                            <?php
                            $results = Lesson::getLessonsOfCours($id);

                            if (is_array($results) && !empty($results)) {
                                echo ' <ul class="lead" id="courseLessons">';
                                foreach ($results as $r) {
                                    if ($r['status'] == 1) {
                                        echo '<li class="listLesson"><a  href="lessonPage.php?id=' . $r['id'] . '">' . $r['naziv'] . '</a></li>';
                                    }
                                }
                                echo '</ul>';
                            } else if(empty($results)) {
                                echo "<h3 class='display-3'>Trenutno ne postoji nijedna lekcija za ovaj kurs</h3>";
                            }

                            ?>

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


<?php

include_once "templates/usertemplates/userfooter.php";
?>
