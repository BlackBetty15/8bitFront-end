<!doctype html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>Admin</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/adminpanel.css" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>

<body>

    <div class="container">

        <div class="row">
            <div class="col-xs-2 col-md-4"></div>
            <div class="col-xs-7 col-md-4 forma">

               <div id="logo"></div>

               <div class="login">

                    <form method="post" id="loginAdmin" name="adminLoginForm" action="validate.php"
                          onsubmit="return checkForm()">

                        <div class="inputPair">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <input class="inputAdmin important" type="text" id="Username"
                                   placeholder="Korisničko ime"/>
                        </div>

                        <div class="bar"></div>
                            <div class="inputPair">
                            <span class="glyphicon glyphicon-lock"></span>
                            <input class="inputAdmin important" type="password" id="Password"  placeholder="Lozinka"/>
                         </div>
                             <div class="bar"></div>
                            <div class="errorLog"> </div>
                        <div class="inputPair">
                            <input type="submit" id="Submit" value="Prijavi se"/>
                        </div>
                    </form>
               </div>
            </div>
            <div class="col-xs-2 col-md-4"></div>

         </div>

    </div>

</body>
<script type="text/javascript" src="js/methods.js"></script>
</html>