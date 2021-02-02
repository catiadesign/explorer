<?php

    session_start();

    include 'db.php';
   
    $email = mysqli_real_escape_string($con, $_POST['txt_email']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $sql_query = "SELECT * FROM users WHERE email='" . $email. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);
    
    $verify = password_verify($password, $row['password']);
    
    if ($row['email'] == $email && $verify && $row['active'] == 1) {
        $_SESSION['uname'] = $row['email'];
        echo 'ok';
    }
    
    if ($row['email'] != $email || $email == '') {
        echo 'Email not valid!<br />';
    }
    
    if (!$verify || $password == '') {
        echo 'Password not valid!<br />';
    }

    if ($row['email'] == $email && $verify && $row['active'] != 1) {
        echo 'User not activated!<br />';
    }
    
?>
