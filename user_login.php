<?php

    session_start();

    include 'db.php';
   
    $email = mysqli_real_escape_string($con, $_POST['txt_email']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $sql_query = "SELECT * FROM users WHERE email='" . $email. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);
    
    $verify = password_verify($password, $row['password']);

    $error_message = '';
    
    if ($row['email'] != $email || empty($email)) {
        $error_message .= 'Email not valid!<br />';
    }
    
    if (!$verify || empty($password)) {
        $error_message .= 'Password not valid!<br />';
    }

    if ($row['email'] == $email && $verify && $row['active'] != 1) {
        $error_message .= 'User not activated!<br />';
    }

    if (strlen($error_message) > 0) {
        echo $error_message;
    } else {
        $_SESSION['uname'] = $row['email'];
    }
    

    
?>
