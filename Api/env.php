<?php
  class Env {
    private $defaultEnv;

    public function __construct() {
      $this->defaultEnv = [
        'db_host_local' => 'localhost',
        'db_user_local' => 'root',
        'db_password_local' => '',
        'db_name_local' => 'port.dash',

        'db_host_prod' => '127.0.0.1',
        'db_user_prod' => '',
        'db_password_prod' => '',
        'db_name_prod' => '',
    ];
    foreach ($this->defaultEnv as $key => $value) {
      putenv("$key=$value");
    }}

    public function __getEnv($key, $default = null) {
      $value = getenv($key);
      if ($value === false) {return $default;}
      return $value;
    }

    public function __setEnv($vararray) {
      foreach ($vararray as $key => $value) {
        if(!getenv($key)) {
          putenv("$key=$value");
        } else return print("The value with the key ".$key." already exists.");
      }
    }
  }
