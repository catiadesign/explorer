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
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql_query = "SELECT * FROM users WHERE username='" . $uname. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);

    if ($row['username'] === $uname) {
        echo 'false';
    } else {
        $sql = "INSERT INTO users (username, name, password) VALUES ('" . $uname . "', '" . $fullname . "', '" . $hash . "')";
        if (mysqli_query($con, $sql)) {
            $_SESSION['uname'] = $fullname;
            echo 'true';
        }
        mysqli_close($con);
    }
    
?>
