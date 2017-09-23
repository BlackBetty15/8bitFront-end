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
                    <table  >
                        <tr><td id="zaglavlje" colspan="5">Odaberite  jezik  za  učenje:</td></tr>
                        <tr class="ostatak">
                            <td></td>
                            <td><a>HTML</a></td>
                            <td></td>
                        </tr>
                        <tr class="ostatak">
                            <td></td>
                            <td><a>CSS</a></td>
                            <td></td>
                        </tr>
                        <tr class="ostatak">
                            <td></td>
                            <td><a>JavaScript</a></td>
                            <td></td>
                        </tr>
                    </table>
                </nav>
            </div>
        </div>
    </div>

</div>




<?php
include_once 'templates/usertemplates/userfooter.php';
?>