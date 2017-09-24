/**
 * Created by milic on 24.9.2017..
 */
function setIframe(){

    var code=document.getElementById('lessonCode').value;
    var iframe=document.getElementById('iframeCode');
    document.getElementById('iframeCode').src = "data:text/html;charset=utf-8," +(code);

}

$('document').ready(
    setIframe()
);