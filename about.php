<?php
session_start();
$_SESSION['page'] = 'about';
include_once 'templates/usertemplates/userheader.php';
?>


<div class="container">

    <div class="container-fluid">
         <div class="jumbotron">
            <h1 class="display-3 pageHeader">O Projektu: </h1>

            <p class="aboutParagraph">
                Projekat je nastao 2017. godine kao završni rad na Viskojoj školi elektrotehnike
                i računarstva strukovnih studija u Beogradu. Ideja i cilj projekta su da se
                deci uzrasta 7-14 godina približe osnove veb programiranja i veb dizajna, dok je
                ideja i inspiracija za dizajn nastala na osnovu starih ,,osmobitnih" igara.
            </p>

            <p class="lead aboutParagraph">
                Kako je većina materijala koja se nalazi na internetu na engleskom jeziku
                rešila sam da prevedem neke od njih i tako učenje front-end programiranje učinim
                lakšim i razumljivijim mlađima.
            </p>
            <p class="aboutParagraph">
                U originalnom projektu nalaze se tri lekcije, ,,HTML" , ,,CSS" i ,,JavaScript" koje
                predstavljaju osnovu koju svaki front-end programer mora da zna. Lekcije su pisane
                tako da budu bliske, razumljive i zanimljive deci, kao i da na kraju kursa već
                mogu da naprave svoj prvi sajt. Objašnjenja uglavnom čine kombinaciju prevedenih
                materijala koji se nalaze na
                <a href="https://www.w3schools.com/" target="_blank">W3Schools</a>
                sajtu i lično pisanih objašnjenja.
            </p>

            <p class="aboutParagraph">
                Sva pitanja, predloge i sugestije vezane za gradivo, kurseve i sam projekat, možete
                mi poslati
                <a href="message.php" target="_blank">ovde.</a>
            </p>
            <p id="signature">Milica</p>
        </div>
    </div>
</div>

<?php
include_once 'templates/usertemplates/userfooter.php';
?>
