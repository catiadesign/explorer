<?php
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    } else {
        session_start();
    }
    
    if (isset($_POST['btn_submit'])) {
        //
        define('USER', 'catia_login');
        define('PASSWORD', '123456');
        define('HOST', 'localhost');
        define('DATABASE', 'catia_login');
        
        $con = mysqli_connect(HOST, USER, PASSWORD, DATABASE);
    
        if (!$con) {
            die("Connection failed: " . mysqli_connect_error());
        } else {}        

        //
        $uname = mysqli_real_escape_string($con, $_POST['txt_uname']);
        $password = mysqli_real_escape_string($con, $_POST['txt_pwd']);        
        if ($uname !== '' && $password !== '') {
            $sql_query = "SELECT * FROM users WHERE username='" . $uname. "' AND password='" . $password . "'limit 1";
            $result = mysqli_query($con, $sql_query);
            $row = mysqli_fetch_array($result);
            $count = $row[0];
            if ($count > 0) {
                $_SESSION['uname'] = $uname;
                // Check user login or not
                if (isset($_SESSION['uname'])) {
                    header('Location: index.php');
                }
           }
        } else {
            echo 'The username or password are incorrect!';
            //echo '<script>alert("The username or password are incorrect!")</script>'; 
        }
    } else if (isset($_POST['btn_close'])) {
        header('Location: index.php');
    }
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="3D Website, Analysis, Assembly, CATIA v5, Drafting, Drawings 2D 3D, GSD, Machining, Manuals, Mechanical Design, Part Design, Shape Design, Sheetmetal, Sketcher, Tutorials">
        <meta name="description" content="3D Website, CATIA v5, Tutorials, Manuals, Drawings 2D 3D, Mechanical Design, Shape Design, Analysis, Machining, Assembly, Drafting, Part Design, Sheetmetal, Sketcher, GSD">
        <title>Explorer Login</title>
        <link id="stylesheet" href="../css/xui/grey.css" rel="stylesheet" type="text/css">
        <link href="/css/c_design_00_fonts.css" rel="stylesheet" type="text/css">
        <link href="/css/c_design_01.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class='sessionID'>
            <?php
                echo $_SESSION['uname'];
            ?>
        </div>        
        <script src="/js/xquery.js"></script>
        <script>
            _X.CreateTagElements({
                t: 'body',
                a: [
                    {
                        classAdd: 'loginForm, xui_header, xui_corner_all',
                        css: {
                            position: 'absolute',
                            width: 250,
                            left: window.innerWidth / 2 - 250 / 2,
                            top: window.innerHeight / 2 - 250 / 2,
                            'z-index': 200,
                        },
                        items: [
                            {
                                classAdd: 'xui_content, xui_corner_all',
                                css: {
                                    position: 'relative',
                                    margin: 5,
                                },
                                items: [
                                    {
                                        elem: '<h1',
                                        append: 'Login'
                                    }, {                    
                                        elem: '<form',
                                        attr: {
                                            method: 'post',
                                        },
                                        items: [
                                            {
                                                elem: '<label',
                                                attr: {
                                                    for: 'txt_uname',
                                                },
                                                append: 'Username:',
                                            }, {
                                                elem: '<br',
                                            }, {
                                                elem: '<input',
                                                attr: {
                                                    type: 'text',
                                                    maxlength: 100,
                                                    name: 'txt_uname',
                                                    id: 'txt_uname',
                                                    placeholder: 'Username!',
                                                },
                                                css: {
                                                    width: '100%',
                                                    'box-sizing': 'border-box',
                                                },
                                            }, {
                                                elem: '<br',
                                            }, {
                                                elem: '<label',
                                                attr: {
                                                    for: 'txt_pwd',
                                                },
                                                append: 'Password:',                            
                                            }, {
                                                elem: '<br',
                                            }, {
                                                elem: '<input',
                                                attr: {
                                                    type: 'password',
                                                    maxlength: 100,
                                                    name: 'txt_pwd',
                                                    id: 'txt_pwd',
                                                    placeholder: 'Password!',
                                                },
                                                css: {
                                                    width: '100%',
                                                    'box-sizing': 'border-box',
                                                },                            
                                            }, {
                                                elem: '<br',
                                            }, {
                                                elem: '<input',
                                                attr: {
                                                    type: 'submit',
                                                    value: 'Submit',
                                                    name: 'btn_submit',
                                                },
                                                css: {
                                                    width: '100%',
                                                    'box-sizing': 'border-box',
                                                },
                                            }, {
                                                elem: '<hr',
                                            },
                                        ],
                                    },
                                ],
                            },                                                                        
                        ],
                    },
                ],
            });
        </script>
    </body>
</html>
