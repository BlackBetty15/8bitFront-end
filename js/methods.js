/**
 * Created by milic on 16.5.2017..
 */

//Globals//

var errorMessages = {

    emptyFields: "Morate popuniti sva polja",
    incorrectFormatMail: "Enter valid email",
    wrongData: 'Neispravni podaci',
    passNotMatch: "Lozinke se ne poklapaju",
    passTooShort: "Lozinka je prekratka",
    passNoNum: "Lozinka mora sadržati najmanje jedan broj",
    passNoChar: "Lozinka mora sadržati najmanje jedno slovo",
    passBadChar: "Lozinka sadrži nedozvoljene znakove.",
    passTooLong: "Lozinka je preduga",
    passEmpty: "Morate prvo popuniti polje za lozinku.",

};
var successMessages = {
    passAlright: "Vaša lozinka je dobra",
    matchingPassword: "Lozinke su jednake",
};
var warningMessages = {
    capsLockOn: "Caps Lock je uključen",
};
var roles;
var courses;
var unreadMessages=0;
var messages;
var sentMessages;
function getRoles() {
    var response = null;
    response = $.ajax({
        type: "POST",
        url: "testfile.php?action=get-all-roles",
        async: false,
        success: function (resp) {
        }
    }).responseText;

    data = JSON.parse(response);
    if (data) {
        roles = data;
    }
    else {
        roles = [];
    }
}
function makeCourseDropdown(selector,data){
    var select=document.getElementById(selector);
    var options='';
    var i;

    select.innerHTML='';
    if(isEmpty(data)){
        select.innerHTML="<option disabled selected>Prvo napravite kurs</option>";
        document.getElementById('buttonContainer').getElementsByTagName('button')[0].disabled=true;
    }
    else {
        for(i=0;i<data.length;i++){
            options+='<option value="'+data[i].id+'">'+data[i].naziv+'</option>';
        }

        select.innerHTML=options;
    }


}
function fillWithRoles(selected) {
    var response = '', i;
    roles.forEach(function (e) {
        if (e.id == selected) {
            response += '<option selected value="' + e.id + '">' + e.naziv + '</option>';
        }
        else {
            response += '<option value="' + e.id + '">' + e.naziv + '</option>';
        }
    });
    return response;
}

function checkCriteria(str) {
    var responseArray = [];

    if (str.length < 8) {
        responseArray.push(errorMessages.passTooShort, false);

    } else if (str.length > 20) {
        responseArray.push(errorMessages.passTooLong, false);

    } else if (str.search(/\d/) == -1) {
        responseArray.push(errorMessages.passNoNum, false);

    } else if (str.search(/[a-zA-Z]/) == -1) {
        responseArray.push(errorMessages.passNoChar, false);

    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\&\*\_]/) != -1) {
        responseArray.push(errorMessages.passBadChar, false);
    }
    else {
        responseArray.push(successMessages.passAlright, true);
    }
    return responseArray;

}
//check if password matches with original//
function checkMatch(original, repeated) {

    var responseArray = [];
    if (repeated === original) {

        responseArray.push(successMessages.matchingPassword, true);
    }
    else {
        responseArray.push(errorMessages.passNotMatch, false);
    }

    return responseArray;
}


/* displays errors*/

function displayError(errorMsg) {
    var errorLog = document.querySelector('.errorLog');

    errorLog.innerText = errorMsg;
    errorLog.style.display = "block";
}


function checkPwd(event, fieldId) {

    //Original password field and repeated password field
    var str = document.getElementsByClassName('passOrg').item(0).value;
    var repPwd = document.getElementsByClassName('passRep').item(0).value;


    //error and warning fields
    var errorFieldRepeated = document.getElementsByClassName('repeatPasswordError').item(0);
    var errorFieldOriginal = document.getElementsByClassName('originalPasswordError').item(0);
    var color = '#d27776';

    errorFieldOriginal.style.color = color;
    errorFieldOriginal.style.color = color;

    var capsLabel = document.getElementsByClassName('capsWarning');

    var submitBtn = document.querySelector('input[type="submit"]');
    var criteriaErrorStatus = false; //false, to check if everything is alright, if it's false, error exists
    var matchErrorStatus = false;
    switch (event.keyCode) {
        // ignores alt, crtl, shift keys and arrow keys
        case 18:
        case 17:
        case 16:
        case 37:
        case 38:
        case 39:
        case 40:
            console.log(event.keyCode);
            break;
        //Every other key//
        default:
        {
            if (CapsLock.isOn()) {
                capsLabel.item(0).innerText = 'Caps Lock is on';
            }
            else {
                capsLabel.item(0).innerText = '';
            }
            break;
        }
    }

    if (fieldId == 1) {

        var response = checkCriteria(str);
        console.log("prvi element: " + response[0] + "drugi element" + response[1]);
        criteriaErrorStatus = response[1];
        if (criteriaErrorStatus) {
            errorFieldOriginal.style.color = 'green';
        }
        else {
            errorFieldOriginal.style.color = color;
        }

        errorFieldOriginal.innerText = response[0];

        if (repPwd != '') {
            response = checkMatch(str, repPwd);
            matchErrorStatus = response[1];
            if (matchErrorStatus) {
                errorFieldRepeated.style.color = 'green';
            }
            else {
                errorFieldRepeated.style.color = color;
            }
            errorFieldRepeated.innerText = response[0];

            if (criteriaErrorStatus && matchErrorStatus) {
                submitBtn.disabled = false;
            }
            else {
                submitBtn.disabled = true;
            }
        }
    }
    if (fieldId == 2) {

        if (str === '') {
            errorFieldRepeated.style.color = color;
            errorFieldRepeated.innerText = errorMessages.passEmpty;
        }
        else {
            errorFieldOriginal.style.color = 'green';
            response = checkMatch(str, repPwd);
            matchErrorStatus = response[1];
            if (matchErrorStatus) {
                errorFieldRepeated.style.color = 'green';
            }
            else {
                errorFieldRepeated.style.color = color;
            }
            errorFieldRepeated.innerText = response[0];

            response = checkCriteria(str);
            criteriaErrorStatus = response[1];
            response ? errorFieldOriginal.color = 'green' : errorFieldOriginal.color = color;
            (criteriaErrorStatus && matchErrorStatus) ? submitBtn.disabled = false : submitBtn.disabled = true;


        }
    }
}


/*Universal form check*/
function checkForm() {


    //Form fields //
    var errorStatus = 0;

    var formFields = document.getElementsByClassName('important');


    for (var i = 0; i < formFields.length; i++) {
        if (formFields.item(i).value == '') {

            formFields.item(i).style.border = "2px solid #d27776";
            errorStatus = 1;
        }
        else {
            formFields.item(i).style.border = 'none';
        }
    }


    if (errorStatus == 1) {

        displayError(errorMessages.emptyFields);
        return false;
    }

    else {

        return true;
    }

    return false;
}

//function check(){
//    var importantFields
//    var greska=document.getElementById('errorLog');
//
//    var praznaPolja="Morate popuniti sva polja";
//    var neispravniPodaci="Pogrešno korisničko ime ili lozinka";
//
//    user.style.border='';
//    pass.style.border='';
//
//    if(user.value==""||pass.value==""){
//        greska.innerHTML=praznaPolja;
//        if(user.value==""){
//        user.style.border='1px solid red';
//        }
//        if(pass.value==""){
//        pass.style.border='1px solid red';
//        }
//
//        return false;
//    }
//    else
//    alert("Ćaaooo")
//}
function dragDown() {
    object = document.getElementById("dropdown");
    dugme = document.getElementById('DownButton');
    state = dugme.getAttribute('data-state');

    if (state == 0) {
        dugme.setAttribute('data-state', 1);
        dugme.innerHTML = '\u25b2';
        dugme.style.fontSize = 20 + "px";
        object.style.display = 'block';
    }
    else {
        dugme.setAttribute('data-state', 0);
        dugme.innerHTML = '\u25bc';
        dugme.style.fontSize = 20 + "px";
        object.style.display = 'none';

    }

}
var activePanel = 'superuserSettings';

function switchCards(e) {


    activePanel = e.getAttribute('data-panel');
    //var visiblePannel = document.getElementById(idPanel);
    var allPanels = document.getElementsByClassName('card');
    var allMenuCards = document.getElementsByClassName('cardMenu');
    console.log('active pannel is: ' + activePanel);
    var regularCard = "cardMenu";
    var activeCard = "active cardMenu";
    var object;
    for (var i in allMenuCards) {
        object = allMenuCards.item(i);
        if (object.getAttribute('data-panel') === activePanel) {
            object.className = activeCard;
        }
        else {
            object.className = regularCard;
        }
    }
    for (i in allPanels) {

        object = allPanels.item(i);
        if (object.getAttribute('id') == activePanel) {

            object.style.display = 'block';
            object.style.visibility = 'visible';

        }
        else {
            object.style.display = 'none';
            object.style.visibility = 'hidden';

        }
    }


}


function fillWithLessons(data) {

    var masterParent = document.getElementById('lessonData');
    masterParent.innerHTML = "";
    if (isEmpty(data)) {

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedna lekcija.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else {
        data.forEach(function (e) {
            var row = document.createElement('tr');
            //row.className = 'peopleTableContent';
            var i = 0;
            var key;
            var columnArray = [];

            for (i = 0; i < 4; i++) {
                var col = document.createElement('td');
                col.className = 'contentField';
                columnArray.push(col);
            }
            var coursName='';
            columnArray[0].innerText = e.naziv;
            for(i=0; i<courses.length;i++){
                if(courses[i].id== e.id_kursa){
                    coursName=courses[i].naziv;
                }
            }
            columnArray[1].innerText = coursName;

            var button = document.createElement('button');
            button.className = 'form-control btn-danger tableButton deleteEvent';
            button.setAttribute('type', 'button');
            button.setAttribute('data-event', 'delete-lesson');
            //button.setAttribute('data-toggle', 'modal');
            //button.setAttribute('data-question-type', "0");
            //button.setAttribute('data-target', '#questionModal');
            //button.setAttribute('onclick', 'questionManagement(this)');
            button.setAttribute('data-id', e.id);
            button.innerHTML = '<span class="glyphicon glyphicon-trash button-trash"></span>';
            columnArray[2].appendChild(button);

            var span = document.createElement('span');
            span.className = 'glyphicon glyphicon-plus';
            span.setAttribute('data-id', e.id);
            span.setAttribute('data-toggle', 'modal');
            span.setAttribute('data-target', '#lessonModal');
            span.setAttribute('onclick', 'openLessonModal(this)');

            columnArray[3].appendChild(span);
            for (i = 0; i < columnArray.length; i++) {
                row.appendChild(columnArray[i]);
            }
            masterParent.appendChild(row);
        });
    }


}

function fillWithUsers(data) {

    var masterParent = document.getElementById('allUsers');
    masterParent.innerHTML = "";
    console.log('enter function');
    if (isEmpty(data)) {

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedan korisnik.";
        col.colSpan = "7";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else {
        data.forEach(function (e) {
            console.log(e);
            var row = document.createElement('tr');
            var size = Object.keys(e).length;
            console.log("Object.keys(e).length: " + size);
            var i = 0;
            var key;
            var columnArray = [];

            for (i = 0; i < size - 1; i++) {
                var column = document.createElement('td');
                columnArray.push(column);
            }

            //fill with information from recived data
            columnArray[0].innerText = e.ime;
            columnArray[1].innerText = e.prezime;
            columnArray[2].innerText = e.email;

            var activeSelect = document.createElement('select');

            activeSelect.setAttribute('data-user-id', e.id);
            activeSelect.className = 'form-control activeSelect';

            var active = document.createElement('option');
            active.innerText = 'Aktivan';
            var inactive = document.createElement('option');
            inactive.innerText = 'Neaktivan';
            active.setAttribute('value', '1');
            inactive.setAttribute('value', '0');

            if (e.statuts == 0) {
                inactive.selected = true;
            }
            else {
                active.selected = true;
            }

            activeSelect.appendChild(active);
            activeSelect.appendChild(inactive);
            columnArray[3].appendChild(activeSelect);

            //Creating select role
            var roleSelect = '<select data-user-id="' + e.id + '" class="form-control roleSelec">';
            roleSelect += fillWithRoles(e.role);
            columnArray[4].innerHTML = roleSelect;

            //Creating button for deleting user
            var button = document.createElement('button');
            button.className = 'form-control btn-danger tableButton deleteEvent';
            button.setAttribute('type', 'button');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-event', 'delete-user');
            //button.setAttribute('data-question-type', "0");
            //button.setAttribute('data-target', '#questionModal');
            //button.setAttribute('onclick', 'questionManagement(this)');
            button.setAttribute('data-id', e.id);
            button.innerHTML = '<span class="glyphicon glyphicon-trash button-trash"></span>';
            columnArray[5].appendChild(button);


            //Appending cells to the row
            for (key in columnArray) {
                row.appendChild(columnArray[key])
            }

            var saveTd = document.createElement('td');
            var saveBtn = document.createElement('button');

            saveBtn.setAttribute('data-id', e.id);
            saveBtn.setAttribute('onclick', 'saveUserChanges(this)');

            saveBtn.className = 'submitBtn  noShadow tableButton saveEvent';
            saveBtn.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';

            //Appending new cell to the row and row to the table
            saveTd.appendChild(saveBtn);
            row.appendChild(saveTd);
            masterParent.appendChild(row);

        });
    }


}
function fillWithCurses(data) {
    var masterParent = document.getElementById('allCourses');
    masterParent.innerHTML = "";
    console.log('enter function');
    if (isEmpty(data)) {

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedan kurs.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else {
        data.forEach(function (e) {
            var row = document.createElement('tr');
            var size = Object.keys(e).length;
            console.log("Object.keys(e).length: " + size);
            var i = 0;
            var key;
            var columnArray = [];

            for (i = 0; i < size; i++) {
                var column = document.createElement('td');
                columnArray.push(column);
            }

            //fill with information from recived data
            columnArray[0].innerText = e.naziv;
            columnArray[1].innerText = e.opis;

            var activeSelect = document.createElement('select');

            activeSelect.setAttribute('data-user-id', e.id);
            activeSelect.className = 'form-control activeSelect';

            var active = document.createElement('option');
            active.innerText = 'Aktivan';
            var inactive = document.createElement('option');
            inactive.innerText = 'Neaktivan';
            active.setAttribute('value', '1');
            inactive.setAttribute('value', '0');

            if (e.status == 0) {
                inactive.selected = true;
            }
            else {
                active.selected = true;
            }

            activeSelect.appendChild(active);
            activeSelect.appendChild(inactive);
            columnArray[2].appendChild(activeSelect);


            //Creating button for deleting user
            var button = document.createElement('button');
            button.className = 'form-control btn-danger tableButton deleteEvent';
            button.setAttribute('type', 'button');
            button.setAttribute('data-event', 'delete-course');
            //button.setAttribute('data-toggle', 'modal');
            //button.setAttribute('data-question-type', "0");
            //button.setAttribute('data-target', '#questionModal');
            //button.setAttribute('onclick', 'questionManagement(this)');
            button.setAttribute('data-id', e.id);
            button.innerHTML = '<span class="glyphicon glyphicon-trash button-trash"></span>';
            columnArray[3].appendChild(button);


            //Appending cells to the row
            for (key in columnArray) {
                row.appendChild(columnArray[key])
            }

            var saveTd = document.createElement('td');
            var saveBtn = document.createElement('button');

            saveBtn.setAttribute('data-id', e.id);
            saveBtn.setAttribute('onclick', 'saveCoursChanges(this)');

            saveBtn.className = 'submitBtn noShadow tableButton';
            saveBtn.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';

            //Appending new cell to the row and row to the table
            saveTd.appendChild(saveBtn);
            row.appendChild(saveTd);
            masterParent.appendChild(row);

        });
    }
}
function fillWithMessages(data) {
    var masterParent = document.getElementById('tableBodyInbox');
    masterParent.innerHTML="";
    console.log('enter function');
    if (isEmpty(data)) {

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Nemate poruka.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else {
        data.forEach(function(e){
            var row = document.createElement('tr');
            if(e.procitana==0){
                unreadMessages++;
            }
            else{
                row.className='readMEssage';
            }
            var i = 0;
            var key;
            var columnArray = [];

            for (i = 0; i < 5; i++) {
                var col = document.createElement('td');
                col.className = 'contentField';
                columnArray.push(col);
            }


            var checkbox=document.createElement('input');
            checkbox.setAttribute('value', e.id);
            checkbox.setAttribute('type','checkbox');
            checkbox.className='receivedCheck';
            columnArray[0].appendChild(checkbox);

            columnArray[1].innerText = e.posiljalac_ime+" "+ e.posiljalac_prezime;
            columnArray[2].innerText= e.naslov;
            columnArray[3].innerText= ((e.poruka).substr(0,50))+"...";

            var span = document.createElement('span');
            span.className = 'glyphicon glyphicon-plus';
            span.setAttribute('data-id', e.id);
            span.setAttribute('data-toggle', 'modal');
            span.setAttribute('data-target', '#messageModal');
            span.setAttribute('onclick', 'openMessageModal(this)');

            columnArray[4].appendChild(span);
            for (i = 0; i < columnArray.length; i++) {
                row.appendChild(columnArray[i]);
            }
            masterParent.appendChild(row);
        });
        if(unreadMessages>0){
            document.getElementById('newMessages').innerText=unreadMessages;
            document.getElementById('newMessages').style.display='inline';
        }
        else{
            document.getElementById('newMessages').style.display='none';
        }
    }

}
var data = {};

function isEmpty(obj) {
    try {
        if (!obj || obj == null || obj.toString().trim() == '' || obj == undefined || typeof obj === 'undefined' || obj.length == 0 || !obj.length) {

            var empty = true, fld;
            for (fld in obj) {
                empty = false;
                break;
            }
            return empty;
        }
        return false;
    } catch (e) {

    }

}

function getAll(request) {
    var data = null;
    var response = null;
    response = $.ajax({
        type: "POST",
        url: "testfile.php?action=" + request,
        async: false,
        success: function (resp) {

        }
    }).responseText;

    data = JSON.parse(response);
    if (data) {
        return data;
    }
    return 'error';
}
function saveCoursChanges(e) {

    var id = e.getAttribute('data-id');
    var row = (e.parentElement).parentElement;
    var selectElements = row.getElementsByTagName('select')[0];
    var newStatus = selectElements.options[selectElements.selectedIndex].value;
    var dataStatus = {
        id: id,
        status: newStatus
    };

    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=change-course-status",
        data: dataStatus,
        success: function (response) {
            alert(response);
        }
});
}
function getMyData(){


    var data = null;
    var response = null;
    response = $.ajax({
        type: "POST",
        url: "testfile.php?action=get-specific-user",
        async: false,
        success: function (resp) {

        }
    }).responseText;

    data=JSON.parse(response);
    if(data){
    var firstName = document.getElementById('superuserFN');
    var lastName = document.getElementById('superuserLN');
    var mail = document.getElementById('superuserMail');
    var suStatus = document.getElementById('superuserStatus');


    firstName.innerText = data.ime;
    lastName.innerText = data.prezime;
    mail.innerText = data.email;

    if (data.statuts == 1) {
        suStatus.innerText = 'Aktivan';
    }
    else {
        suStatus.innerText = 'Neaktivan';
    }
    }

}
function saveUserChanges(e){
    var id = e.getAttribute('data-id');
    var row = (e.parentElement).parentElement;
    var selectElements = row.getElementsByTagName('select');

    var newStatus = selectElements[0].options[selectElements[0].selectedIndex].value;
    var newRole = selectElements[1].options[selectElements[1].selectedIndex].value;

    data = {
        id: id,
        status: newStatus,
        role: newRole
    };
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=change-user",
        data: data,
        success: function (response) {
            alert(response);
        }
    });


}
function openLessonModal(e){

    var data = null;
    var response = null;
    response = $.ajax({
        type: "POST",
        url: "testfile.php?action=get-one-lesson",
        async: false,
        data:{id: e.getAttribute('data-id')},
        success: function (resp) {
        console.log(resp);
        }
    }).responseText;

    data=JSON.parse(response);
    fillWithLessonInfo(data);

}
function fillWithLessonInfo(data){

    var header=document.getElementById('modalHeader');
    var lessonName=document.getElementsByName('lessonName')[0];
    var lessonStatus=document.getElementsByName('lessonRadio');
    var lessonCours=document.getElementById('coursSelect');
    var lessonDescription=document.getElementById('lessonDescription');
    var lessonCode=document.getElementById('lessonDemonstration');
    var buttonContainer=document.getElementById('buttonContainer');
    var i;

    makeCourseDropdown('coursSelect',getAll('get-courses'));

    header.innerText='Detalji lekcije';
    lessonName.value=data[0].naziv;
    lessonDescription.value=data[0].opis;
    lessonCode.value=data[0].primer_koda;
    for (i=0;i<lessonStatus.length;i++){
        if(lessonStatus[i].value == data[0].status){
            lessonStatus[i].checked=true;
        }
    }
    for(i=0;i<lessonCours.options.length;i++){
        if(lessonCours.options[i].value == data[0].id_kursa){
            lessonCours.options[i].selected=true;
        }
    }
    buttonContainer.innerHTML='<input type="submit" class="submitBtn" id="btnSaveLessonChanges" data-id="'+
        data[0].id+'" value="Sačuvaj lekciju">';

}
function clearFields(){
    var forma=document.getElementById('addLesson');
    var inputs=document.getElementsByName('lessonName')[0];
    var textareas=forma.getElementsByTagName('textarea');
    var buttonContainer=document.getElementById('buttonContainer');
    makeCourseDropdown('coursSelect',getAll('get-courses'));
    var i;
    inputs.value="";
    for(i=0;i<textareas.length;i++){
        textareas[i].value="";
    }
    buttonContainer.innerHTML='<input type="submit" class="submitBtn" id="btnAddLessonSubmit" value="Sačuvaj lekciju">';
}
function openMessageModal(e){
    var messageId=[];
    messageId.push(e.getAttribute('data-id'));

    var data = null;
    var response = null;
    response = $.ajax({
        type: "POST",
        url: "testfile.php?action=open-message",
        async: false,
        data:{id: e.getAttribute('data-id')},
        success: function (resp) {
            fillMessageDetail(JSON.parse(resp));
        }
    }).responseText;
    response= $.ajax({
        type: "POST",
        url: "testfile.php?action=mark-as-read-message",
        async: false,
        data:{id_array: messageId},
        success:function(resp){
        }
    });
    messages=getAll('get-all-messages');
        unreadMessages=0;
        fillWithMessages(messages)
}

function fillMessageDetail(data){

   var message=document.getElementById('messageDisplay');
    var subject=document.getElementById('messageSubject');
    var sender=document.getElementById('senderDisplay');
    var date=document.getElementById('dateDisplay');
    var responseButton=document.getElementById('sendResponse');
    var mail=document.getElementById('mailDisplay');

    message.innerText=data[0].poruka;
    subject.innerText=data[0].naslov;
    sender.innerText=data[0].posiljalac_ime+" "+data[0].posiljalac_prezime;
    mail.innerText=data[0].posiljalac;
    date.innerText=data[0].datum;
    responseButton.setAttribute('data-id',data[0].id);
}
function fillWithSent(data){
    var masterParent = document.getElementById('tableBodyInbox');
    masterParent.innerHTML="";
    console.log('enter function');
    if (isEmpty(data)) {

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Nemate poruka.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else{
        data.forEach(function(e){
            console.log(JSON.stringify(e));
            var row = document.createElement('tr');

            var i = 0;
            var key;
            var columnArray = [];

            for (i = 0; i < 4; i++) {
                var col = document.createElement('td');
                col.className = 'contentField';
                columnArray.push(col);
            }


            var checkbox=document.createElement('input');
            checkbox.setAttribute('value', e.id);
            checkbox.setAttribute('type','checkbox');
            checkbox.className='receivedCheck';
            columnArray[0].appendChild(checkbox);

            columnArray[1].innerText = e.primalac;


            columnArray[2].innerText= ((e.poruka).substr(0,50))+"...";

            var span = document.createElement('span');
            span.className = 'glyphicon glyphicon-plus';
            span.setAttribute('data-id', e.id);
            span.setAttribute('data-toggle', 'modal');
            span.setAttribute('data-target', '#sentModal');
            span.setAttribute('onclick', 'openSentMessage(this)');

            columnArray[3].appendChild(span);
            for (i = 0; i < columnArray.length; i++) {
                row.appendChild(columnArray[i]);
            }
            masterParent.appendChild(row);
        });
        if(unreadMessages>0){
            document.getElementById('newMessages').innerText=unreadMessages;
            document.getElementById('newMessages').style.display='inline';
        }
        else{
            document.getElementById('newMessages').style.display='none';
        }
    }

}
function openSentMessage(e){
    var idMessage= e.getAttribute('data-id');
    var content;
    sentMessages.forEach(function(m){
        if(m.id== idMessage){
            content= m.poruka;
        }
    });
    document.getElementById('messageFull').innerText=content;

}
$('document').ready(
    getRoles(),
    dataUsers = getAll('get-all-users'),
    fillWithUsers(dataUsers),
    courses = getAll('get-courses'),
    fillWithCurses(courses),
    dataLessons = getAll('get-all-lessons'),
    fillWithLessons(dataLessons),
    getMyData(),
    messages=getAll('get-all-messages'),
    fillWithMessages(messages)
);