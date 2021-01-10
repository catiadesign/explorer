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
            CreteArchive($files_array, FILE_NAME);
            if (connection_aborted()) {
                unlink(FILE_NAME);
            }
            header("Content-Type: application/zip");
            header("Content-Disposition: attachment; filename=" . FILE_NAME . ".zip");
            header("Content-Length:" . filesize(FILE_NAME));
            readfile(FILE_NAME);
            unlink(FILE_NAME);
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
        $ip = $_SERVER['REMOTE_ADDR'];
        //$info = file_get_contents("http://ipinfo.io/{$ip}");
        //. "   Full info: " . $info
        @fputs($f, "Date: " . date("m.d.Y g:ia"). "   IP: " . $ip . "   File: ". FILE_NAME . "   Path: " . $_GET['path'] . "\n");
        @fclose($f);
    }
    
    die();

?>
