/**
 * Created by milic on 16.5.2017..
 */

//Globals//

var errorMessages = {

    emptyFields: "Morate popuniti sva polja",
    incorrectFormatMail: "Enter valid email",
    wrongData:'Neispravni podaci',
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
function dragDown(){
    object=document.getElementById("dropdown");
    dugme=document.getElementById('DownButton');
    state=dugme.getAttribute('data-state');

    if(state==0){
        dugme.setAttribute('data-state',1);
        dugme.innerHTML='\u25b2';
        dugme.style.fontSize=20+"px";
        object.style.display='block';
    }
    else{
        dugme.setAttribute('data-state',0);
        dugme.innerHTML='\u25bc';
        dugme.style.fontSize=20+"px";
        object.style.display='none';

    }

}
var activePanel='superuserSettings';

function switchCards(e) {


    activePanel=e.getAttribute('data-panel');
    //var visiblePannel = document.getElementById(idPanel);
    var allPanels = document.getElementsByClassName('card');
    var allMenuCards = document.getElementsByClassName('cardMenu');
    console.log('active pannel is: '+activePanel);
    var regularCard = "cardMenu";
    var activeCard = "active cardMenu";
    var object;
    for (var i in allMenuCards) {
        object=allMenuCards.item(i);
        if(object.getAttribute('data-panel')===activePanel){
            object.className=activeCard;
        }
        else{
            object.className=regularCard;
        }
    }
    for (i in allPanels) {

        object=allPanels.item(i);
        if(object.getAttribute('id')==activePanel){

            object.style.display = 'block';
            object.style.visibility = 'visible';

        }
        else{
            object.style.display = 'none';
            object.style.visibility = 'hidden';

        }
    }



}



function fillWithLessons(data){

    var masterParent=document.getElementById('lessonData');
    console.log('enter function');
    if(isEmpty(data)){

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedna lekcija.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else{




    }


}

function fillWithUsers(data){

    var masterParent=document.getElementById('allUsers');
    console.log('enter function');
    if(isEmpty(data)){

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedan korisnik.";
        col.colSpan = "7";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else{}


}
function fillWithCurses(data){
    var masterParent=document.getElementById('allCourses');
    console.log('enter function');
    if(isEmpty(data)){

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Ne postoji nijedan kurs.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else{}
}
function fillWithMessages(data){
    var masterParent=document.getElementById('tableBodyInbox');
    console.log('enter function');
    if(isEmpty(data)){

        var row = document.createElement('tr');
        row.className = 'userTableContent';
        var col = document.createElement('td');
        col.className = 'contentField';
        col.innerText = "Nemate poruka.";
        col.colSpan = "5";
        row.appendChild(col);
        masterParent.appendChild(row);
    }
    else{}

}
var data={};

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
        // console.log(e.message);
    }

}
$('document').ready(fillWithLessons(data), fillWithCurses(data),fillWithMessages(data),fillWithUsers(data));
