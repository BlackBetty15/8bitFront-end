/**
 * Created by milic on 10.9.2017..
 */
$("body").on("click","#editFirstName",function(){
    $("#popupFirstName").toggle(300);
    var oldName=$("#superuserFN").text();
    $("#newFirstName").val(oldName);
});
$("body").on("click","#editLastName",function(){
    $("#popupLastName").toggle(300);
    var oldLastName=$("#superuserLN").text();
    $("#newLastName").val(oldLastName);
});

$("body").on("click","#cancelFirstName",function(){
    $('#newFirstName').val('').css('border','none');
    $('#errorFirstName').css('display','none');
    $('#popupFirstName').toggle(300);

});
$("body").on("click","#cancelLastName",function(){
    $('#newLastName').val('').css('border','none');
    $('#errorLastName').css('display','none');
    $('#popupLastName').toggle(300);
});
$("body").on("click","#editNewCours",function(){
   $("#coursPopup").toggle(600);
});

//Todo function when clicked on check glyphicon
//
//$("body").on("click",".saveChanges",function(){
//
//    //This thingy thing is used as a prefix for fields names
//    var prefixes=['new','error'];
//    var thisThing=this;
//    var type=$(thisThing).attr('data-type');
//    //gets new value from input field and trims empty chars from begining and end;
//    var fieldValue=$('#'+prefixes[0]+type).val().trim();
//
//    if(fieldValue===""){
//        $('#'+prefixes[1]+type).text(errorMessages.emptyFields).css('color','#AD3E3C');
//        $('#'+prefixes[0]+type).css('border','1px solid red');
//    }
//    else{
//
//        //todo ajax request and response call this:
//
//        $("#responseModal").modal();
//        $('#'+prefixes[0]+type).css('border','none').val('');
//        $('#'+prefixes[1]+type).text('');
//        responseModal("You have successfully save changes");
//    }
//
//
//    //alert("It's a save changes button!\n with prefix:"+prefixes[0]+"\n"+"And type:"+type+"\n And it's value
//    // is:"+fieldValue);
//});
//$("body").on("click","#editNewCours",function(){
//    $("#coursPopup").toggle(1500);
//
//});