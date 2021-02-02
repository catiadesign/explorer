<?php

    session_start();
    
    include 'db.php';
    
    $uname = mysqli_real_escape_string($con, $_POST['txt_uname']);
    $fullname = mysqli_real_escape_string($con, $_POST['txt_fullname']);
    $email = mysqli_real_escape_string($con, $_POST['txt_email']);
    $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);
    
    $active = 0;
    
    $invalidusername = ["root", "su", "x"];
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql_query = "SELECT * FROM users WHERE email='" . $email . "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);

    $error_message = '';
    
    if (empty($uname) || empty($fullname) || empty($email) || empty($password)) {
        $error_message .= 'Check for empty fields!<br />';
    }
    
    if (in_array($uname, $invalidusername)) {
        $error_message .= 'Username not allowed!<br />';
    }
    
    if (!preg_match($email_exp, $email) || $row['email'] == $email) {
        $error_message .= 'Email not valid or already exist!<br />';
    }

    if (strlen($error_message) > 0) {
        echo $error_message;
    } else {
        $sql = "INSERT INTO users (active, username, fullname, email, password) VALUES ('" . $active . "', '" . $uname . "', '" . $fullname. "', '" . $email . "' , '" . $hash . "')";
        mysqli_query($con, $sql);
        mysqli_close($con);

        //Send Activation Email
        $email_to = $email;
        $email_subject = "CATIA design - User Account Activation";
    
        $email_from = 'no-replay@catiadesign.org';
        $comments = "www.catiadesign.org/explorer/user_account_activation.php?code=" . $hash;

        $email_message .= "Activation Email\n\n";
        $email_message .= "Email from: " . $email_from . "\n\n";
        $email_message .= "Activation Link: " . $comments . "\n\n";
        $email_message .= 'X-Mailer: PHP/' . phpversion();
        
        $headers = 'From: '. $email_from . "\r\n" . 'Reply-To: '. $email_from . "\r\n";
        @mail($email_to, $email_subject, $email_message, $headers);
    }
    
?>
