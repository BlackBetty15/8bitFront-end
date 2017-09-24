<?php

session_start();
$_SESSION['page'] = 'lesson';
include_once "templates/usertemplates/userheader.php";
require_once "Lesson.php";
?>

<div class="container">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="jumbotron jumbotron-fluid" id="lessonDescriptionJumbatron">
                    <div class="container">
                        <p class="lead" id="courseDescription">
                            <?php

                                $id=$_GET['id'];
                                $result=Lesson::getOneLesson($id);

                            if(is_array($result)){

                            echo $result[0]['opis'];


                            ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="jumbotron jumbotron-fluid" id="courseDescriptionJumbatron">
                    <div class="container">
                        <textarea id="lessonCode" class="form-control" rows="20" style="resize: none"><?php
                            echo $result[0]['primer_koda'];
                            }
                            ?>
                        </textarea>
                        <br>
                        <button type="button" class="btn" id="startCode"onclick="setIframe()" value="Pokreni kod">Pokreni
                            kod</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="jumbotron jumbotron-fluid" id="courseLessonsJumbatron">
                    <div class="container">


                        <iframe src="templates/usertemplates/iframeSorce.html" id="iframeCode">

                       </iframe>

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


<?php
include_once "templates/usertemplates/userfooter.php";
?>
