<?php

if (!isset($_SESSION['idKorisnik']) || !isset($_SESSION['role']) || !isset($_SESSION['korisnik']) ||
    !isset($_SESSION['status'])
) {
    header("Location: errorPage.php");
    die();
}

?>
<div class="row" id="editPanel" xmlns="http://www.w3.org/1999/html">
    <ul class="nav nav-tabs">
        <li class="active cardMenu" data-panel="accountSettings" onclick="switchCards(this)">
            <p class="navText">
                Upravljanje
                <br>
                kursevima
            </p>
        </li>
        <?php
        if (isset($_SESSION['role']) && $_SESSION['role'] == 1) {
            echo '
            <li class="cardMenu" href="#" data-panel="manageUsers" onclick="switchCards(this)">
            <p class="navText">
                Upravljanje
                <br>
                korisnicima
            </p>
        </li>';
        }
        ?>
        <li class="cardMenu" href="#" data-panel="manageAccounts" onclick="switchCards(this)">
            <p class="navText">
                Upravljanje
                <br>
                lekcijama
            </p>
        </li>
        <li class="cardMenu" href="#" data-panel="superuserSettings" onclick="switchCards(this)">
            <p class="navText">
                Moj
                <br/>
                profil
            </p>
        </li>
        <?php

        if (isset($_SESSION['role']) && $_SESSION['role'] == 1) {
            echo '<li class="cardMenu" href="#" data-panel="inbox" onclick="switchCards(this)">

            <p class="navText">
                Pristigle <span  id="newMessages" style="height: 1.5rem ;width:1.5rem; padding:0.125rem;background-color:#a94442;"></span>
                <br>
                poruke
            </p>
        </li> ';
        }
        ?>

    </ul>
</div>


<div class="container-fluid card" id="accountSettings">

    <div class="formCommon noShadow">
        <legend>Kursevi:</legend>

        <table class="table table-responsive">
            <thead>
            <td class="peopleTableHead">Ime kursa</td>
            <td class="peopleTableHead">Opis</td>
            <td class="peopleTableHead">Status</td>
            <td class="peopleTableHead">Obriši</td>
            <td class="peopleTableHead">Sačuvaj</td>
            </thead>
            <tbody id="allCourses" class="tableBodyEditPanel">

            </tbody>
        </table>


    </div>
    <div>
        <span class="glyphicon glyphicon-plus" id="editNewCours"></span>
        Dodaj novi kurs
    </div>
    <div class="row popup" id="coursPopup">
        <div class="col-md-1"></div>

        <div class="col-md-10 formCommon noShadow">
            <fieldset>
                <div class="row">
                    <br>
                    <div class="col-md-2 inlineLabel">Naziv kursa:</div>
                    <div class="col-md-6"><input type="text" id="coursName" name="cours_name"></div>
                    <div class="col-md-1 inlineLabel">Aktiviraj:</div>
                    <div class="col-md-1">
                        <label>Da</label>
                        <input type="radio" name="coursRadio" value="1" checked>
                    </div>
                    <div class="col-md-1">
                        <label>Ne</label>
                        <input type="radio" name="coursRadio" value="0">
                    </div>
                </div>
                <br>
                <br>
                <div class="row">
                    <div class="col-md-2 inlineLabel">Opis kursa:</div>
                    <div class="col-md-6">
                        <textarea id="coursDescription" rows="7" cols="53" name="cours_description"></textarea>
                    </div>
                    <div class="col-md-2">
                        <button class="btn-success" id="saveNewCours">Sačuvaj</button>
                    </div>
                </div>
                <br>
                <div class="row" id="coursError">

                </div>
            </fieldset>
        </div>

        <div class="col-md-1"></div>

    </div>
    <br>
</div>

<!-- User list -->

<div class="container-fluid card" id="manageUsers">
    <div class="formCommon noShadow">
        <legend>Korisnici:</legend>
        <table class="table table-responsive">

            <thead>
            <td class="peopleTableHead">Ime</td>
            <td class="peopleTableHead">Prezime</td>
            <td class="peopleTableHead">Email</td>
            <td class="peopleTableHead">Status</td>
            <td class="peopleTableHead">Uloga</td>
            <td class="peopleTableHead">Obriši</td>
            <td class="peopleTableHead">Sačuvaj</td>
            </thead>
            <tbody id="allUsers" class="tableBodyEditPanel">

            </tbody>
        </table>

    </div>
    <div>
        <span class="glyphicon glyphicon-plus" data-target="#addUserModal" data-toggle="modal" "></span>
        Dodaj novog korisnika
    </div>

    <br>
</div>


<!--Accounts list -->

<div class="container-fluid card" id="manageAccounts">
    <div class="formCommon noShadow">
        <legend>Lekcije:</legend>
        <table class="table table-responsive">
            <thead>
            <td class="peopleTableHead">Naziv lekcije</td>
            <td class="peopleTableHead">Naziv kursa</td>
            <td class="peopleTableHead">Obriši</td>
            <td class="peopleTableHead">Detalji</td>
            </thead>
            <tbody id="lessonData" class="tableBodyEditPanel">

            </tbody>


        </table>

    </div>
    <div class="row">
        <div class="col-md-3">
            <span class="glyphicon glyphicon-plus" data-target="#lessonModal" data-toggle="modal"
                  onclick="clearFields()"></span>
            Dodaj novu lekciju
        </div>

    </div>
    <br>
</div>


<div class="container-fluid card" id="superuserSettings">
    <form class="formCommon noShadow" method="post" name="formSuperuserSettings"
          onsubmit="return checkPasswordEdit()">
        <legend>Moj profil:</legend>
        <div class="row">
            <div class="col-md-2 inlineLabel">
                Ime:
            </div>
            <div class="col-md-2" id="superuserFN">

            </div>
            <div class="col-md-1"></div>
            <div class="col-md-2 inlineLabel">Prezime:</div>
            <div class="col-md-2" id="superuserLN"></div>
        </div>

        <div class="row">
            <div class="col-md-2 inlineLabel">
                Email:
            </div>
            <div class="col-md-2" id="superuserMail"></div>
            <div class="col-md-1"></div>
            <div class="col-md-2 inlineLabel">Status:</div>
            <div class="col-md-2" id="superuserStatus"></div>
        </div>
        <br>
        <br>
        <div class="row">
            <div class="col-md-3">
                <span class="glyphicon glyphicon-plus popupGlyphicon" id="editFirstName"></span>
                Promeni ime
            </div>
            <div class="col-md-9">
                <div id="popupFirstName" class="row popup">
                    <div class="col-md-5"><input class="popupInput" id="newFirstName" type="text"></div>
                    <span class="glyphicon glyphicon-ok col-md-1 saveChanges" data-type="FirstName"></span>
                    <span class="glyphicon glyphicon-remove col-md-1" id="cancelFirstName"></span>
                    <div class="col-md-4" id="errorFirstName"></div>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3">
                <span class="glyphicon glyphicon-plus popupGlyphicon" id="editLastName"></span>
                Promeni prezime
            </div>
            <div class="col-md-9">
                <div id="popupLastName" class="row popup">
                    <div class="col-md-5"><input class="popupInput" id="newLastName" type="text"></div>
                    <span class="glyphicon glyphicon-ok col-md-1 saveChanges" data-type="LastName"></span>
                    <span class="glyphicon glyphicon-remove col-md-1" id="cancelLastName"></span>
                    <div class="col-md-4" id="errorLastName"></div>
                </div>
            </div>
        </div>
        <br>
        <legend>Promena lozinke:</legend>
        <div class="row">
            <div class="col-md-3 inlineLabel">Stara lozinka:</div>
            <div class="col-md-5">
                <input type="password" class="whiteInput important" name="superuserSettings_password">
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3 inlineLabel">Nova lozinka:</div>
            <div class="col-md-5">
                <input type="password" class="whiteInput important passOrg" name="superuserSettings_new_password"
                       onkeyup="checkPwd(event, 1)">
                <div class="originalPasswordError"></div>
                <p class="capsWarning"></p>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3 inlineLabel">Ponovi lozinku:</div>
            <div class="col-md-5">
                <input type="password" class="whiteInput important passRep"
                       onkeyup="checkPwd(event, 2)" name="superuserSettings_new_password_repeat">
                <div class="repeatPasswordError"></div>
                <p class="capsWarning"></p>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
                <div class="errorLog" id="superuserPasswordError"></div>
                <input type="submit" value="Promeni lozinku" class="submitBtn" id="changePassword">

            </div>
        </div>
    </form>
</div>


<div class="container-fluid card" id="inbox">

    <div class="formCommon noShadow">
        <legend>Sanduče:</legend>

        <div class="row">
            <div class="container-fluid">
                <?php include_once 'mailbox.php' ?>
            </div>
        </div>
    </div>
</div>


<!-- modal dialogs-->


<div class="modal fade" id="addUserModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <?php include_once 'modalAddUser.php'; ?>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="lessonModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <?php include_once 'modalAddLesson.php'; ?>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="responseModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <?php include_once 'modalResponse.php'; ?>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="messageModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <?php include_once 'modalMessage.php'; ?>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="sentModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" style="color:#efe1f9;" class="close" data-dismiss="modal">&times;</button>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <div class="jumbotron" id="messageFull">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>