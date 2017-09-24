/**
 * Created by milic on 24.9.2017..
 */
var roles,courses;



function listAllCourses(data){

    var masterParent=document.getElementById('courseList');

    data.forEach(function(e){
       if(e.status==1){
        var listItem=document.createElement('li');
        listItem.className='ostatak';
        var anchor=document.createElement('a');
        anchor.setAttribute('href','coursPage.php?id='+ e.id);
        anchor.innerText= e.naziv;
        listItem.appendChild(anchor);
        masterParent.appendChild(listItem);
       }
    });

}

$('document').ready(
    courses = getAll('get-courses'),
    listAllCourses(courses),
    dataLessons = getAll('get-all-lessons')
);