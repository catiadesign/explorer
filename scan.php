<?php

    //if you want to scan a folder inside public_html add it inside $scan_dir variable
    //if you want to scan whole server let the $scan_dir empty and complete the path just inside the $root_path variable
    $scan_dir1 = "_cad";
    $scan_dir2 = "_doc";
    $root_path = $_SERVER["DOCUMENT_ROOT"];
    
    //show or hide files/folders true || false
    $hidden_files_folders = false;
    $show_files = true;
    $show_folders = true;
    
    $files = array();

    function FileSizeFormat($bytes, $decimals = 1) {
        $sz = [' bytes', ' KB', ' MB', ' GB'];
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
    }

    function folderSize($dir) {
        $size = 0;
        foreach (glob(rtrim($dir, '/').'/*', GLOB_NOSORT) as $each) {
            $size += is_file($each) ? filesize($each) : folderSize($each);
        }
        return $size;
    }

    function FilesPathReplaceDoppleSlash($dir) {
        $dir = str_replace("//", "/", $dir);
        $dir = str_replace("/public_html", "", $dir);
        return $dir;
    }  

    function ReturnArrayFilesFolders($dir, $file, $ico, $color, $search) {
        $path = $dir . "/" . $file;
        $newDir = str_replace($GLOBALS['root_path'], "", $path);
        $array1 = array(
            "title" => $file,
            "ico" => $ico,
            "color" => $color,
            "search" => $search,
            "date" => date("Y-m-d H:i", filectime($path)),
        );
        if  (strpos($search, "file") !== false) {
            $array2 = array(
                "loc" => FilesPathReplaceDoppleSlash($newDir),
                "size" => FileSizeFormat(filesize($path)),    
            );
        } elseif (strpos($search, "folder") !== false) {
            $array2 = array(
                "loc" => $newDir,
                "size" => FileSizeFormat(folderSize($path)),
                "folderCount" => count(glob("$path/*", GLOB_ONLYDIR)),
                "items" => Scan($path), # Recursively get the contents of the folder
            );
        }
        return array_merge($array1, $array2);
    }

    function Scan($dir) {
        if (file_exists($dir)){
            foreach (scandir($dir) as $f) {
                $checkext = pathinfo($f);
                //Check for Hidden Files
                if (!$f || $f[0] == ".") {
                    if (strlen($f) > 2 && $GLOBALS['hidden_files_folders'] === true) {
                        if (is_dir($dir . "/" . $f)) {
                            $files[] = ReturnArrayFilesFolders($dir, $f, "ac_unit", "#ff9600", "folder");
                        } else {
                            $files[] = ReturnArrayFilesFolders($dir, $f, "ac_unit", "#ff9600", "iframe, file");
                        }
                    }
                    continue; # Ignore hidden files
                }
                //Check for Normale Files
    			if (is_dir($dir . "/" . $f) && $GLOBALS['show_folders'] === true) {
    			    $files[] = ReturnArrayFilesFolders($dir, $f, "folder", "#00d9ff", "folder");
    			} elseif ($GLOBALS['show_files'] === true) {
    			    if (in_array($checkext['extension'], ["zip", "rar", "7z", "tar", "gzip"])) {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "blur_linear", "#ff9600", "iframe, file");
    			    }
    			    elseif (in_array($checkext['extension'], ["mp4", "avi", "mpeg"])) {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "ondemand_video", "#ff0000", "video, file");
    			    }
    			    elseif ($checkext["extension"] == "swf") {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "video_call", "#ff0000", "iframe, file");
    			    }
    			    elseif ($checkext["extension"] == "pdf") {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "ico/pdf_.png", "#ffffff", "iframe, file");
    			    }
    			    elseif (in_array($checkext['extension'], ["jpg", "png", "gif"])) {
    			        $newDir = str_replace($GLOBALS['root_path'], "", $dir . "/" . $f);
    			        $files[] = ReturnArrayFilesFolders($dir, $f, FilesPathReplaceDoppleSlash($newDir), "#ffffff", "photo, file");
    			    }
    			    elseif (in_array($checkext['extension'], ["doc", "docx"])) {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "ico/doc_.png", "#ffffff", "iframe, file");
    			    }
    			    elseif (in_array($checkext['extension'], ["xls"])) {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "ico/xls_.png", "#ffffff", "iframe, file");
    			    }
    			    else {
    			        $files[] = ReturnArrayFilesFolders($dir, $f, "description", "#8700ff", "iframe, file");
    			    }
    			}
    		}
    	}
        if ($files === null) {
            return [];
        } else {
            return $files;
        }
    }
    
    //Dir 1
    $files[] = ReturnArrayFilesFolders($root_path, $scan_dir1, "folder", "#00d9ff", "folder");
    
    //Dir 2
    $files[] = ReturnArrayFilesFolders($root_path, $scan_dir2, "folder", "#00d9ff", "folder");

    //file_put_contents("folder_structure.js", "var FILES =" . json_encode( $files ));    
    //echo "<script> var FILES = " . json_encode($files) . "; </script>";
    //header("Content-type: application/json");
    //echo json_encode( $files ); 

?>
