<?php

    session_start();

    define('USER', 'catia_login');
    define('PASSWORD', '123456');
    define('HOST', 'localhost');
    define('DATABASE', 'catia_login');
    
    $con = mysqli_connect(HOST, USER, PASSWORD, DATABASE);

    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    } else {}  
   
    $uname = mysqli_real_escape_string($con, $_POST['txt_uname']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    //$hash = password_hash($password, PASSWORD_DEFAULT);     
    //$verify_1 = password_verify($password, $hash); 
    
    $sql_query = "SELECT * FROM users WHERE username='" . $uname. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);
    
    $verify = password_verify($password, $row['password']);
    
    if ($row['username'] === $uname && $verify) {
        $_SESSION['uname'] = $row['name'];
        echo 'true';
    } else {
        echo 'false';
    }
    
?>
