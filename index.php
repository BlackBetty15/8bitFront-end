<?php
session_start();
$_SESSION['page']='index';
include 'templates/usertemplates/userheader.php';

?>

<div class="container">
    <div class="container-fluid">
        <div class="row">
            <div id="logo">
                <div id="logoSlika">
                    <img class="img-responsive" src="images/logopng2.png" alt="Logo sajta">
                </div>
            </div>
            <div id="menu" class="table-responsive">
                <nav id="menuChose" class="container-fluid">
                    <div class="menu">
                        <h6 id="zaglavlje">Odaberite jezik za učenje:</h6>
                        <ul id="courseList">
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>

</div>




<?php
include_once 'templates/usertemplates/userfooter.php';
?>