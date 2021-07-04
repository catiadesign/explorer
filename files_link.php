<?php

    include "db.php";
    include "db_search_class.php";

    $SearchDatabase = new SearchDatabase();
    
    //Login User To Website
    if (strlen($_GET['file_link']) > 3 && strlen($_GET['file_nummer']) > 5) {
        
        $fpath = mysqli_real_escape_string($CON, $_GET['file_link']);
        $fnr = mysqli_real_escape_string($CON, $_GET['file_nummer']);
        
        $sql = "INSERT INTO download (
                    filepath,
                    filenr,
                    date) VALUES (
                    '$fpath',
                    '$fnr',
                    NOW())";
                    
        mysqli_query($CON, $sql);    
        
    }
    
    if (strlen($_GET['download']) > 5) {
        
        $fdownload = mysqli_real_escape_string($CON, $_GET['download']);
        $row = $SearchDatabase->Select('filenr', $fdownload);
        
        $PATH = $_SERVER["DOCUMENT_ROOT"] . $row['filepath'];
        $NAME = basename($PATH);
        
        if ($row['filenr'] == $fdownload) {
            header("Content-Type: application/octet-stream");
            header("Content-Disposition: attachment; filename=" . $NAME);
            header("Content-Length:" . filesize($PATH));
            readfile($PATH);
        } else {
            echo 'Link is no more valid!';
        }
    }

?>
