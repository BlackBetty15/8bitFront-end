<?php

require_once 'Connection.php';


class User
{
    private $userId;
    private $userFirstName;
    private $userLastName;
    private $userUsername;
    private $userPasswordHash;
    private $userPasswordSalt;
    private $userStatus;
    private $userRole;


    public function __construct($id,$firstName,$lastName,$userName,$passwordHash,$passwordSalt,$status,$role)
    {
        $this->userId=$id;
        $this->userFirstName=$firstName;
        $this->userLastName=$lastName;
        $this->userUsername=$userName;
        $this->userPasswordHash=$passwordHash;
        $this->userPasswordSalt=$passwordSalt;
        $this->userStatus=$status;
        $this->userRole=$role;
    }

    public static function getAllUsers(){

        $qry="SELECT `id`, `ime`, `prezime`, `korisnicko_ime`, `email`, `statuts`, `role`  FROM korisnici WHERE 1";
        $response=array();
        $results=Connection::queryRequest($qry);

        if(Connection::emptyQueryResults($results)){
            while($row=$results->fetch_assoc()){
                $response[]=$row;
            }
            return $response;
        }
        else{
            return 'There is no user yet';
        }

    }
    public static function getSpecificUser($id){


        $qry="SELECT id, ime, prezime, korisnicko_ime, email, statuts, role FROM korisnici WHERE id=$id";

        $result=Connection::queryRequest($qry);

        if(Connection::emptyQueryResults($result)){
            return $result;
        }
        else{
            return 'Traženi korisnik ne postoji';
        }

    }

    public static function createUser($firstname,$lastname,$username,$password,$email,$status,$role){

        $options = [
            'cost' => 12,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];
        $passwordHash=password_hash($password, PASSWORD_BCRYPT,$options);

        $qry="INSERT INTO korisnici(ime,  prezime ,  korisnicko_ime ,  email ,  pwd_hash , statuts ,  role )
              VALUES ('".$firstname."','".$lastname."','".$username."','".$email."','".$passwordHash."', $status,
              $role )";

        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste dodali korisnika';
        }
        else{
            return 'Došlo je do greške';
        }

    }

    public static function changeFirstName($id,$firstName){
        $qry="UPDATE korisnici SET ime='".$firstName."' WHERE id=$id";

        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste promenili ime';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }
    }

    public static function changeLastName($id,$lastName){

        $qry="UPDATE korisnici SET prezime='".$lastName."' WHERE id=$id";
        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste promenili prezime';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }
    }

    private function checkPasswordMatch($id,$password){


        $qry="SELECT pwd_hash FROM korisnici WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if(!empty($result)){
        if(password_verify($password,$result)){
            return 1;
        }
        }else{
            return 0;
        }
    }

    public static function changePassword($id,$oldPassword,$newPassword){


        if(self::checkPasswordMatch($id,$oldPassword)){

            $options = [
                'cost' => 12,
                'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
            ];
            $passwordHash=password_hash($newPassword, PASSWORD_BCRYPT,$options);

            $qry="UPDATE korisnici SET pwd_hash=$passwordHash WHERE id=$id";

            $responseStatus=Connection::queryRequest($qry);
            if($responseStatus){
                return 'Uspešno ste promenili lozinku';
            }
            else{
                return 'Došlo je do greške, pokušajte kasnije';
            }
        }

        else{
            return 'Pogrešna stara lozinka';
        }

    }

    public static function changeUsersStatus($id,$status){

        $now='';
        if($status==1){
            $now='aktivirali';
        }
        else{
            $now='deaktivirali';
        }

        $qry="UPDATE korisnici SET status=$status WHERE id=$id";

        $responseStatus=Connection::queryRequest($qry);
        if($responseStatus){
            return 'Uspešno ste '.$now.' korisnika';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }

    }

    public static function changeUsersRole($id,$role){

        $qry="UPDATE korisnici SET status=$role WHERE id=$id";
        $responseStatus=Connection::queryRequest($qry);

        if($responseStatus){
            return 'Uspešno ste promenili ulogu korisnika';
        }
        else{
            return 'Došlo je do greške';
        }
    }

    public static function deleteUser($id){

        $qry="DELETE FROM korisnici WHERE id=$id";
        $responseStatus=Connection::queryRequest($qry);
        if($responseStatus){
            return 'Uspešno ste obrisali korisnika';
        }
        else{
            return 'Došlo je do greške, pokušajte kasnije';
        }
    }





    public static function getAllRoles(){
        $qry="SELECT * FROM role WHERE 1";
    }

    public static function getUserRole($id){

        $qry="SELECT naziv FROM role WHERE id=$id";
        $result=Connection::queryRequest($qry);

        if(Connection::emptyQueryResults($result)){
            return $result;
        }
        else{
            return 'Ne postoji takva rola';
        }
    }

    public static function login($username,$password){


        $options = [
            'cost' => 12,
            'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
        ];

            $psd=password_hash($password,PASSWORD_BCRYPT,$options);


            $qry="SELECT * FROM korisnici WHERE korisnicko_ime= '".$username."' AND pass= '".$psd."'";

            $results = Connection::queryRequest($qry);
            $error="Nema đokice"; /* Sredi đokicu*/

            $validacija=Connection::emptyQueryResults($results);
            if($validacija==1){

                return $results->fetch_assoc();
            }
            else
                return $error;


        }

}