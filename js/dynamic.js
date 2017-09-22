///**
// * Created by milic on 21.9.2017..
// */
///**
// * Created by milic on 25.7.2017..
// */
///*Globals*/
//
////Gloabal variables
//
////Panel on edit panel which is active;
//var activePanel = 'accountSettings';
//
//var checkInterval;
//var logged;
//
//var errorMessages = {
//
//    emptyFields: "You must fill data.",
//    incorrectFormatMail: "Enter valid email.",
//    passNotMatch: "Passwords are not matching.",
//    passTooShort: "Password is too short.",
//    passNoNum: "Password must contain at least one number.",
//    passNoChar: "Password must contain at least one letter.",
//    passBadChar: "Password contains characters that are not available.",
//    passTooLong: "Password is too long.",
//    passEmpty: "You must fill password field first.",
//    unknownError:"Something went wrong, please try again later.",
//
//};
////All languages list
//languages = ['Afrikanns', 'Albanian', 'Arabic', 'Armenian', 'Basque', 'Bosnian', 'Bengali', 'Bulgarian', 'Catalan', 'Cambodian',
//    'Chinese (Mandarin)', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Fiji', 'Finnish', 'French',
//    'Georgian', 'German', 'Greek', 'Gujarati', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Irish', 'Italian',
//    'Japanese', 'Javanese', 'Korean', 'Latin', 'Latvian', 'Lithuanian', 'Macedonian', 'Malay', 'Malayalam', 'Maltese',
//    'Maori', 'Marathi', 'Mongolian', 'Nepali', 'Norwegian', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Quechua',
//    'Romanian', 'Russian', 'Samoan', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish ', 'Tamil',
//    'Tatar', 'Telugu', 'Thai', 'Tibetan', 'Tonga', 'Turkish', 'Ukranian', 'Urdu', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa'];
//
////Messages generated on success
//var successMessages = {
//    passAlright: "Your password is good",
//    matchingPassword: "Passwords are matching",
//    successCreateUser : "You have successfully created User!",
//    successCreatePerson : "You have successfully created People!",
//    successCreateAccount : "You have successfully created Account!",
//    successCreateLanguage : "You have successfully created Language!",
//    successCreateDepartment : "You have successfully created Department!",
//    successCreateQualification : "You have successfully created Department!",
//
//};
//var warningMessages = {
//    capsLockOn: "Caps Lock is on",
//};
//var questionMessages = {
//
//    deleteUser: "Are you sure you want to delete this user?", //0
//    deactivateAccount: "Are you sure you want to deactivate your account?", //1
//    removeDepartment: "Are you sure you want to remove this Department?", //2
//    removeQualification: "Are you sure you want to remove this qualification?",//3
//    deactivateUser: "Are you sure you want to deactivate this user?", //4
//    changeRole: "Are you sure you want to change role of this user?",//5
//    changeDepartment: "Are you sure you want to change department?",//6
//    changeCurrentScope: "Are you sure you want to change current scope?", //7
//    changeFieldOfInterest: "Are you sure you want to change field of interest?", //8
//    deleteAccount: "Are you sure you want to delete this account?", //9
//    removeLanguage: "Are you sure you want to remove this language?",//10
//    deletePerson:"Are you sure you want to delete this person?",//11
//    deleteComment:"Are you sure you want to delete this comment?", //12
//};
//
//var panelSelectors={
//    accountSettings: "li[data-panel='accountSettings']",
//    manageUsers:    "li[data-panel='manageUsers']",
//    manageAccounts: "li[data-panel='manageAccounts']",
//    superuserSettings:"li[data-panel='superuserSettings']",
//    globalSettings:"li[data-panel='globalSettings']"
//};
//
//
//
//
//function checkToken()
//{
//    var logged = readCookie("logged");
//
//    if ( logged == 1 )
//    {
//        $.ajax({
//            global: false,
//            type: "POST",
//            url: "backend/page.php?action=check-token",
//            success: function (resp)
//            {
//                resp = JSON.parse(resp);
//                if ( resp && resp.code == 200 && resp.data == true ){
//                    console.log("Token is valid.");
//                }else{
//                    console.log("Token expired or invalid.");
//                    responseModal("Ooops! It's looks like your session has been expired! \nPlease login to continue.");
//                    logout();
//                    createCookie("logged",0);
//                    // localStorage.setItem("logged",false);
//                    // clearInterval(checkInterval);
//                }
//            }
//        })
//    }else{
//        console.log("Not logged.");
//    }
//
//}
//
//
////Check if password satisfy criteria//
//
//function checkCriteria(str) {
//    var responseArray = [];
//
//    if (str.length < 8) {
//        responseArray.push(errorMessages.passTooShort, false);
//
//    } else if (str.length > 20) {
//        responseArray.push(errorMessages.passTooLong, false);
//
//    } else if (str.search(/\d/) == -1) {
//        responseArray.push(errorMessages.passNoNum, false);
//
//    } else if (str.search(/[a-zA-Z]/) == -1) {
//        responseArray.push(errorMessages.passNoChar, false);
//
//    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\&\*\_]/) != -1) {
//        responseArray.push(errorMessages.passBadChar, false);
//    }
//    else {
//        responseArray.push(successMessages.passAlright, true);
//    }
//    return responseArray;
//
//}
//
////check if password matches with original//
//function checkMatch(original, repeated) {
//
//    var responseArray = [];
//    if (repeated === original) {
//
//        responseArray.push(successMessages.matchingPassword, true);
//    }
//    else {
//        responseArray.push(errorMessages.passNotMatch, false);
//    }
//
//    return responseArray;
//}
//
//
///* displays errors*/
//
///* displays errors*/
//
//function displayError(errorMsg) {
//    var objectConstructor = {}.constructor;
//    var stringConstructor = "".constructor;
//
//    console.log("error message: " + errorMsg);
//
//    var errorLog = document.querySelector('.errorLog');
//    var errors = "";
//
//    if (Array.isArray(errorMsg)) {
//        Array.prototype.map.call(errorMsg, function (e) {
//            errors += e + "\n";
//        });
//    } else if (errorMsg.constructor === objectConstructor) {
//        for (var key in errorMsg) {
//            if (errorMsg.hasOwnProperty(key)) {
//                var val = errorMsg[key];
//                errors += val + "\n";
//            }
//        }
//    } else if (errorMsg.constructor === stringConstructor) {
//        errors = errorMsg;
//    } else {
//        console.log("Undefined type of error: " + typeof errorMsg);
//    }
//
//    errorLog.innerText = errors;
//    errorLog.style.display = "block";
//}
//
//
//function checkPwd(event, fieldId) {
//
//    //Original password field and repeated password field
//    var str = document.getElementsByClassName('passOrg').item(0).value;
//    var repPwd = document.getElementsByClassName('passRep').item(0).value;
//
//
//    //error and warning fields
//    var errorFieldRepeated = document.getElementsByClassName('repeatPasswordError').item(0);
//    var errorFieldOriginal = document.getElementsByClassName('originalPasswordError').item(0);
//    var color = '#ad3e3c';
//
//    errorFieldOriginal.style.color = color;
//    errorFieldOriginal.style.color = color;
//
//    var capsLabel = document.getElementsByClassName('capsWarning');
//
//    var submitBtn = document.querySelector('input[type="submit"]');
//    var criteriaErrorStatus = false; //false, to check if everything is alright, if it's false, error exists
//    var matchErrorStatus = false;
//    switch (event.keyCode) {
//        // ignores alt, crtl, shift keys and arrow keys
//        case 18:
//        case 17:
//        case 16:
//        case 37:
//        case 38:
//        case 39:
//        case 40:
//            console.log(event.keyCode);
//            break;
//        //Every other key//
//        default: {
//            if (CapsLock.isOn()) {
//                capsLabel.item(0).innerText = 'Caps Lock is on';
//            }
//            else {
//                capsLabel.item(0).innerText = '';
//            }
//            break;
//        }
//    }
//
//    if (fieldId === 1) {
//
//        var response = checkCriteria(str);
//        criteriaErrorStatus = response[1];
//        if (criteriaErrorStatus) {
//            errorFieldOriginal.style.color = 'green';
//        }
//        else {
//            errorFieldOriginal.style.color = color;
//        }
//
//        errorFieldOriginal.innerText = response[0];
//
//        if (repPwd != '') {
//            response = checkMatch(str, repPwd);
//            matchErrorStatus = response[1];
//            if (matchErrorStatus) {
//                errorFieldRepeated.style.color = 'green';
//            }
//            else {
//                errorFieldRepeated.style.color = color;
//            }
//            errorFieldRepeated.innerText = response[0];
//
//            if (criteriaErrorStatus && matchErrorStatus) {
//                submitBtn.disabled = false;
//            }
//            else {
//                submitBtn.disabled = true;
//            }
//        }
//    }
//    if (fieldId == 2) {
//
//        if (str == '') {
//            errorFieldRepeated.style.color = color;
//            errorFieldRepeated.innerText = errorMessages.passEmpty;
//        }
//        else {
//            errorFieldOriginal.style.color = 'green';
//            response = checkMatch(str, repPwd);
//            matchErrorStatus = response[1];
//            if (matchErrorStatus) {
//                errorFieldRepeated.style.color = 'green';
//            }
//            else {
//                errorFieldRepeated.style.color = color;
//            }
//            errorFieldRepeated.innerText = response[0];
//
//            response = checkCriteria(str);
//            criteriaErrorStatus = response[1];
//            response ? errorFieldOriginal.color = 'green' : errorFieldOriginal.color = color;
//            (criteriaErrorStatus && matchErrorStatus) ? submitBtn.disabled = false : submitBtn.disabled = true;
//
//
//        }
//    }
//}
//
//
///*Universal form check*/
//function checkForm(e) {
//
//    //Form fields //
//    var errorStatus = 0;
//    var formFields = e.getElementsByClassName('important');
//
//    for (var i = 0; i < formFields.length; i++) {
//        console.log("value: " + formFields.item(i).value);
//        if (formFields.item(i).value == '') {
//            formFields.item(i).style.border = "2px solid #ad3e3c";
//            errorStatus = 1;
//        }
//        else {
//            formFields.item(i).style.border = 'none';
//        }
//    }
//
//    if (errorStatus == 1) {
//        displayError(errorMessages.emptyFields);
//        return false;
//    } else {
//        return true;
//    }
//
//    return false;
//}
//
//
////Recives JSON and make options for select field//
//
//function fillSelectOptions(selector, data)
//{
//    var selectField = document.querySelector(selector);
//    var selectOption;
//    var emptyOption=document.createElement('option');
//    emptyOption.innerText='--Nothing selected yet--';
//    emptyOption.selected=true;
//    emptyOption.disabled=true;
//
//    if (isEmpty(selectField)) return;
//
//    if (isEmpty(data))
//    {
//        selectOption = document.createElement('option');
//        selectOption.innerText = "None selected";
//        selectOption.selected = true;
//        //selectOption.setAttribute("disabled","disabled");
//        selectOption.disabled=true;
//        selectField.appendChild(selectOption);
//        return;
//    }
//    selectField.innerHTML = "";
//    selectField.appendChild(emptyOption);
//    for (var i = 0; i < data.length; i++) {
//        selectOption = document.createElement('option');
//        selectOption.value = data[i].id;
//        selectOption.innerText = data[i].name; //todo check with Milosh for name standard
//        selectField.appendChild(selectOption);
//    }
//}
//
//
//function makePeopleTable(data) {
//
//    var master = document.getElementById('peopleTable');
//
//    if (!data){
//        console.log("No data");
//        var row = document.createElement('tr');
//        row.className = 'peopleTableContent';
//        var col = document.createElement('td');
//        col.className = 'contentField';
//        col.innerText = "There is no people.";
//        col.colSpan = "5";
//        row.appendChild(col);
//        master.appendChild(row);
//        return;
//    }
//
//    data.forEach(function (e) {
//        var row = document.createElement('tr');
//        row.className = 'peopleTableContent';
//        var i = 0;
//        var key;
//        var columnArray = [];
//
//        for (i = 0; i < 5; i++) {
//            var col = document.createElement('td');
//            col.className = 'contentField';
//            columnArray.push(col);
//        }
//
//        columnArray[0].innerText = e.first_name;
//        columnArray[1].innerText = e.last_name;
//        if (e.field_of_interest != null ) {
//            columnArray[2].innerText = e.field_of_interest.name;
//        } else {
//            columnArray[2].innerText = "Not set";
//        }
//        columnArray[3].innerText = e.rank.toFixed(2);
//
//        var span = document.createElement('span');
//        span.className = 'glyphicon glyphicon-plus';
//        span.setAttribute('data-id', e.id);
//        span.setAttribute('data-toggle', 'modal');
//        span.setAttribute('data-target', '#myModal');
//        span.setAttribute('onclick', 'openPersonModal(this)');
//
//        columnArray[4].appendChild(span);
//        for (i = 0; i < columnArray.length; i++) {
//            row.appendChild(columnArray[i]);
//        }
//        master.appendChild(row);
//    });
//
//}
//
//function openPersonModal(e) {
//    var personId = e.getAttribute('data-id');
//    /*Ajax request for data*/
//
//    $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-one-person",
//        data: {people_id: personId},
//        success: function (response) {
//            response = JSON.parse(response);
//            if ( response && response.code == 200 ){
//                personModalContent(response.data);
//            }else{
//                // responseModal(response.messages);
//                $("#myModal").modal();
//                responseModal(response.messages);
//            }
//
//        }
//    });
//
//
//}
//
//
//function personModalContent(data)
//{
//
//    var modalTitle         = document.getElementById("firstLastName");
//    var user               = document.getElementById('personName');
//    var mail               = document.getElementById('personMail');
//    var phone              = document.getElementById('personPhone');
//    var languages          = document.getElementById('personLanguages');
//    var path               = document.getElementById('personCvPath');
//    var rate               = document.getElementById('personRate');
//    var fieldOfIntSelect   = document.getElementById('personFieldOfInterest');
//    var currentScopeSelect = document.getElementById('personCurrentScope');
//    var departmentSelect   = document.getElementById('personDepartment');
//    var notes              = document.getElementById('allNotes');
//    var saveButton         = document.getElementById('savePersonChanges');
//    var noteCheck          = document.getElementById('postNote');
//    var stars              = document.getElementsByClassName('rateStar');
//    var deleteButton       = document.getElementById('deletePerson');
//    var averageRate = 0;
//    var languagesSpoken = '';
//    var currentUser=getCurrentUser();
//
//    // set person id to note check button
//    noteCheck.setAttribute('data-person-id',data.id);
//
//    // on save button also
//    saveButton.setAttribute('data-person-id', data.id);
//
//    // on stars also
//    for(var s = 0; s < 10; s++){
//        stars[s].setAttribute('data-person-id',data.id);
//    }
//
//    // set person id if button exist
//    try{
//        deleteButton.setAttribute('data-id', data.id);
//    }catch (e){
//
//    }
//
//    // calculationg avg rate
//    var basedOn = (data.votes != null) ? (data.votes.length) - 1 : 0;
//    averageRate = (data.votes != null) ? data.votes[basedOn].avg : 0;
//    averageRate = averageRate.toFixed(2);
//
//    // filing modal
//    user.innerText       = data.first_name + " " + data.last_name;
//    modalTitle.innerText = user.innerText;
//    mail.innerText       = data.email;
//    phone.innerText      = ( isEmpty(data.phone) ) ? "Phone is not provided." : data.phone;
//    path.innerText       = (data.first_name + data.last_name) + "-CV";
//    rate.innerText       = (averageRate != 0 ) ? averageRate + " (based on " + basedOn + " vote/s)" : "Not rated yet";
//
//    path.setAttribute('href', data.cv_path);
//
//    // fill person chosen languages
//    if (!isEmpty(data.languages)) {
//        for (i = 0; i < data.languages.length; i++) {
//            if(i!=data.languages.length -1){
//                languagesSpoken += data.languages[i].name + ",";
//            } else{
//                languagesSpoken += data.languages[i].name;
//            }
//        }
//    }else{
//        languagesSpoken='No languages choosen';
//    }
//    languages.innerText=languagesSpoken;
//
//    // get list of notes, add trash icon if can be deleted by user
//    var parentNotes = document.getElementById('notesList');
//    var notes_empty = isEmpty(data.notes);
//    parentNotes.innerHTML = "";
//
//    if (data.notes != null)
//    {
//        for (i = 0; i< data.notes.length; i++)
//        {
//            var can_delete = ["root","account_admin"].indexOf(currentUser.role.name) > -1
//                || ( !notes_empty && currentUser.user.id == data.notes[i].user_id );
//
//            var note = document.createElement('li');
//            note.className = 'oneNote';
//            note.innerHTML ='<span class="fa fa-circle" ></span> ' + data.notes[i].note;
//
//            // if can delete, add trash button
//            if ( can_delete ){
//                note.innerHTML += '<span class="glyphicon glyphicon-trash comment-trash" ' +
//                    'data-id="'+data.notes[i].id+'" ' +
//                    'data-people-id="'+data.id+'" ' +
//                    'data-rater-id="'+data.notes[i].user_id+'" ' +
//                    'data-question-type="12" ' +
//                    'onclick="openModalAbsolute(this)"></span>';
//            }else{
//                // console.log("Can't delete because currentUser.user.id = " + currentUser.user.id +
//                // " and note.user_id = " + data.notes[i].user_id);
//            }
//
//            parentNotes.appendChild(note);
//        }
//    } else {
//        // if no notes
//        var note = document.createElement('li');
//        note.className = 'oneNote';
//        note.innerHTML = '<span >No notes yet.</span>';
//        parentNotes.appendChild(note);
//    }
//
//    // field of interest fill data and set selected if exist
//    var qualif = getAllQualifications();
//    var dep    = getAllAccountDepartments();
//
//    fillSelectOptions("#personFieldOfInterest", qualif);
//    fillSelectOptions("#personCurrentScope", qualif);
//    fillSelectOptions("#personDepartment", dep);
//
//
//    // fieldOfIntSelect. = ( isEmpty(data.field_of_interest_id) ? 0 : data.field_of_interest_id);
//    // currentScopeSelect.selectedIndex = ( isEmpty(data.current_scope_id) ? 0 : data.current_scope_id);
//
//    var i;
//    // set selected field of interest
//    if (!isEmpty(fieldOfIntSelect) && !isEmpty(data.field_of_interest)  ){
//        for ( i = 0; i<fieldOfIntSelect.options.length; i++){
//            if (fieldOfIntSelect.options[i].value == data.field_of_interest.id) {
//                fieldOfIntSelect.options[i].selected = true;
//            }
//        }
//    }else{
//    }
//
//    // set selected current scope
//    if ( !isEmpty(currentScopeSelect) && !isEmpty(data.current_scope)  ){
//        for ( i = 0; i<currentScopeSelect.options.length; i++){
//            if (currentScopeSelect.options[i].value == data.current_scope.id) {
//                currentScopeSelect.options[i].selected = true;
//            }
//        }
//    }else{
//    }
//
//    // set selected department
//    if (!isEmpty(departmentSelect) && !isEmpty(data.department)  ){
//        for ( i = 0; i<departmentSelect.options.length; i++){
//            if (departmentSelect.options[i].value == data.department.id) {
//                departmentSelect.options[i].selected = true;
//            }
//        }
//    }else{
//    }
//
//
//}
////
////function deleteRequest(e) {
////
////    //fixme add yes/no modal
////    var personId = e.getAttribute('data-person-id');
////    $.ajax({
////        type: "POST",
////        async:false,
////        url: "backend/page.php?action=delete-person",  //todo check this
////        data:{people_id:personId},
////        success: function (response) {
////            response = JSON.parse(response);
////            if ( response && response.code == 200 ) {
////                alert("Person deleted.");
////
////            }
////            else {
////                alert("Something went wrong, try again later.");
////            }
////        }
////    });
////
////
////}
//
//function fillStars(e) {
//
//    var rate = e.getAttribute('data-rate');
//    var indexForStars = parseInt(rate);
//    indexForStars--;
//    var classGiven = e.className;
//    (classGiven);
//    var clearStar = 'fa fa-star-o fa-2x rateStar';
//    var fullStar = 'fa fa-star fa-2x rateStar';
//    var allStars = document.getElementsByClassName('rateStar');
//    var i = 0;
//
//    if (classGiven == clearStar) {
//        for (i = 0; i <= indexForStars; i++) {
//            allStars.item(i).className = fullStar;
//        }
//    }
//    else {
//        for (i = rate; i < allStars.length; i++) {
//            allStars.item(i).className = clearStar;
//        }
//    }
//
//}
//
//function sendRate(e) {
//    var rateGiven = e.getAttribute('data-rate');
//    var whichPerson= e.getAttribute('data-person-id');
//
//    $.ajax({
//        type: "POST",
//        async:false,
//        url: "backend/page.php?action=rate-person",  //todo check this
//        data:{
//            rate: rateGiven,
//            people_id:whichPerson
//        },
//        success: function (response)
//        {
//            response = JSON.parse(response);
//            if ( response && response.code == 200 )
//            {
//                var currentPerson = getPersonById(whichPerson);
//                personModalContent(currentPerson);
//                loadMainContent();
//                openResponseModalAbsolute("You rated this user with a "+rateGiven + "!");
//            }
//            else {
//                openResponseModalAbsolute(response != null ? response.messages : "Can't rate person!");
//            }
//        }
//    });
//}
//
//
//function sendNote(e) {
//    var field = document.getElementById('newNote');
//    var noteGiven = field.value;
//    var person= e.getAttribute('data-person-id');
//    var errorField = document.getElementById('previewError');
//    if (noteGiven == '') {
//        field.style.border = '1px solid red';
//        errorField.innerText = errorMessages.emptyFields;
//        errorField.style.color = "#ad3e3c";
//    }
//    else {
//        $.ajax({
//            type: 'POST',
//            async:false,
//            url: "backend/page.php?action=people-new-note",  //todo check this
//            data:{people_id:person,
//                note:noteGiven },
//            success: function (response)
//            {
//                response = JSON.parse(response);
//                if ( response && response.code == 200 )
//                {
//                    openResponseModalAbsolute("Note successfully saved!");
//                    $("#notesAboutUser").toggle(700);
//                    field.value = "";
//                    var currentPerson = getPersonById(person);
//                    personModalContent(currentPerson);
//                }
//                else {
//                    openResponseModalAbsolute("Something went wrong, please try later.");
//                }
//            }
//
//        });
//    }
//}
//
//
//function switchCards(e) {
//
//    var idPanel = e.getAttribute('data-panel');
//    activePanel = idPanel;
//    //var visiblePannel = document.getElementById(idPanel);
//    var allPanels = document.getElementsByClassName('card');
//    var allMenuCards = document.getElementsByClassName('cardMenu');
//    var regularCard = "cardMenu";
//    var activeCard = "active cardMenu";
//    var object;
//
//    for (var i in allMenuCards) {
//        object = allMenuCards.item(i);
//        if (object.getAttribute('data-panel') == activePanel) {
//            object.className = activeCard;
//        }
//        else {
//            object.className = regularCard;
//        }
//    }
//    for (i in allPanels) {
//
//        object = allPanels.item(i);
//        if (object.getAttribute('id') == activePanel) {
//
//            object.style.display = 'block';
//            object.style.visibility = 'visible';
//
//        }
//        else {
//            object.style.display = 'none';
//            object.style.visibility = 'hidden';
//
//        }
//    }
//
//    if (idPanel == "manageUsers"){
//        var users = getAllAccountUsers();
//        fillWithUsers(users);
//    }else if (idPanel == "manageAccounts"){
//        var accounts = getAllAccounts();
//        fillWithAccounts(accounts);
//    }
//}
//
//
//function addNewCategory(type) {
//    var errorField, field, valueInput,requestType;
//    var responseLink=document.querySelector("li[data-panel='globalSettings']");
//    if (type == 1) {
//        errorField = document.getElementById('errorDept');
//        field = document.getElementById('newDept');
//        requestType="add-department";
//
//
//    }
//    else if (type == 2) {
//        errorField = document.getElementById('errorQual');
//        field = document.getElementById('newQual');
//        requestType="add-qualification";
//    }
//    else if (type == 3) {
//        errorField = document.getElementById('errorLang');
//        field = document.getElementById('newLang');
//        requestType="add-language";
//
//    }
//    else {
//        responseModal('Something went wrong, pleas try again later');
//        return;
//    }
//    valueInput = field.value;
//
//    if (valueInput == '') {
//        errorField.innerText = errorMessages.emptyFields;
//        errorField.style.display = 'block';
//        field.style.border = '1px solid red';
//    }
//    else {
//        $.ajax({
//            type: "POST",
//            async: false,
//            url: "backend/page.php?action=" + requestType + "",
//            data: {name:valueInput},
//            success: function (response) {
//                response = JSON.parse(response);
//                if ( response && response.code==200  ) {
//                    errorField.innerText = '';
//                    errorField.style.display = 'none';
//                    field.style.border = 'none';
//                    field.value='';
//                    responseModal("You have successfully save changes.");
//
//
//                    refreshEditPanel(responseLink,fillGlobalSettings);
//                }
//                else {
//                    responseModal(response.messages);
//                }
//            }
//        });
//
//    }
//
//}
//
//
//function checkPasswordEdit() {
//
//    var displayErrorField = document.getElementById('superuserPasswordError');
//    var importantFields = document.getElementsByClassName('important');
//    var errorCounter = 0;
//    for (i in importantFields) {
//        if (importantFields.item(i).value == '') {
//            importantFields.item(i).style.border = '2px solid #ad3e3c';
//            errorCounter++;
//        }
//        else {
//            importantFields.item(i).style.border = 'none';
//        }
//    }
//
//    if (errorCounter > 0) {
//        displayErrorField.innerText = errorMessages.emptyFields;
//        displayErrorField.style.display = 'block';
//        return false;
//    }
//    else {
//        return true;
//    }
//}
//
////Modal window questions//
//
//function questionManagement(e) {
//
//    var type = e.getAttribute('data-question-type');
//    var question = document.getElementById('questionField');
//    var optionId = e.getAttribute('data-id');
//    var deleteOption = document.getElementById('deleteOption');
//    switch (type) {
//        case '0': {
//            question.innerText = questionMessages.deleteUser;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 0);
//            break;
//        }
//        case '1':
//            question.innerText = questionMessages.deactivateAccount;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 1);
//            break;
//
//        case '2':
//            question.innerText = questionMessages.removeDepartment;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 2);
//            break;
//        case '3':
//            question.innerText = questionMessages.removeQualification;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 3);
//            break;
//        case '9':
//            question.innerText = questionMessages.deleteAccount;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 9);
//            break;
//        case '10':
//            question.innerText = questionMessages.removeLanguage;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 10);
//            break;
//        case '11':
//            question.innerText = questionMessages.deletePerson;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 11);
//            break;
//        case '12':
//            question.innerText = questionMessages.deleteComment;
//            deleteOption.setAttribute('data-id', optionId);
//            deleteOption.setAttribute('data-delete-type', 12);
//            break;
//        default:
//            //todo error
//            break;
//    }
//
//
//}
//
//function yesAction(e) {
//    var requestNumber = parseInt(e.getAttribute('data-delete-type'));
//    var idForRequest = e.getAttribute('data-id');
//
//    switch (requestNumber)
//    {
//        // delete user
//        case 0: {
//            var response = deleteUser(idForRequest);
//            $(".close").click();
//            if (response && response.code == 200) {
//                responseModal("You've successfully remove User!");
//                fillWithUsers(getAllAccountUsers());
//            } else {
//                responseModal(response.messages);
//            }
//            break;
//        }
//
//        // deactivate account
//        case 1: {
//            var response = changeAccountStatus(idForRequest, 0); //0 for deactivate
//            if (response && response.code == 200) {
//                responseModal("You have successfully save changes.");
//                $("#dash").load("ui/template/editPanel.php", function () {
//                    switchCards(document.querySelector("li[data-panel='accountSettings']"));
//                });
//            } else {
//                responseModal(response.messages);
//            }
//
//            break;
//        }
//
//        // remove department
//        case 2: {
//            var response = deleteDepartment(idForRequest);
//            if (response && response.code == 200) {
//                responseModal("You've successfully remove Department.");
//                refreshEditPanel(document.querySelector(panelSelectors.globalSettings), fillGlobalSettings);
//            } else {
//                responseModal(response.messages);
//            }
//            break;
//        }
//
//        // remove qualification
//        case 3: {
//            var response = deleteQualification(idForRequest);
//            if (response && response.code == 200) {
//                responseModal("You've successfully remove Qualification.");
//                refreshEditPanel(document.querySelector(panelSelectors.globalSettings), fillGlobalSettings);
//            } else {
//                responseModal(response.messages);
//            }
//            break;
//        }
//
//        // delete account
//        case 9: {
//            var response = deleteAccount(idForRequest);
//            $(".close").click();
//            if (response && response.code == 200) {
//                responseModal("You successfully removed Account!");
//                fillWithAccounts(getAllAccounts());
//            } else {
//                responseModal(response.messages);
//
//            }
//            break;
//        }
//
//        // remove language
//        case 10: {
//            var response = deleteLanguage(idForRequest);
//            if (response && response.code == 200) {
//                responseModal("You've successfully remove Language.");
//                refreshEditPanel(document.querySelector(panelSelectors.globalSettings), fillGlobalSettings);
//            } else {
//                responseModal(response.messages);
//            }
//            break;
//        }
//
//        //Delete person
//        case 11: {
//            //first, closes absolute modal
//            document.getElementById('questionModalAbsolute').style.display = 'none';
//            var response = deletePerson(idForRequest);
//            var modal=document.getElementById("myModal");
//            var times=modal.getElementsByClassName('close')[0];
//            if (response && response.code == 200) {
//
//                times.click();
//                responseModal("You've successfully remove person.");
//                setTimeout(function () {
//                    var times = modal.getElementsByClassName('close')[0];
//                    times.click();
//                }, 5000);
//
//                loadMainContent();
//            } else {
//                times.click();
//                responseModal(response.messages);
//            }
//
//            break;
//        }
//        case 12: {
//            console.log("Delete comment");
//            document.getElementById('questionModalAbsolute').style.display = 'none';
//            var peopleId= e.getAttribute('data-people-id');
//            var response = deleteComment(idForRequest,peopleId);
//            if ( response && response.code == 200) {
//                personModalContent(getPersonById(peopleId));
//                openResponseModalAbsolute("You've successfully remove comment.");
//            } else {
//                openResponseModalAbsolute(response.messages);
//            }
//            break;
//        }
//
//        default:
//            break;
//
//    }
//
//
//    //todo then refresh content//
//
//}
//
////Manage accounts tabel fill function//
//
//function fillWithAccounts(data) {
//    var masterParent = document.getElementById('allAccounts');
//    masterParent.innerHTML = "";
//
//    if (!data) {
//        var row = document.createElement('tr');
//        row.className = 'userTableContent';
//        var col = document.createElement('td');
//        col.className = 'contentField';
//        col.innerText = "There is no people.";
//        col.colSpan = "5";
//        row.appendChild(col);
//        masterParent.appendChild(row);
//        return;
//    }
//
//    data.forEach(function (e) {
//        var row = document.createElement('tr');
//        var size = Object.keys(e).length;
//        var i = 0;
//        var key;
//        var columnArray = [];
//
//        for (i = 0; i < 5; i++) {
//            var column = document.createElement('td');
//            columnArray.push(column);
//        }
//
//        // fill with information from data and put it in table
//        columnArray[0].innerText = e.name;
//        columnArray[1].innerText = e.phone;
//        columnArray[2].innerText = e.address;
//
//        //Creating select element
//        var activeSelect = document.createElement('select');
//        activeSelect.setAttribute('data-account-id', e.id);
//        activeSelect.className = 'form-control';
//
//        //Creating select options
//        var active = document.createElement('option');
//        active.innerText = 'Active';
//        var inactive = document.createElement('option');
//        inactive.innerText = 'Inactive';
//
//        active.setAttribute('value', '1');
//        inactive.setAttribute('value', '0');
//
//        //Selecting current status
//        if (e.status == 0) {
//            inactive.selected = true;
//        }
//        else {
//            active.selected = true;
//        }
//
//        //Adding options into select, and then adding select to the table cell
//        activeSelect.appendChild(active);
//        activeSelect.appendChild(inactive);
//        columnArray[3].appendChild(activeSelect);
//
//        //Creating delete button
//        var button = document.createElement('button');
//        button.className = 'form-control btn-danger';
//        button.setAttribute('type', 'button');
//        button.setAttribute('data-toggle', 'modal');
//        button.setAttribute('data-question-type', "9");
//        button.setAttribute('data-target', '#questionModal');
//        button.setAttribute('onclick', 'questionManagement(this)');
//        button.setAttribute('data-id', e.id);
//        button.innerText = 'Delete';
//
//        columnArray[4].appendChild(button);
//
//        //appending cells to the row
//        for (key in columnArray) {
//            row.appendChild(columnArray[key])
//        }
//
//        //Creating save button and cell for it
//        var saveTd = document.createElement('td');
//        var saveBtn = document.createElement('button');
//
//        saveBtn.setAttribute('data-account-id', e.id);
//        saveBtn.setAttribute('onclick', 'saveAccountChanges(this)');
//        saveBtn.className = 'submitBtn btnYes noShadow';
//        saveBtn.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
//
//        //Appending newly made cell to the row and row to the table
//        saveTd.appendChild(saveBtn);
//        row.appendChild(saveTd);
//        masterParent.appendChild(row);
//    });
//
//}
//
//
//function saveAccountChanges(e) {
//
//    var accountId = e.getAttribute('data-account-id');
//    var row = (e.parentElement).parentElement;
//    var selectElement = row.getElementsByTagName('select')[0];
//    var statusForAPI = selectElement.options[selectElement.selectedIndex].value;
//
//    var response = changeAccountStatus(accountId, statusForAPI);
//
//    if (response && response.code == 200) {
//        responseModal("You have successfully updated account!");
//        fillWithUsers(getAllAccounts());
//
//    } else {
//        responseModal(response.messages);
//    }
//
//}
//
////Geting changes on people modal//
//
//
//function savePeopleChanges(e) {
//
//    var person = e.getAttribute('data-person-id');
//    var department = document.getElementById('personDepartment');
//    var fieldOfInterest = document.getElementById('personFieldOfInterest');
//    var currentScope = document.getElementById('personCurrentScope');
//
//    var fioForApi = fieldOfInterest.options[fieldOfInterest.selectedIndex].value;
//    var currentScopeForAPI = currentScope.options[currentScope.selectedIndex].value;
//    var departmentForAPI = department.options[department.selectedIndex].value;
//
//    $.ajax({
//        type: 'POST',
//        async: false,
//        global: true,
//        url: "backend/page.php?action=save-people-changes",
//        data: {
//            field_of_interest_id: fioForApi,
//            current_scope_id: currentScopeForAPI,
//            department_id: departmentForAPI,
//            person_id: person
//        },
//        success: function (response) {
//            response = JSON.parse(response);
//            if (response && response.code == 200) {
//
//                personModalContent(getPersonById(person));
//                loadMainContent();
//                openResponseModalAbsolute("You have successfully updated person!");
//            }
//            else {
//                openResponseModalAbsolute(response.messages);
//            }
//        }
//    });
//
//}
//
//
//function fillWithUsers(data) {
//    var masterParent = document.getElementById('allUsers');
//    masterParent.innerHTML = "";
//
//    if (isEmpty(data)) {
//        var row = document.createElement('tr');
//        // row.className = 'userTableContent';
//        var col = document.createElement('td');
//        col.className = 'contentField';
//        col.innerText = "There is no people.";
//        col.colSpan = "5";
//        row.appendChild(col);
//        masterParent.appendChild(row);
//        return;
//    }
//    var allRoles = getAllRoles();
//    data.forEach(function (e) {
//        console.log(e);
//        var row = document.createElement('tr');
//        var size = Object.keys(e).length;
//        console.log("Object.keys(e).length: " + size);
//        var i = 0;
//        var key;
//        var columnArray = [];
//
//        for (i = 0; i < size - 1; i++) {
//            var column = document.createElement('td');
//            columnArray.push(column);
//        }
//
//        //fill with information from recived data
//        columnArray[0].innerText = e.f_name;
//        columnArray[1].innerText = e.l_name;
//        columnArray[2].innerText = e.email;
//
//        var activeSelect = document.createElement('select');
//
//        activeSelect.setAttribute('data-user-id', e.id);
//        activeSelect.className = 'form-control';
//
//        var active = document.createElement('option');
//        active.innerText = 'Active';
//        var inactive = document.createElement('option');
//        inactive.innerText = 'Inactive';
//        active.setAttribute('value', '1');
//        inactive.setAttribute('value', '0');
//
//        if (e.status == 0) {
//            inactive.selected = true;
//        }
//        else {
//            active.selected = true;
//        }
//
//        activeSelect.appendChild(active);
//        activeSelect.appendChild(inactive);
//        columnArray[3].appendChild(activeSelect);
//
//        //Creating select role
//        var roleSelect = '<select data-user-id="' + e.id + '" class="form-control">';
//        roleSelect += roleSelector(allRoles, e.role) + '</select>'; //todo fix this somehow, don't send role -_-
//        columnArray[4].innerHTML = roleSelect;
//
//        //Creating button for deleting user
//        var button = document.createElement('button');
//        button.className = 'form-control btn-danger';
//        button.setAttribute('type', 'button');
//        button.setAttribute('data-toggle', 'modal');
//        button.setAttribute('data-question-type', "0");
//        button.setAttribute('data-target', '#questionModal');
//        button.setAttribute('onclick', 'questionManagement(this)');
//        button.setAttribute('data-id', e.id);
//        button.innerText = 'Delete this user';
//        columnArray[5].appendChild(button);
//
//
//        //Appending cells to the row
//        for (key in columnArray) {
//            row.appendChild(columnArray[key])
//        }
//
//        var saveTd = document.createElement('td');
//        var saveBtn = document.createElement('button');
//
//        saveBtn.setAttribute('data-person-id', e.id);
//        saveBtn.setAttribute('onclick', 'saveUserChanges(this)');
//
//        saveBtn.className = 'submitBtn btnYes noShadow';
//        saveBtn.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
//
//        //Appending new cell to the row and row to the table
//        saveTd.appendChild(saveBtn);
//        row.appendChild(saveTd);
//        masterParent.appendChild(row);
//
//    });
//
//
//}
//
//function saveUserChanges(e) {
//
//    var personId = e.getAttribute('data-person-id');
//    var row = (e.parentElement).parentElement;
//    var selectElements = row.getElementsByTagName('select');
//
//    var statusForAPI = selectElements[0].options[selectElements[0].selectedIndex].value;
//    var roleForAPI = selectElements[1].options[selectElements[1].selectedIndex].value;
//
//    data = {
//        user_id: personId,
//        user_status: statusForAPI,
//        role_code: roleForAPI
//    };
//
//    var response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=update-user",
//        async: false,
//        data: data,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    response = JSON.parse(response);
//    if (response && response.code == 200) {
//        responseModal("You have successfully updated user!");
//        fillWithUsers(getAllAccountUsers());
//    } else {
//        responseModal(response.messages);
//    }
//
//}
//
//
//function roleSelector(allRoles, role) {
//    var response = '';
//
//    allRoles.forEach(function (e) {
//        var option = '<option';
//        option += ' value="' + e.code + '"';
//        if (!isEmpty(role) && e.code == role.code) {
//            option += ' selected>';
//        }
//        else {
//            option += '>'
//        }
//        option += e.name + '</option>';
//        response += option;
//    });
//    return response;
//}
//
//function fillAccountInfo(data) {
//
//    var accName = document.getElementById('accInfoAccountName');
//    var accAddress = document.getElementById('accInfoAccountAddress');
//    var accPhone = document.getElementById('accInfoAccountPhone');
//    var accStatus = document.getElementById('accInfoAccountStatus');
//
//    accName.innerText = data.name;
//    accAddress.innerText = data.address;
//    accPhone.innerText = data.phone;
//    if (data.status == 1) {
//        accStatus.innerText = 'Active';
//    }
//    else {
//        accStatus.innerText = 'Inactive'
//    }
//
//};
//
////This function populate global settings card on edit panel
//
//function fillGlobalSettings() {
//    var masterParentDepartment = document.getElementById('departmentList');
//    var masterParentQualifications = document.getElementById('qualificationsList');
//    var masterParentLanguages = document.getElementById('languagesList');
//    var departmentData = getAllAccountDepartments();
//    var qualificationData = getAllQualifications();
//    var languagesData = getAllLanguages();
//
//
//    var questionTypeDept = '2';
//    var questionTypeQual = '3';
//    var questionTypeLang = '10';
//    departmentData.forEach(function (e) {
//        var item = e;
//        fillListData(item, questionTypeDept, masterParentDepartment)
//    });
//    qualificationData.forEach(function (e) {
//        var item = e;
//        fillListData(item, questionTypeQual, masterParentQualifications)
//    });
//    languagesData.forEach(function (e) {
//        var item = e;
//        fillListData(item, questionTypeLang, masterParentLanguages)
//    });
//
//    var data=getCurrentUser();
//    globalPanelTrash(data.role.name);
//}
//
//function fillListData(item, questionType, masterElement) {
//    var listItem = document.createElement('li');
//    var spanElement = document.createElement('span');
//    spanElement.className = 'glyphicon glyphicon-trash littleTrash';
//    spanElement.setAttribute('data-toggle', 'modal');
//    spanElement.setAttribute('data-target', '#questionModal');
//    spanElement.setAttribute('data-question-type', questionType);
//    spanElement.setAttribute('onclick', 'questionManagement(this)');
//    spanElement.setAttribute('data-id', item.id);
//
//    listItem.innerText = item.name;
//    listItem.appendChild(spanElement);
//    masterElement.appendChild(listItem);
//}
//
//
//function fillSuperuserInfo(data) {
//
//    var firstName = document.getElementById('superuserFN');
//    var lastName = document.getElementById('superuserLN');
//    var mail = document.getElementById('superuserMail');
//    var suStatus = document.getElementById('superuserStatus');
//
//    firstName.innerText = data.f_name;
//    lastName.innerText = data.l_name;
//    mail.innerText = data.email;
//
//    if (data.status == 1) {
//        suStatus.innerText = 'Active';
//    }
//    else {
//        suStatus.innerText = 'Inactive';
//    }
//
//}
//
//function fillLanguages() {
//    var languages = getAllLanguages();
//    fillSelectOptions("#selectLanguage", languages);
//}
//
//// fill select list for accounts
//function fillSelectAccounts() {
//    var accounts = getAllAccounts();
//    fillSelectOptions("#selectAccounts", accounts);
//}
//
//
//function showCard(e) {
//
//    var selector = e.getAttribute('data-field');
//    var masterParent = document.getElementById(selector);
//    var selected = e.options[e.selectedIndex];
//    var idSelected = selected.value;
//    var name = selected.innerText;
//    var span = document.createElement('span');
//    var nameSpan=document.createElement('span');
//    selected.style.display = 'none';
//
//    if (e.id === "selectAccounts") {
//        span.className = "closebtn visibleAccountChips";
//    } else {
//        span.className = "closebtn visibleChips";
//    }
//    span.innerHTML = '\u00d7';
//    span.setAttribute('onclick', 'deleteChip(this)');
//    span.setAttribute('data-id', idSelected);
//    var chip = document.createElement('div');
//    chip.className = 'chip';
//    nameSpan.innerText = name;
//    chip.appendChild(nameSpan);
//    chip.appendChild(span);
//    masterParent.appendChild(chip);
//}
//
//function deleteChip(e) {
//    var selectOption = e.getAttribute('data-id');
//    var options = document.getElementsByTagName('option');
//    for (var key in options) {
//        if (options[key].value === selectOption) {
//            options[key].style.display = 'block';
//            e.className = 'chip';
//            e.parentElement.style.display = 'none';
//            e.className = 'closebtn';
//        }
//    }
//
//}
//
//function getSelectedChips(type) {
//
//    var arrayOfIds = [];
//    var i;
//    var selectedElements;
//    type = parseInt(type);
//    switch (type) {
//        case 1:
//            selectedElements = document.getElementsByClassName('visibleChips');
//            break;
//        case 2:
//            selectedElements = document.getElementsByClassName('visibleAccountChips');
//            break;
//        default:
//            console.log('Some error appear')
//    }
//
//    for (i = 0; i < selectedElements.length; i++) {
//        var temp = selectedElements.item(i).getAttribute('data-id');
//        arrayOfIds.push(temp);
//    }
//    return arrayOfIds
//}
//
//function changeStateRequest(e) {
//
//    var type = e.getAttribute('data-question-type');
//    var question = document.getElementById('questionField');
//    var deleteOption = document.getElementById('deleteOption');     //Yes button
//    var selected = e.options[e.selectedIndex];
//    var idSelected = selected.value;
//
//
//    switch (type) {
//        case '4':
//            question.innerText = questionMessages.deactivateUser;
//            break;
//        case '5':
//            question.innerText = questionMessages.changeRole;
//            break;
//
//        default:
//            //toto error
//            break;
//    }
//
//    deleteOption.setAttribute('data-id', idSelected);
//    deleteOption.setAttribute('data-delete-type', type);
//
//}
//
////function responseHandle(response) {
////
////    var answerField = document.getElementById('questionField');
////    var buttonfield = document.getElementById('answerOptions');
////
////    answerField.innerText = response;
////    buttonfield.innerHTML = '<div calss="col-md-5"></div>' +
////        '<div class="col-md-2">' +
////        '<button type="button" class="submitBtn btnYes" data-dismiss="modal">Ok</button>' +
////        '</div> ' +
////        '<div class="col-md-5"></div>';
////
////}
//
//function closeAction(selector) {
//    var modal = document.getElementById(selector);
//
//    modal.style.display = 'none';
//}
//
//function openModalAbsolute(e) {
//
//    var modal = document.getElementById('questionModalAbsolute');
//    modal.style.display = 'block';
//    var type = e.getAttribute('data-question-type');
//    var question = document.getElementById('questionAbsoluteField');
//    var deleteOption = document.getElementById('deleteAbsoluteOption');     //Yes button
//    var id = e.getAttribute('data-id');
//    switch (type) {
//        case '11':
//            question.innerText = questionMessages.deletePerson;
//            break;
//        case '12':
//            question.innerText = questionMessages.deleteComment;
//            var peopleId= e.getAttribute('data-people-id');
//            deleteOption.setAttribute('data-people-id',peopleId);
//            break;
//        default:
//            question.innerText = "Unknown request";
//            break;
//    }
//    console.log("Question: " + question.innerText);
//    deleteOption.setAttribute('data-id', id);
//    deleteOption.setAttribute('data-delete-type', type);
//}
//
//function openResponseModalAbsolute(message) {
//
//    var modal = document.querySelector('#responseModalAbsolute');
//    modal.style.display = 'block';
//    var messageField = modal.querySelector('#responseAbsoluteField');
//
//    var response = "";
//    if (Array.isArray(message)) {
//        Array.prototype.map.call(message, function (e) {
//            response += e + "\n";
//        });
//    } else if (typeof message === 'object') {
//        for (var key in message) {
//            if (message.hasOwnProperty(key)) {
//                var val = message[key];
//                response += val + "\n";
//            }
//        }
//    } else if (typeof message === 'string') {
//        response = message;
//    } else {
//        console.log("Undefined type of error: " + typeof message);
//    }
//
//    messageField.innerText = response;
//
//    //Closes modal after 5 seconds;
//    if (messageField.innerText.indexOf("no") == -1 ) { // if item is not found
//        setTimeout(function () {
//            var times = modal.getElementsByClassName('close')[0];
//            times.click();
//        }, 5000)
//    }
//
//
//}
//
//// Check is there expiration message from API
//// Response is JSON already
//function checkTokenExpiration(response) {
//    try {
//        var message = response.messages[0];
//        var noToken = false;
//
//        if (message.indexOf("no token") > -1 || message.indexOf("expired") > -1 || message.indexOf("absent") > -1) {
//            noToken = true;
//        }
//
//        if (noToken) {
//            // console.log("There is no valid token!");
//            // alert("Your session is expired... Please, login to continue. ");
//            // {
//            //     $.ajax({
//            //         type: "POST",
//            //         url: "backend/page.php?action=refresh-token",
//            //         success: function (response) {
//            //             response = JSON.parse(response);
//            //             if ( response && response.code == 200 ){
//            //                 alert("Session extended! Enjoy!");
//            //             }else{
//            //                 displayError(response.messages );
//            //             }
//            //         }
//            //     });
//            // }else{
//            $.ajax({
//                type: "POST",
//                url: "backend/page.php?action=logout",
//                success: function (response) {
//                    response = JSON.parse(response);
//                    if (response && response.code == 200) {
//                        responseModal('"You have successfully logged out!"');
//                    } else {
//                        //displayError(response.messages );
//                        responseModal("You have successfully logged out!");
//                    }
//                }
//            });
//
//            loadNavbar();
//            loadMainContent();
//        }
//    } catch (e) {
//        console.log(e.message);
//        console.log("There is no messages!");
//    }
//}
//
//
//function titleCase(str) {
//    return str.split(' ').map(function (val) {
//        return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
//    }).join(' ');
//}
//
//function setGlobalPanel(newValue) {
//
//    if (newValue === '' || newValue === null) {
//        activePanel = 'accountSettings';
//    }
//    else {
//        activePanel = newValue;
//    }
//}
//
//
//function responseModal(message) {
//    var modal = document.querySelector('#responseModal');
//    var messageField = modal.querySelector('#responseField');
//
//    var response = "";
//    if (Array.isArray(message)) {
//        Array.prototype.map.call(message, function (e) {
//            response += e + "\n";
//        });
//    } else if (typeof message === 'object') {
//        for (var key in message) {
//            if (message.hasOwnProperty(key)) {
//                var val = message[key];
//                response += val + "\n";
//            }
//        }
//    } else if (typeof message === 'string') {
//        response = message;
//    } else {
//        console.log("Undefined type of error: " + typeof message);
//    }
//
//    messageField.innerText = response;
//    $("#responseModal").modal();
//
//    //Closes modal after 10 seconds;
//    if (message.indexOf("Ooops!") == -1) {
//        setTimeout(function () {
//            var times = modal.getElementsByClassName('close')[0];
//            times.click();
//        }, 5000)
//    }
//
//}
//
//
//function getAllLanguages() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-languages",
//        async: false,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (response && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//
//}
//
//function getAllRoles() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-roles",
//        async: false,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (response && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//}
//
//function getAllAccountDepartments() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-account-departments",
//        async: false,
//        success: function (resp) {
//            return resp;
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (data && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//}
//
//function getAllQualifications() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-qualifications",
//        async: false,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (data && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//}
//
//
//function getAllAccountUsers() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-account-users",
//        async: false,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (data && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//}
//
//function getAllAccounts() {
//    var data = null;
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=get-accounts-small",
//        async: false,
//        success: function (resp) {
//        }
//    }).responseText;
//
//    data = JSON.parse(response);
//    if (data && data.code == 200) {
//        data = data.data;
//        return data;
//    }
//    return null;
//}
//
//function logout() {
//
//    $.ajax({
//        type: "post",
//        url: "backend/page.php?action=logout",
//        success: function (response) {
//            createCookie("logged", 0);
//            loadNavbar();
//            loadMainContent();
//        },
//        error: function () {
//            responseModal("Can't logout... Please reload and try again.");
//            //alert("Can't logout... Please reload and try again.");
//        }
//    });
//}
//
//function deleteUser(id) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=delete-user",
//        async: false,
//        data: {user_id: id},
//        success: function (resp) {
//            return resp
//        }
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function changeAccountStatus(id, status) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=change-account-status",
//        async: false,
//        data: {
//            account_id: id,
//            acc_status: status
//        },
//        success: function (resp) {
//        }
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deleteAccount(id) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-account",
//        data: {account_id: id},
//        success: function (resp) {
//            return resp;
//        }
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deleteLanguage(id) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-language",
//        data: {language_id: id},
//        success: function (resp) {
//            return resp;
//        }   //todo test this
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deleteQualification(id) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-qualification",
//        data: {qualification_id: id},
//        success: function (resp) {
//            return resp;
//        } //todo test this
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deleteDepartment(id) {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-department",
//        data: {department_id: id},
//        success: function (resp) {
//            return resp;
//        } //todo test this
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deletePerson(id) {
//    var response = null;
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-person",
//        data: {people_id: id},
//        success: function (resp) {
//            return resp;
//        }
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function deleteComment(comment_id,person_id) {
//    var response = null;
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=delete-comment",
//        data: {person_id:person_id, comment_id: comment_id},
//        success: function (resp) {}
//    }).responseText;
//
//    return JSON.parse(response);
//}
//
//function getAllPeople() {
//    var response = null;
//
//    response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=people-preview",
//        success: function (resp) {
//        }
//    }).responseText;
//
//    response = JSON.parse(response);
//    var data;
//    if (response && response.code == 200) {
//        data = response.data;
//        return data;
//    } else {
//        console.log("No people: " + response.messages);
//    }
//    return null;
//}
//
//
//function isEmpty(obj) {
//    try {
//        if (!obj || obj == null || obj.toString().trim() == '' || obj == undefined || typeof obj === 'undefined' || obj.length == 0 || !obj.length) {
//
//            var empty = true, fld;
//            for (fld in obj) {
//                empty = false;
//                break;
//            }
//            return empty;
//        }
//        return false;
//    } catch (e) {
//        // console.log(e.message);
//    }
//
//}
//
//function createCookie(name, value, days) {
//    var expires = "";
//    if (days) {
//        var date = new Date();
//        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//        expires = "; expires=" + date.toUTCString();
//    }
//    document.cookie = name + "=" + value + expires + "; path=/";
//}
//
//function readCookie(name) {
//    var nameEQ = name + "=";
//    var ca = document.cookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//    }
//    return null;
//}
//
//function eraseCookie(name) {
//    createCookie(name, "", -1);
//}
//
//function refreshEditPanel(selector, nextAction) {
//    $("#dash").load("ui/template/editPanel.php", function () {
//        switchCards(selector);
//        nextAction();
//    });
//}
//
//function globalPanelTrash(role) {
//
//    if (role != 'root') {
//        var i;
//        var trashes = document.querySelectorAll('.littleTrash'); console.log("Trashes length: " + trashes.length);
//        for(i in trashes) {
//            trashes[i].className = "glyphicon";
//            trashes[i].removeAttribute('data-toggle');
//            trashes[i].removeAttribute('data-target');
//            trashes[i].removeAttribute('data-question-type');
//            trashes[i].removeAttribute('onclick');
//            trashes[i].removeAttribute('data-id');
//            trashes[i].innerHTML = "";
//        }
//    }
//}
//
//// FIXME: try to implement this instead code in method personModalContent
//// function commentTrash(userId, role) {
////     console.log("User id: " + userId);
////     console.log("Role: " + role);
////     var trashes = document.querySelectorAll('.comment-trash');
////     if (!isEmpty(trashes)){
////         console.log("All trashes: " + trashes);
////         var i;
////         for(i in trashes){
////             var who = trashes[i].getAttribute('data-rater-id');
////             console.log("Rater id: "  + who);
////             var is_author = who == userId || (role == 'root' || role =='account_admin');
////             if (is_author) {
////                 try{
////                     trashes[i].className = "glyphicon";
////                     trashes[i].removeAttribute('onclick');
////                     trashes[i].removeAttribute('data-id');
////                     trashes[i].innerHTML = "";
////                 }catch (e){
////                     console.log("Error: " + e.message + "\nOn: " + trashes[i]);
////                 }
////
////             }
////         }
////     }
////
//// }
//
//function getCurrentUser() {
//
//    var response = $.ajax({
//        type: "POST",
//        async: false,
//        global:false,
//        url: "backend/page.php?action=get-current-user",
//        data: {},
//        success: function (response) {
//
//        }
//    }).responseText;
//
//    response = JSON.parse(response);
//    if (response && response.code == 200) {
//        return response.data
//    }
//    else {
//        console.log("Something went wrong, please try later.");
//        return null;
//    }
//}
//
//function changePassword(oldPass, newPass) {
//    var messages = null, response;
//
//    response = $.ajax({
//        type: "POST",
//        url: "backend/page.php?action=change-password",
//        async: false,
//        data: {
//            password_old: oldPass,
//            password_new: newPass
//        },
//        success: function (resp) {
//            return resp;
//        }
//    }).responseText;
//
//    response = JSON.parse(response);
//
//    if (response && response.code == 200) {
//        return null;
//    } else {
//        messages = response.messages;
//        return messages;
//    }
//
//
//}
//
//
//function getPersonById(id)
//{
//    var response = $.ajax({
//        type: "POST",
//        async: false,
//        url: "backend/page.php?action=get-one-person",
//        data: {people_id:id},
//        success: function (response) {}
//    }).responseText;
//
//    response = JSON.parse(response);
//    if (response && response.code == 200) {
//        return response.data
//    }
//    else {
//        console.log("Something went wrong, please try later.");
//        return null;
//    }
//}
