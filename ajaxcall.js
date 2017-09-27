/**
 * Created by milic on 16.9.2017..
 */
$("body").on("click","#responde",function(){
    $("#popupResponse").toggle(300);
    $("textarea[name=responseMessage]").val('');

});
$("body").on("click","#cancleResponse",function(){
    console.log('clicked on responde');
    $("#popupResponse").toggle(300);
    $("textarea[name=responseMessage]").val('');
});

$("body").on("click", ".saveChanges", function () {

    //This thingy thing is used as a prefix for fields names
    var prefixes = ['new', 'error'];
    var bThis = $(this);
    var type = $(bThis).attr('data-type');
    //gets new value from input field and trims empty chars from begining and end;
    var fieldValue = $('#' + prefixes[0] + type).val().trim();
    var requestType;

    if (isEmpty(fieldValue)) {
        $('#' + prefixes[1] + type).text(errorMessages.emptyFields).css('color', '#AD3E3C');
        $('#' + prefixes[0] + type).css('border', '1px solid red');
    }
    else {
        var typeLower = type.toLowerCase();
        var data;
        switch (typeLower) {
            case 'firstname':
                requestType = 'change-user-first-name';
                data = {first_name: fieldValue};
                responseLink=document.querySelector("li[data-panel='superuserSettings']");
                break;
            case 'lastname':
                requestType = 'change-user-last-name';
                data = {last_name: fieldValue};
                responseLink=document.querySelector("li[data-panel='superuserSettings']");
                break;
            default:
                requestType = '';
                responseLink=document.querySelector("li[data-panel='superuserSettings']");
                break;
        }

        $.ajax({
            type: "POST",
            async: false,
            url: "testfile.php?action=" + requestType + "",
            data: data,
            success: function (response) {
                if(response){
                    $('#' + prefixes[0] + type).css('border', 'none').val('');
                    $('#' + prefixes[1] + type).text('');
                    alert("You have successfully save changes.");

                }
                else {
                    alert("Something went wrong, please try later.");
                }
            }
        });
        getMyData();

    }
});

//Pravljenje novog korisnika

$('body').on('click',"#addUserSubmit",function(){

        event.preventDefault();

    var data={
    first_name : $("input[name=first_name]").val(),
    last_name : $("input[name=last_name]").val(),
    email : $("input[name=email]").val(),
    username:$("input[name=username]").val(),
    password : $("input[name=pwd]").val(),
    role : $("select[name=roles]").find(":selected").val(),
    status:$("select[name=stauts]").find(":selected").val()
    };
    console.log(data);
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=add-user",
        data: data,
        success: function (response){
        }
    });
    $("#addUserModal").modal();
    users=getAll('get-all-users');
    fillWithUsers(users);
});
$("body").on("click","#saveNewCours",function(){

    event.preventDefault();
    var data={
        name:$("input[name=cours_name]").val(),
        description:$("textarea[name=cours_description]").val(),
        status:$("input[name=coursRadio]:checked").val()
    };
    console.log(data);
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=add-course",
        data: data,
        success: function (response){
            alert(response);
        }
    });
    courses=getAll('get-courses');
    fillWithCurses(courses);
    $("input[name=cours_name]").val('');
    $("textarea[name=cours_description]").val('');
});

$("body").on("click","#btnAddLessonSubmit",function(){
    event.preventDefault();

    var data={
        course_id:$("select[name=coursSelect]").find(":selected").val(),
        lesson_name:$("input[name=lessonName]").val(),
        lesson_description:$("textarea[name=lessonDescription]").val(),
        lesson_code:$("textarea[name=lessonCode]").val(),
        lesson_status:$("input[name=lessonRadio]:checked").val()
    };
        console.log(data);
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=add-new-lesson",
        data: data,
        success: function (response){
            alert(response);
            lessons=getAll('get-all-lessons');
            fillWithLessons(lessons);
        }
    });


});
$("body").on("click",".deleteEvent",function(){
    event.preventDefault();

    $thisButton=this;
    var request=$thisButton.getAttribute('data-event');
    var data={
        id:$thisButton.getAttribute('data-id')
    };
    console.log(data);
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action="+request,
        data: data,
        success: function (response){
            alert(response);
        }
    });
    courses=getAll('get-courses');
    fillWithCurses(courses);
    users=getAll('get-all-users');
    fillWithUsers(users);
    lessons=getAll('get-all-lessons');
    fillWithLessons(lessons);
});
$("body").on("click","#changePassword",function(){

        event.preventDefault();
        var oldPassword=$("input[name=superuserSettings_password]").val();
        var newPassword=$("input[name=superuserSettings_new_password]").val();

        data={
            old_password:oldPassword,
            new_password:newPassword
        };
    console.log(data);
    $.ajax({
        type: "POST",
        async: false,
        url: "testfile.php?action=change-user-password",
        data: data,
        success: function (response){
            alert(response);
        }
    });
});
$("body").on("click","#btnSaveLessonChanges",function(){

    event.preventDefault();

    data={
        id:this.getAttribute('data-id'),
        new_name:$("input[name=lessonName]").val(),
        new_status:$("input[name=lessonRadio]:checked").val(),
        new_code:$("textarea[name=lessonCode]").val(),
        new_description:$("textarea[name=lessonDescription]").val(),
        new_course_id:$("select[name=coursSelect]").find(":selected").val()
    };
    console.log(data);
    $.ajax({
        type:"POST",
        async:false,
        url:"testfile.php?action=modify-lesson",
        data:data,
        success:function(response){
            alert(response);
        }
    })
});

$("body").on("click","#submitMessage",function(){
    event.preventDefault();
    var errorField=document.getElementById('captchaError');
   if( checkForm()){
    data={
        name:$("input[name=name]").val(),
        surname:$("input[name=surname]").val(),
        email:$("input[name=email]").val(),
        subject:$("input[name=subject]").val(),
        message:$("textarea[name=message]").val(),
        captcha_code:$("input[name=captcha_code]").val()
    };

    $.ajax({
        type:"POST",
        async:false,
        url:"messageValidation.php",
        data:data,
        success:function(response){
            switch (response){
                case '0':{
                    errorField.innerText="Došlo je do greške, pokušajte kasnije";
                    break;
                }
                case '1':{
                    alert("Sve je u redu");
                    errorField.innerText="";
                    $("input[name=name]").val('');
                    $("input[name=surname]").val('');
                    $("input[name=email]").val('');
                    $("input[name=subject]").val('');
                    $("textarea[name=message]").val('');
                    $("input[name=captcha_code]").val('');

                    break;
                }
                case '2':{
                    errorField.innerText="Pogrešan kod";
                    break;
                }
            }
        }
    })
   }

});
$("body").on("click","#sendResponse",function(){

    var thisButton=this;
    var data={
        to:document.getElementById('mailDisplay').innerText,
        subject:document.getElementById('messageSubject').innerText,
        message:$("textarea[name=responseMessage]").val(),
        id:thisButton.getAttribute('data-id')
    };
    $.ajax({
        type:"POST",
        async:false,
        url:"testfile.php?action=send-message",
        data:data,
        success:function(response){
            $("textarea[name=responseMessage]").val('');
        }
    })


});
$selectState=0;
$boxState=0;
$("#allSelect").change(function(){
    var checkboxes=document.getElementsByClassName('receivedCheck');
    var i;
    if($selectState==0){
        for(i=0;i<checkboxes.length;i++){
            checkboxes[i].checked=true;
        }
        $selectState=1;
    }
        else{
        for(i=0;i<checkboxes.length;i++){
            checkboxes[i].checked=false;
        }
        $selectState=0;
      }

});
$("body").on("change","#actionDropdown",function(){

    $thisButton=this;
    var action=  $("select[name=actionDropdown]").find(":selected").val();
    var checkboxes=document.getElementsByClassName('receivedCheck');
    var ids=[];
    var request;

    if($boxState==0){
        if(action==0){
            request="delete-messages";
        }
        else{
            request="mark-as-read-message";
        }
    }
    if($boxState==1){
        request='delete-sent-messages';
    }

    for(var i=0;i<checkboxes.length;i++){

        if(checkboxes[i].checked){
            console.log(checkboxes[i]);
            var id=parseInt(checkboxes[i].getAttribute('value'));
            ids.push(id);
        }
    }
        if(!isEmpty(ids)){
        $.ajax({
            type:"POST",
            async:false,
            url:"testfile.php?action="+request,
            data:{id_array:ids},
            success:function(response){

            }
        });
        }

if($boxState==0){
    messages=getAll('get-all-messages');
    unreadMessages=0;
    fillWithMessages(messages);
    document.getElementById("allSelect").checked=false;
    $selectState=0;
    $thisButton.options[0].select=true;
    document.getElementById('actionDropdown').innerHTML=' ' +
        '<option value="2" disabled selected>Izaberi opciju</option>'+
        '<option value="0">Obriši</option>'+
        ' <option value="1">Označi kao pročitano</option>';}
    if($boxState==1){

        document.getElementById("who").innerText="Primalac";
        document.getElementById('subjectField').style.display='none';
        document.getElementById('optionMarkRead').style.display='none';
        sentMessages=getAll('get-all-sent-messages');

        fillWithSent(sentMessages);
    }

});
$("body").on("click","#inboxReceive",function(){
    messages=getAll('get-all-messages');
    unreadMessages=0;
    fillWithMessages(messages);
    document.getElementById('subjectField').innerText="Naslov";
    document.getElementById('who').innerHTML="Pošiljalac";
    document.getElementById('subjectField').style.display='table-cell';
    document.getElementById('optionMarkRead').style.display='block';
    $boxState=0;

});
$("body").on("click","#outboxSent",function(){
    $boxState=1;
    document.getElementById("who").innerText="Primalac";
        document.getElementById('subjectField').style.display='none';
        document.getElementById('optionMarkRead').style.display='none';
        sentMessages=getAll('get-all-sent-messages');

        fillWithSent(sentMessages);

});