/**
 * Created by milic on 16.9.2017..
 */

function myFunction() {
    $.ajax({
        type: "POST",
        url: "testfile.php?action=add-user",
        data: {
           first_name:'Milica',
           last_name:'Ninković',
           username:'adminNinkovic' ,
           email :'milica@milica.com' ,
           password : 'jasamcar123',
           status :1 ,
           role :1
},
    success
        :
        function(response) {

            //var data = JSON.parse(response);
            //console.log('Svi opisi aktivnih kurseva');
            //data.forEach(function (e) {
            //    console.log("opis " + e.naziv + " kursa\n" + e.opis);
            //});
            alert("gotovo " + response);
        }
})
    ;
};