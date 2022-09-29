<?php
require  __DIR__."/env.php";

class Database extends Env {
    private $db_host;
    private $db_name;
    private $db_user;
    private $db_password;

    public function __construct() {
        parent::__construct();
        if (strpos($_SERVER['HTTP_HOST'], 'ma-cloud.nl')) {
            $this->db_host=$this->__getEnv('db_host_prod');$this->db_name=$this->__getEnv('db_name_prod');
            $this->db_user=$this->__getEnv('db_user_prod');$this->db_password=$this->__getEnv('db_password_prod');
        }
        else { 
            $this->db_host=$this->__getEnv('db_host_local');$this->db_name=$this->__getEnv('db_name_local');
            $this->db_user=$this->__getEnv('db_user_local');$this->db_password=$this->__getEnv('db_password_local'); 
        }
    }

    public function __showConnVars() {
        $connVars = ["host"=>$this->db_host, "name"=>$this->db_name, 
                     "user"=>$this->db_user, "pass"=>$this->db_password];
        return print_r($connVars);
    }
    
    public function __dbConnection() {
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name.';charset=UTF8',$this->db_user,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(PDOException $e){
            echo "Connection error: ".$e->getMessage(); 
            exit;
        }     
    }
}
?>