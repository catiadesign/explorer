<?php

    session_start();

    define('USER', 'catia_login');
    define('PASSWORD', '123456');
    define('HOST', 'localhost');
    define('DATABASE', 'catia_login');
    
    $con = mysqli_connect(HOST, USER, PASSWORD, DATABASE);

    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
   
    $email = mysqli_real_escape_string($con, $_POST['txt_email']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $sql_query = "SELECT * FROM users WHERE email='" . $email. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);
    
    $verify = password_verify($password, $row['password']);
    
    if ($row['email'] === $email && $verify) {
        $_SESSION['uname'] = $row['email'];
        echo 'true';
    } else {
        echo 'false';
    }
    
?>
