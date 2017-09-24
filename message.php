<?php

session_start();
$_SESSION['page']='messages';

include_once 'templates/usertemplates/userheader.php';
require_once 'captcha/securimage.php'
?>

<br>
<div class="contact-us">
    <div class="container">

        <div class="contact-form jumbotron" id="messageJumbatron">
            <h2>Pošalji nam poruku:</h2>

            <div class="row">
                <div class="col-sm-7">
                    <form id="ajax-contact"  method="post"  role="form">
                        <div class="messages" id="form-messages"></div>
                        <div class="controls">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="form_name">Ime *</label>
                                        <input id="form_name" type="text" name="name" class="form-control important"
                                               placeholder="Unesite svoje ime *" required="required"
                                               data-error="Firstname is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="form_lastname">Prezime *</label>
                                        <input id="form_lastname" type="text" name="surname" class="form-control important"
                                               placeholder="Unesite svoje prezime *" required="required"
                                               data-error="Lastname is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="form_email">Email *</label>
                                        <input id="form_email" type="email" name="email" class="form-control important"
                                               placeholder="Unesite Vaš email *" required="required" data-error="Valid
                                               email is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="form_subject">Nalsov*</label>
                                        <input id="form_subject" type="text" name="subject"  class="form-control important"
                                               placeholder="Unesite naslov poruke *" required
                                        >

                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="form_message">Poruka *</label>
                                        <textarea id="form_message" name="message" class="form-control important"
                                                  placeholder="Vaša poruka" rows="7" required="required"
                                                  data-error="Please,leave us a message."></textarea>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-12">

                                        <?php echo Securimage::getCaptchaHtml() ?>
                                        <div id="captchaError" class="errorLog" style="font-size:1.2rem"></div>
                                        <br>
                                </div>
                                <div class="col-md-12">
                                    <input type="submit" id="submitMessage" class="btn" value="Pošalji poruku">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <br>
                                    <label class="text-muted"><strong>*</strong> Polja su obavezna</label>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="col-sm-5">

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
<?php
include_once 'templates/usertemplates/userfooter.php';

?>
