<!-- Add user/person form -->
<button type="button"  style="color:#efe1f9;" class="close" data-dismiss="modal">&times;</button>


<form  id="addPerson" class="formCommon noShadow" name="add_person" enctype="multipart/form-data">
    <h3>Dodaj lekciju</h3>
    <br>
    <div class="form-group">
        <legend>Podaci</legend>

        <div class="row">

            <div class="col-md-4 ">
                <br>
              <span  class="inlineLabel">Naziv lekcije:</span>
            </div>

            <div class="col-md-7">
                <input type="text" class="formField  important" name="lessonName">
            </div>

        </div>

        <div class="row">
            <div class="col-md-4">
                <br>
                <span class="inlineLabel">Aktivna:</span>

            </div>
            <div class="col-md-2">
                <br>
                <label>Da</label>
                <input type="radio" checked name="lessonRadio">
            </div>
            <div class="col-md-2">
                <br>
                <label>Ne</label>
                <input type="radio"  name="lessonRadio">
            </div>

        </div>
        <div class="row">
            <div class="col-md-4">
                <br>
                <span class="inlineLabel">Kurs:</span>
            </div>
            <div class="col-md-6">
                <select>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>JavaScript</option>
                </select>
            </div>
        </div>


    </div>


    <div class="form-group">
        <legend>Detalji lekcije</legend>
        <div class="row">

            <label class="col-md-2 inlineLabel">Opis:</label><br>
            <div class="col-md-7">
                <textarea id="lessonDescription" rows="7" cols="61"></textarea>
            </div>

        </div>
        <br>
        <div class="row">
            <label class="col-md-2 inlineLabel">Primer koda:</label><br>
            <div class="col-md-7">
                <textarea id="lessonDemonstration" rows="7" cols="61"></textarea>
            </div>
        </div>

    </div>
    <div class="errorLog"></div><br>
    <input type="submit" class="submitBtn" id="btnAddPeopleSubmit" value="Sačuvaj lekciju">
</form>