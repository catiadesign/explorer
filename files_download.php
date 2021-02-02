<?php

    define('PATH', $_SERVER["DOCUMENT_ROOT"] . $_GET['path']);
    define('FILE_NAME', basename($_GET['path']));
    define('SIZE_LIMIT', 190000000); //190MB
    define('LOG_DOWNLOADS', true);
    define('EXT_CHECK', false);
    define('LOG_FILE', 'logs.log');

    header("Expires: 0");
    header("Cache-Control: no-cache");
    header("Pragma: no-cache");
    header("Content-Transfer-Encoding: binary");

    $allowed_ext = array (
      // archives
      'zip' => 'application/zip',
    
      // documents
      'pdf' => 'application/pdf',
      'doc' => 'application/msword',
      'xls' => 'application/vnd.ms-excel',
      'ppt' => 'application/vnd.ms-powerpoint',
      
      // executables
      'exe' => 'application/octet-stream',
    
      // images
      'gif' => 'image/gif',
      'png' => 'image/png',
      'jpg' => 'image/jpeg',
      'jpeg' => 'image/jpeg',
    
      // audio
      'mp3' => 'audio/mpeg',
      'wav' => 'audio/x-wav',
    
      // video
      'mpeg' => 'video/mpeg',
      'mpg' => 'video/mpeg',
      'mpe' => 'video/mpeg',
      'mov' => 'video/quicktime',
      'avi' => 'video/x-msvideo'
    );

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

    //file extension
    $fext = strtolower(substr(strrchr(FILE_NAME, "."), 1));
    $files_array = glob(PATH . '/*.*');

    //Files Download
    if (strpos(PATH, '.') && file_exists(PATH)) {
        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment; filename=" . FILE_NAME);
        header("Content-Length:" . filesize(PATH));          
        if (EXT_CHECK) {
            if (array_key_exists($fext, $allowed_ext)) {
                readfile(PATH);
            } else {
                header("Content-Type: text/plain");
                header("Content-Disposition: attachment; filename=ReadMe.txt");
                readfile("ReadMe.txt");          
            }
        } else {
            readfile(PATH);            
        }
    }
    //Compress if Folder has Files or SIZE smaller than 190MB
    else if (folderSize($files_array) > 0 && folderSize($files_array) < SIZE_LIMIT) {
        $newName = FILE_NAME . rand();
        CreteArchive($files_array, $newName);
        header("Content-Type: application/zip");
        header("Content-Disposition: attachment; filename=" . $newName . ".zip");
        header("Content-Length:" . filesize($newName));
        readfile($newName);
        if (connection_aborted()) {unlink($newName);}
        else {unlink($newName);}
    }
    //Info Message
    else {
        header("Content-Type: text/plain");
        header("Content-Disposition: attachment; filename=ReadMe.txt");
        readfile("ReadMe.txt");
    }
    
    //log downloads
    if (!LOG_DOWNLOADS) die();
    $f = @fopen(LOG_FILE, 'a+');
    if ($f) {
        @fwrite($f, "Date: " . date("m.d.Y g:ia"). "   IP: " . $_SERVER['REMOTE_ADDR'] . "   File: ". FILE_NAME . "   Path: " . $_GET['path'] . "\n");
        @fclose($f);
    }
    
    die();

?>
