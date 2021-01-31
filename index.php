<?php
    session_start();

    if (isset($_POST['but_logout'])) {
        session_destroy();
        header('Location: index.php');
        die();
    } 
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="3D Website, Analysis, Assembly, CATIA v5, Drafting, Drawings 2D 3D, GSD, Machining, Manuals, Mechanical Design, Part Design, Shape Design, Sheetmetal, Sketcher, Tutorials">
        <meta name="description" content="3D Website, CATIA v5, Tutorials, Manuals, Drawings 2D 3D, Mechanical Design, Shape Design, Analysis, Machining, Assembly, Drafting, Part Design, Sheetmetal, Sketcher, GSD">
        <title>Explorer CATIAdesign</title>
        <link id="stylesheet" href="../css/xui/grey.css" rel="stylesheet" type="text/css">
        <link href="/css/c_design_00_fonts.css" rel="stylesheet" type="text/css">
        <link href="/css/c_design_01.css" rel="stylesheet" type="text/css">
        <style>
            @keyframes axisRotate {
            	from {
            	    transform: rotateX(0deg) rotateY(0deg);
            	}
            	to {
            	    transform: rotateX(360deg) rotateY(360deg);
            	}
            }
        </style>
    </head>
    <body>
        <?php
            include 'scan.php';
            echo "<script id='varLoad'> var FILES = " . json_encode($files) . "; </script>";
        ?>
        <div class='sessionID'>
            <?php
                echo $_SESSION['uname'];
            ?>
        </div>        
        <script src="/js/xquery.js"></script>
        <script src="explorer.js"></script>
    </body>
</html>
