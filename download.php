<?php

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

    header("Expires: 0");
    header("Cache-Control: no-cache");
    header("Pragma: no-cache");
    header("Content-Transfer-Encoding: binary");

    ignore_user_abort(true);
    ob_implicit_flush();

    $path = $_SERVER["DOCUMENT_ROOT"] . $_GET['path'];
    $downloadSizeLimit = 190000000; //190MB
    $files_array = glob($path . '/*.*');
    $name = basename($_GET['path']);

    define('LOG_DOWNLOADS', true);
    define('LOG_FILE', 'logs.log');

    //Files Download
    if (strpos($path, '.') !== false) {
        if (file_exists($path)) {
            header("Content-Type: application/octet-stream");
            header("Content-Disposition: attachment; filename=" . $name);
            header("Content-Length:" . filesize($path));
            readfile($path);
        }
    //Folder Files Download and Compress
    } else {
        //if Folder has Files or SIZE smaller than 190MB
        if (folderSize($files_array) > 0 && folderSize($files_array) < $downloadSizeLimit) {
            CreteArchive($files_array, $name);
            if (connection_aborted()) {
                unlink($name);
            }
            header("Content-Type: application/zip");
            header("Content-Disposition: attachment; filename=" . $name . ".zip");
            header("Content-Length:" . filesize($name));
            readfile($name);
            unlink($name);
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
        @fputs($f, "Date: " . date("m.d.Y g:ia"). "   IP: " . $ip . "   File: ".$name. "   Path: " . $_GET['path'] . "\n");
        @fclose($f);
    }
    
    die();

?>