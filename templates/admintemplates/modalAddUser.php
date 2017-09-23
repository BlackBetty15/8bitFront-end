<button type="button"  style="color:#efe1f9;" class="close" data-dismiss="modal">&times;</button>

<div class="row">

    <div class="col-md-2"></div>

    <div class="col-md-8">
        <!-- form-->
        <form method="post" class="formCommon noShadow" action="test.php" id="addUser" name="add_user"
              onsubmit="return checkForm()">
            <h3>Dodaj korisnika</h3>
            <hr>

            <input type="text" class="formField important" id="fName" name="first_name" placeholder="Ime">


            <input type="text" class="formField important" id="lName" name="last_name" placeholder="Prezime">

            <input type="email" class="formField important" id="eMail" name="email" placeholder="E-mail">
            <input type="text" class="formField important" id="username" name="username" placeholder="Korisničko ime">

            <input type="password" class="formField important passOrg" id="pwd" name="pwd" placeholder="Lozinka"
                   onkeyup="checkPwd(event, 1)">

            <div class="originalPasswordError"></div>
            <p class="capsWarning"></p>

            <input type="password" class="formField important passRep" id="pwdRep" name="pwd_repeat"
                   placeholder="Ponovljena lozinka"
                   onkeyup="checkPwd(event, 2)">

            <div class="repeatPasswordError" ></div>
            <p class="capsWarning"> </p>

            <br>
            <label for="statusSelect">Status:</label>
            <select id="statusSelect" class="formField important" name="stauts">
                <option value="1">Aktivan</option>
                <option value="0">Neaktivan</option>
            </select>
            <label for="rolesSelect">Uloga:</label>
            <!--todo ajax request response data fill -->
            <select class="formField important" name="roles" id="rolesSelect">
                <option value="1">Admin</option>
                <option value="2" selected>Moderator</option>

            </select>
            <div class="errorLog"></div>
            <input type="submit" class="submitBtn" id="addUserSubmit" value="Dodaj krosinika">
        </form>

    </div>

    <div class="col-md-2"></div>
</div>