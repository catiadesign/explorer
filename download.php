<?php

    define('PATH', $_SERVER["DOCUMENT_ROOT"] . $_GET['path']);
    define('FILE_NAME', basename($_GET['path']));
    define('SIZE_LIMIT', 190000000); //190MB
    define('LOG_DOWNLOADS', true);
    define('LOG_FILE', 'logs.log');

    header("Expires: 0");
    header("Cache-Control: no-cache");
    header("Pragma: no-cache");
    header("Content-Transfer-Encoding: binary");

    ignore_user_abort(true);
    ob_implicit_flush();

    function folderSize($dir) {
        $size = 0;
        foreach ($dir as $file) {
            if (is_file($file)) {
                $size += filesize($file);
            }
        }
        return $size;
    }
    
    function CreteArchive($dir, $name) {
        $zip = new ZipArchive;
        $zip -> open($name, ZipArchive::CREATE|ZipArchive::OVERWRITE);
        foreach ($dir as $file) {
            if (is_file($file)) {
                $zip -> addFile($file, basename($file));
            }
        }
        $zip -> close();
        return $zip;
    }

    //Files Download
    if (strpos(PATH, '.') !== false) {
        if (file_exists(PATH)) {
            header("Content-Type: application/octet-stream");
            header("Content-Disposition: attachment; filename=" . FILE_NAME);
            header("Content-Length:" . filesize(PATH));
            readfile(PATH);
        }
    //Folder Files Download and Compress
    } else {
        //if Folder has Files or SIZE smaller than 190MB
        $files_array = glob(PATH . '/*.*');
        if (folderSize($files_array) > 0 && folderSize($files_array) < SIZE_LIMIT) {
            $newName = FILE_NAME . rand();
            CreteArchive($files_array, $newName);
            header("Content-Type: application/zip");
            header("Content-Disposition: attachment; filename=" . $newName . ".zip");
            header("Content-Length:" . filesize($newName));
            readfile($newName);
            if (connection_aborted()) {unlink($newName);}
            else {unlink($newName);}
        //if Folder has NO Files
        } else {
            header("Content-Type: text/plain");
            header("Content-Disposition: attachment; filename=ReadMe.txt");
            readfile("ReadMe.txt");
        }
    }
    
    // log downloads
    if (!LOG_DOWNLOADS) die();
    $f = @fopen(LOG_FILE, 'a+');
    if ($f) {
        @fwrite($f, "Date: " . date("m.d.Y g:ia"). "   IP: " . $_SERVER['REMOTE_ADDR'] . "   File: ". FILE_NAME . "   Path: " . $_GET['path'] . "\n");
        @fclose($f);
    }
    
    die();

?>
