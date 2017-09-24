<footer>
    <nav  id="bottomNav">
        <p> Designed and developed by: &copy Milica Ninković VIŠER 2017</p>
    </nav>
</footer>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="js/methods.js"></script>
<script type="text/javascript" src="ajaxcall.js"></script>
<?php  if($_SESSION['page']=='index') {

    echo'
    <script type = "text/javascript" src = "js/loaderClient.js" ></script >
    ';
    }
    else if($_SESSION['page']=='lesson'){
        echo '<script type = "text/javascript" src = "js/lessonLoader.js" ></script >';
    }
?>
</html>