<!-- Add user/person form -->
<button type="button"  style="color:#efe1f9;" class="close" data-dismiss="modal">&times;</button>


<form  id="addLesson" class="formCommon noShadow" name="add_person" enctype="multipart/form-data">
    <h3 id="modalHeader">Dodaj lekciju</h3>
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
                <input type="radio" checked name="lessonRadio" value="1">
            </div>
            <div class="col-md-2">
                <br>
                <label>Ne</label>
                <input type="radio"  name="lessonRadio" value="0">
            </div>

        </div>
        <div class="row">
            <div class="col-md-4">
                <br>
                <span class="inlineLabel">Kurs:</span>
            </div>
            <div class="col-md-6">
                <select id="coursSelect" name="coursSelect">
<!--                    <option value="1">HTML</option>-->
<!--                    <option value="2">CSS</option>-->
<!--                    <option value="3">JavaScript</option>-->
                </select>
            </div>
        </div>


    </div>


    <div class="form-group">
        <legend>Detalji lekcije</legend>
        <div class="row">

            <label class="col-md-2 inlineLabel">Opis:</label><br>
            <div class="col-md-7">
                <textarea name="lessonDescription" id="lessonDescription" rows="7" cols="53"></textarea>
            </div>

        </div>
        <br>
        <div class="row">
            <label class="col-md-2 inlineLabel">Primer koda:</label><br>
            <div class="col-md-7">
                <textarea name="lessonCode" id="lessonDemonstration" rows="7" cols="53"></textarea>
            </div>
        </div>

    </div>
    <div class="errorLog"></div><br>
    <div id="buttonContainer">
    <input type="submit" class="submitBtn" id="btnAddLessonSubmit" data-dismiss="modal" value="Sačuvaj lekciju">
    </div>
</form>