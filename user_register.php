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
    
    $uname = mysqli_real_escape_string($con, $_POST['txt_uname']);
    $fullname = mysqli_real_escape_string($con, $_POST['txt_fullname']);
    $email = mysqli_real_escape_string($con, $_POST['txt_email']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql_query = "SELECT * FROM users WHERE email='" . $email . "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);

    if ($uname == "" || $fullname == "" || $email == "" || $password == "") {
        echo 'Check for empty felds!<br />';
    }
    
    if (!preg_match($email_exp, $email)) {
        echo 'Email adress not valid!<br />';
    } 
    
    /*
    if ($row['username'] == $uname && $uname != "") {
        echo 'Username already exist!<br />';
    }
    */
    if ($row['email'] == $email &&  $email != "") {
        echo 'Email already exist!<br />';
    }
    if ($row['username'] != $uname && $row['email'] != $email && preg_match($email_exp, $email)) {
        $sql = "INSERT INTO users (username, fullname, email, password) VALUES ('" . $uname . "', '" . $fullname. "', '" . $email . "' , '" . $hash . "')";
        if (mysqli_query($con, $sql)) {
            $_SESSION['uname'] = $email;
            echo 'ok';
        }
        mysqli_close($con);
    }
    
?>
