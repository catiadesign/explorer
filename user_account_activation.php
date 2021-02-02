<?php

    session_start();

    require_once('db.php'); 
   
    $code = $_GET['code'];
    
    $sql_query = "SELECT * FROM users WHERE password='" . $code. "'";
    $result = mysqli_query($con, $sql_query);
    $row = mysqli_fetch_array($result);
    
    if ($row['password'] == $code && $row['active'] != 1) {
        $sqlupdate = "UPDATE users SET active = 1 WHERE password ='" . $code . "'";
        mysqli_query($con, $sqlupdate);
        $_SESSION['uname'] = $row['email'];
        header('Location: index.php');
    } else {
        echo 'Account already activated! *www.catiadesign.org/explorer*';
    }
    
?>
