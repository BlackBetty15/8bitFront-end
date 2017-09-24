/**
 * Created by milic on 16.9.2017..
 */

//function myFunction() {
//    $.ajax({
//        type: "POST",
//        url: "testfile.php?action=add-user",
//        data: {
//           first_name:'admin',
//           last_name:'admin',
//           username:'admin' ,
//           email :'admin@gmail.com' ,
//           password : 'admin',
//           status :1 ,
//           role :1
//},
//    success
//        :
//        function(response) {
//
//            //var data = JSON.parse(response);
//            //console.log('Svi opisi aktivnih kurseva');
//            //data.forEach(function (e) {
//            //    console.log("opis " + e.naziv + " kursa\n" + e.opis);
//            //});
//            alert("gotovo " + response);
//        }
//})
//    ;
//};

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
            alert(response);
        }
    });
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
    //var id= this.getAttribute('data-id');
    //var newName=$("input[name=lessonName]").val();
    //var newStatus=$("input[name=lessonRadio]:checked").val();
    //var newDescription=$("textarea[name=lessonDescription]").val();
    //var newCode=$("textarea[name=lessonCode]").val();
    //var newCourse=$("select[name=coursSelect]").find(":selected").val();



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