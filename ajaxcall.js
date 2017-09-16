/**
 * Created by milic on 16.9.2017..
 */

function myFunction() {
    $.ajax({
            type: "POST",
            url: "testfile.php?action=get-active-courses",
        //    data: {
        //        id: 1,
        //        status : 0
        //},
        success
:
    function (response) {

        var data=JSON.parse(response);
        console.log('Svi opisi aktivnih kurseva');
        data.forEach(function(e){
            console.log("opis "+ e.naziv+ " kursa\n"+ e.opis);
        });
        alert("gotovo " + response);
    }
})
    ;
};