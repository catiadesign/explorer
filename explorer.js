//jshint maxerr: 3000

    WIN.globalDIV = 'body';
    WIN.taskbar = '.exp_footer_middle';
    WIN.body = '.desktop_website';
    WIN.icons = '.exp_body_middle ';
    WIN.adsense = '../pages/adsense_vertical_120x600.html';

    SETTINGS.effect.sel = 'drop_top';
    SETTINGS.theme.sel = 'grey';

    SETTINGS.threeDicon = {
        def: false,
        sel: false,
        array: [true, false],
        title: '3D Icon:',
        tooltip: '3D Icon Style',
    };

    SETTINGS.viewStyle = {
        def: 'list',
        sel: 'list',
        array: ['icons', 'list'],
        title: 'View Style:',
        tooltip: 'View Style',
    };

    var HeaderHeight = 81;
    var FooterHeight = 20;
    var BodyLeftWidth = 200;
    var BodyMiddleWidthResize = 7;
    var BodyRightWidth = 120;
    
    var SEARCHEXP = [];
    var FILES = FILES;
    var sessionID = sessionID;
    
    //console.log(sessionID);
    
    _X('#varLoad, #sessionID').Xremove();
    
    DefaultSearchLocation = [
        {
            search: 'rc6 rc7 rc8',
            title: 'Download',
            ico: 'cloud_download',
            init: function() {
                var obj = SELECTED.obj;
                var id = _X.ClassVirtual();
                var str = 'files_download.php?path=' + obj.loc;
                _X('<a')
                    .appendTo('body')
                    .classAdd(id.replace('.', ''))
                    .attr({
                        href: str,
                        //target: '_blank',
                    });
                _X(id)[0].click();
                _X(id).Xremove();
            },
        }, {
            search: 'rc6',
            title: 'Link',
            ico: 'link',
            init: function() {
                var obj = SELECTED.obj;
                var x = new _X.Window();
                x.init({
                    windowType: x.type[2],
                    width: 300,
                    height: 'auto',
                });
                x.right.init(function(that) {
                    var rand = Math.floor(Math.random() * 1000000000);
                    var cls = _X.ClassVirtual();
                    
                    var link = 'files_link.php?file_link=' + obj.loc + '&file_nummer=' + rand;
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', link, true);
                    xhr.send();
                    xhr.onload = function() {
                        if (this.readyState !== 4 || this.status !== 200) return;
                    };
                    
                    _X('<div')
                        .appendTo(that)
                        .css({
                            'text-align': 'center',
                            padding: 5,
                        })
                        .append('24 Hours Link !');
                    _X('<div')
                        .appendTo(that)
                        .css({
                            padding: 5,
                        })
                        .init(function(that) {
                            _X('<input')
                                .appendTo(that)
                                .classAdd(cls.replace('.', ''))
                                .attr({
                                    type: 'text',
                                    maxlength: 200,
                                    value: 'http://www.catiadesign.org/explorer/files_link.php?download=' + rand,
                                })
                                .css({
                                    width: '100%',
                                    'box-sizing': 'border-box',
                                });                            
                        });
                    _X('<div')
                        .appendTo(that)
                        .css({
                            padding: 5,
                        })
                        .init(function(that) {                        
                            _X('<button')
                                .appendTo(that)
                                .attr({
                                    type: 'button',
                                })
                                .css({
                                    width: '100%',
                                    'text-align': 'center',
                                })
                                .append('Copy Link')
                                .on({
                                    click: function() {
                                        var copyText = _X(cls)[0];
                                        copyText.select();
                                        copyText.setSelectionRange(0, 99999);
                                        document.execCommand("copy");
                                        //console.log(copyText.value);
                                    },
                                });
                        });
                });
            },
        }, {
            search: 'rc6 rc7',
            title: 'View Code',
            ico: 'chrome_reader_mode',
            loc: '',
            init: function() {
                var obj = SELECTED.obj;
                var x = new _X.Window();
                x.init({
                    scroll: 'hidden',
                });
                _X('<iframe')
                    .appendTo(x.right)
                    .attr({src: '/ace/index.php?path=' + obj.loc})
                    .css({width: '100%', height: '100%'});
            },
        }, {
            search: 'rc6 rc7',
            title: 'Open',
            ico: 'open_in_new',
            init: function() {
                SELECTED.obj.init();
            }, 
            
        },
    ];

    //Load Grafik
    (function() {
        var Radius = 70;
        _X('<div')
            .appendTo('body')
            .classAdd('body_load')
            .css({
                position: 'absolute',
                'z-index': 2000,
                left: window.innerWidth / 2 - Radius / 2,
                top: window.innerHeight / 2 - Radius / 2,
                width: Radius,
                height: Radius,
                'border-radius': '50%',
                animation: 'website_circle_load 2s linear infinite',
            })
            .init(function(that) {
                _X('<div')
                    .appendTo(that)
                    .css({
                        position: 'absolute',
                        left: Radius / 2,
                        top: Radius / 2,
                        width: Radius / 3,
                        height: Radius / 3,
                        animation: 'website_circle_load 1s linear infinite',
                        'background-image': 'linear-gradient(red, yellow)',
                        'border-radius': '50%',
                    });
                _X('<div')
                    .appendTo(that)    
                    .css({
                        position: 'absolute',
                        left: Radius / 2,
                        top: Radius / 2,
                        width: Radius / 3,
                        height: Radius / Radius,
                        animation: 'website_circle_load 1s linear infinite',
                    })
                    .init(function(that) {
                        _X('<div')
                            .appendTo(that)
                            .css({
                                width: Radius / 3,
                                height: Radius / 3,
                                'background-image': 'linear-gradient(red, yellow)',
                                'border-radius': '50%',
                            });
                    });
                _X('<div')
                    .appendTo(that)
                    .css({
                        position: 'absolute',
                        left: Radius / 2,
                        top: Radius / 2,
                        width: Radius / Radius,
                        height: Radius / 3,
                        animation: 'website_circle_load 1s linear infinite',
                    })
                    .init(function(that) {
                        _X('<div')
                            .appendTo(that)
                            .css({
                                width: Radius / 3,
                                height: Radius / 3,
                                'background-image': 'linear-gradient(red, yellow)',
                                'border-radius': '50%',
                            });
                    });
            });
    })();

    function LogoutForm(that) {
        _X.CreateTagElements({
            t: that,
            a: [
                {
                    append: 'Hi ' + sessionID + ' ',
                    css: {
                        padding: 1,
                        margin: 1,
                        float: 'left',  
                    },
                }, {
                    classAdd: 'xui_corner_all, xui_content',
                    append: 'Logout',
                    css: {
                        width: 100,
                        padding: 1,
                        margin: 1,
                        'box-sizing': 'border-box',
                        float: 'left',  
                        'text-align': 'center',
                        cursor: 'pointer',
                    },
                    on: {
                        mouseenter: function() {
                            _X(this).classAdd('xui_hover').css({color: 'red'});
                        },
                        mouseleave: function() {
                            _X(this).classRemove('xui_hover').css({color: ''});
                        },
                        click: function() {
                            window.location = 'user_logout.php';
                        },
                    },
                },
            ],
        });
    }

    function SettingsForm(that) {
        var x = new _X.Window();
        SELECTED.obj = {title: 'User Settings', ico: 'mood'};
        x.init({
            windowType: x.type[2],
            width: 300,
            height: 'auto',
            clasa: 'settings_window',
        });
        _X.CreateTagElements({
            t: _X('.settings_window').Xfind('.body_right'),
            a: [
                {
                    classAdd: 'xui_header, xui_corner_all',
                    css: {
                        padding: 15,
                    },
                    items: [
                        {
                            classAdd: 'xui_corner_all',
                            css: {
                                position: 'relative',
                            },
                            items: [
                                {
                                    elem: '<h1',
                                    append: 'User Settings'
                                }, {
                                    elem: '<form',
                                    attr: {
                                        method: 'post',
                                        name: 'settings_form',
                                    },
                                    items: [
                                        //Username
                                        {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_uname',
                                            },
                                            append: 'Username:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_uname',
                                                id: 'txt_uname',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Full name
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_fullname',
                                            },
                                            append: 'Full Name:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_fullname',
                                                id: 'txt_fullname',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Email
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_email',
                                            },
                                            append: 'Email:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_email',
                                                id: 'txt_email',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Old Password
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_old_pwd',
                                            },
                                            append: 'Old Password:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'password',
                                                maxlength: 100,
                                                name: 'txt_old_pwd',
                                                id: 'txt_old_pwd',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //New Password
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_new_pwd',
                                            },
                                            append: 'New Password:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'password',
                                                maxlength: 100,
                                                name: 'txt_new_pwd',
                                                id: 'txt_new_pwd',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Update Button
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'submit',
                                                value: 'Update',
                                                name: 'btn_update',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                            on: {
                                                click: function(e) {
                                                    e.preventDefault();
                                                    _X('.error_message').Xempty();
                                                    var form = document.forms.namedItem('settings_form');
                                                    var data = new FormData(form);
                                                    _X.XReadAjax({
                                                        method: 'POST',
                                                        url: 'user_register.php',
                                                        callback: function() {
                                                            var r = this.response;
                                                            //console.log(r);
                                                            if (r.length > 0) {
                                                                _X('.error_message').append(r);
                                                            } else {
                                                                _X('.error_message').append('Update Successful!'); 
                                                                location.reload(true);
                                                            }
                                                        },
                                                        send: data,
                                                    });
                                                },
                                            },
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'submit',
                                                value: 'Delete Account',
                                                name: 'btn_delete',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                            on: {
                                                click: function(e) {
                                                    e.preventDefault();
                                                    _X('.error_message').Xempty();
                                                    var form = document.forms.namedItem('settings_form');
                                                    var data = new FormData(form);
                                                    _X.XReadAjax({
                                                        method: 'POST',
                                                        url: 'user_delete.php',
                                                        callback: function() {
                                                            var r = this.response;
                                                            //console.log(r);
                                                            if (r.length > 0) {
                                                                _X('.error_message').append(r);
                                                            } else {
                                                                //location.reload(true);
                                                                window.location = 'user_delete.php';
                                                            }
                                                        },
                                                        send: data,
                                                    });
                                                },
                                            },
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            classAdd: 'error_message',
                                            css: {
                                                'text-align': 'center',
                                            },
                                        }
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    function RegisterForm() {
        _X('.login_form').Xremove();
        _X.CreateTagElements({
            t: _X('.login_window').Xfind('.body_right'),
            a: [
                {
                    classAdd: 'xui_header, xui_corner_all',
                    css: {
                        padding: 15,
                    },
                    items: [
                        {
                            classAdd: 'xui_corner_all',
                            css: {
                                position: 'relative',
                            },
                            items: [
                                {
                                    elem: '<h1',
                                    append: 'User Registration',
                                }, {
                                    elem: '<form',
                                    attr: {
                                        method: 'post',
                                        name: 'register_form',
                                    },
                                    items: [
                                        //Username
                                        {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_uname',
                                            },
                                            append: 'Username:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_uname',
                                                id: 'txt_uname',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Full name
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_fullname',
                                            },
                                            append: 'Full Name:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_fullname',
                                                id: 'txt_fullname',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Email
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_email',
                                            },
                                            append: 'Email:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_email',
                                                id: 'txt_email',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Password
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_pwd',
                                            },
                                            append: 'Password:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'password',
                                                maxlength: 100,
                                                name: 'txt_pwd',
                                                id: 'txt_pwd',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Password 2
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_pwd2',
                                            },
                                            append: 'Retype Password:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'password',
                                                maxlength: 100,
                                                name: 'txt_pwd2',
                                                id: 'txt_pwd2',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        //Submit Button
                                        }, {
                                            elem: '<hr',
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
                                            on: {
                                                click: function(e) {
                                                    e.preventDefault();
                                                    _X('.error_message').Xempty();
                                                    var form = document.forms.namedItem('register_form');
                                                    var data = new FormData(form);
                                                    _X.XReadAjax({
                                                        method: 'POST',
                                                        url: 'user_register.php',
                                                        callback: function() {
                                                            var r = this.response;
                                                            //console.log(r);
                                                            if (r.length > 0) {
                                                                _X('.error_message').append(r);
                                                            } else {
                                                                _X('.error_message').append('User Successful Created!'); 
                                                                location.reload(true);
                                                            }
                                                        },
                                                        send: data,
                                                    });
                                                },
                                            },
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            classAdd: 'error_message',
                                            css: {
                                                'text-align': 'center',
                                            },
                                        }
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    function LoginForm() {
        var x = new _X.Window();
        SELECTED.obj = {title: 'Login', ico: 'mood'};
        x.init({
            windowType: x.type[2],
            width: 300,
            height: 'auto',
            clasa: 'login_window',
        });
        /*
        var r = new XMLHttpRequest();
        r.open('GET', 'user_login.php', true);
        r.responseType = 'text';
        r.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                x.right[0].innerHTML = r.response;
            }
        }; 
        r.send(null);
        */
        _X.CreateTagElements({
            t: x.right,
            a: [
                {
                    classAdd: 'login_form, xui_header, xui_corner_all',
                    css: {
                        padding: 15,
                    },
                    items: [
                        {
                            classAdd: 'xui_corner_all',
                            css: {
                                position: 'relative',
                            },
                            items: [
                                {
                                    elem: '<h1',
                                    append: 'Login'
                                }, {
                                    elem: '<form',
                                    attr: {
                                        method: 'post',
                                        name: 'login_form',
                                        //onsubmit: 'return ajaxcall()',
                                    },
                                    items: [
                                        {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_email',
                                            },
                                            append: 'Email:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'text',
                                                maxlength: 100,
                                                name: 'txt_email',
                                                id: 'txt_email',
                                                //placeholder: 'Email!',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        }, {
                                            elem: '<label',
                                            attr: {
                                                for: 'txt_pwd',
                                            },
                                            append: 'Password:',
                                        }, {
                                            elem: '<input',
                                            attr: {
                                                type: 'password',
                                                maxlength: 100,
                                                name: 'txt_pwd',
                                                id: 'txt_pwd',
                                                //placeholder: 'Password!',
                                            },
                                            css: {
                                                width: '100%',
                                                'box-sizing': 'border-box',
                                            },
                                        }, {
                                            elem: '<hr',
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
                                            on: {
                                                click: function(e) {
                                                    e.preventDefault();
                                                    _X('.error_message').Xempty();
                                                    var form = document.forms.namedItem("login_form");
                                                    var data = new FormData(form);
                                                    _X.XReadAjax({
                                                        method: 'POST',
                                                        url: 'user_login.php',
                                                        callback: function() {
                                                            var r = this.response;
                                                            //console.log(r);
                                                            if (r.length > 0) {
                                                                _X('.error_message').append(r);
                                                            } else {
                                                                _X('.error_message').append('Login Successed!'); 
                                                                //window.location = 'index.php?login=' + r;
                                                                //location.reload(true);
                                                                window.location = 'index.php';
                                                            }
                                                        },
                                                        send: data,
                                                    });
                                                },
                                            },
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            append: "Don't have an account? ",
                                            css: {
                                                display: 'inline',
                                            },
                                        }, {
                                            elem: '<a',
                                            attr: {
                                                href: '#',
                                            },
                                            append: 'Register Now!',
                                            on: {
                                                click: function() {
                                                    RegisterForm();
                                                },
                                            },
                                        }, {
                                            elem: '<hr',
                                        }, {
                                            classAdd: 'error_message',
                                            css: {
                                                'text-align': 'center',
                                            },
                                        }
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    //Create Website Base Grafik
    _X('<div')
        .appendTo('body')
        .classAdd('desktop_website')
        .css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: 0,
            overflow: 'hidden',
            'z-index': 99,
        })     
        .init(function(that) {
            //Header
            _X('<div')
                .appendTo(that)
                .classAdd('xui_content, exp_header')
                .css({
                    position: 'relative',
                    height: HeaderHeight,
                    border: '0px solid transparent',
                })     
                .init(function(that) {
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_header_1')
                        .css({
                            position: 'relative',
                            height: 25,
                            overflow: 'hidden',
                        })     
                        .init(function(that) {
                            if (sessionID === undefined || sessionID === '') {
                                _X('<div')
                                    .appendTo(that)
                                    .classAdd('xui_corner_all, xui_content')
                                    .css({
                                        width: 100,
                                        padding: 1,
                                        margin: 1,
                                        'box-sizing': 'border-box',
                                        'text-align': 'center',
                                        cursor: 'pointer',
                                    })
                                    .append('Login')
                                    .on({
                                        mouseenter: function() {
                                            _X(this).classAdd('xui_hover').css({color: 'red'});
                                        },
                                        mouseleave: function() {
                                            _X(this).classRemove('xui_hover').css({color: ''});
                                        },
                                        click: function() {
                                            if (_X('.thiswindow').classBool('login_window') === false) {
                                                LoginForm();
                                            }
                                        },
                                    });
                            } else {
                                LogoutForm(that);
                                _X('<div')
                                    .appendTo(that)
                                    .classAdd('xui_corner_all, xui_content')
                                    .css({
                                        width: 100,
                                        padding: 1,
                                        margin: 1,
                                        'box-sizing': 'border-box',
                                        float: 'left',  
                                        'text-align': 'center',
                                        cursor: 'pointer',
                                    })
                                    .append('Settings')
                                    .on({
                                        mouseenter: function() {
                                            _X(this).classAdd('xui_hover').css({color: 'red'});
                                        },
                                        mouseleave: function() {
                                            _X(this).classRemove('xui_hover').css({color: ''});
                                        },
                                        click: function() {
                                            if (_X('.thiswindow').classBool('settings_window') === false) {
                                                SettingsForm();
                                            }
                                        },
                                    });
                            }
                    });
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_header_2')
                        .css({
                            position: 'relative',
                            height: 30,
                            overflow: 'hidden',
                        })     
                        .init(function(that) {
                            var x = new ExplorerDisplay();
                            x.SettingsSelectList({to: that, mod: SETTINGS.theme});
                            x.SettingsSelectList({to: that, mod: SETTINGS.effect});
                            x.SettingsSelectList({to: that, mod: SETTINGS.autosearch});
                            x.SettingsSelectList({to: that, mod: SETTINGS.searchlimit});
                            x.SettingsSelectList({to: that, mod: SETTINGS.threeDicon});
                            x.SettingsSelectList({to: that, mod: SETTINGS.viewStyle});
                        });
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_header_3')
                        .css({
                            position: 'relative',
                            height: 25,
                        })     
                        .init(function(that) {
                            _X('<div')
                                .appendTo(that)
                                .classAdd('exp_header_3_left')
                                .css({
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 200,
                                })     
                                .init(function(that) {
                                    var a = [
                                        {
                                            left: 0,
                                            tooltip: 'Full Collapse',
                                            ico: 'navigate_before',
                                            init: function() {
                                                var temp = _X('.tree_name')
                                                    .classHave('xui_highlight')
                                                    .parent('.tree_body')
                                                    .Xfind('children')
                                                    .Xfind('.tree_collapse');
                                                _X.Xeach(temp, function(k, v) {
                                                    if (_X(v).Xfind('i').txt() === 'remove') {
                                                        v.click();
                                                    }
                                                });
                                            },
                                        }, {
                                            left: 40,
                                            tooltip: 'Collapse First Level',
                                            ico: 'keyboard_arrow_up',
                                            init: function() {
                                                var temp = _X('.tree_name')
                                                    .classHave('xui_highlight')
                                                    .parent('.tree_body')
                                                    .Xfind('children')
                                                    .classHave('tree_body')
                                                    .Xfind('children')
                                                    .classHave('tree_info')
                                                    .Xfind('.tree_collapse');
                                                _X.Xeach(temp, function(k, v) {
                                                    if (_X(v).Xfind('i').txt() === 'remove') {
                                                        v.click();
                                                    }
                                                });
                                            },
                                        }, {
                                            left: 80,
                                            tooltip: 'Full Expand',
                                            ico: 'navigate_next',
                                            init: function() {
                                                var temp = _X('.tree_name')
                                                    .classHave('xui_highlight')
                                                    .parent('.tree_body')
                                                    .Xfind('children')
                                                    .Xfind('.tree_collapse');
                                                _X.Xeach(temp, function(k, v) {
                                                    if (_X(v).Xfind('i').txt() === 'add') {
                                                        v.click();
                                                    }
                                                });
                                            },
                                        }, {
                                            left: 120,
                                            tooltip: 'Expand First Level',
                                            ico: 'keyboard_arrow_down',
                                            init: function() {
                                                if (_X('.tree_name').classHave('xui_highlight').parent('.tree_body').Xfind('children').classHave('tree_body').cssBool(['display', 'none']) === true) {
                                                    var temp = _X('.tree_name')
                                                        .classHave('xui_highlight')
                                                        .parent('.tree_body')
                                                        .Xfind('children')
                                                        .classHave('tree_body')
                                                        .Xfind('children')
                                                        .classHave('tree_info')
                                                        .Xfind('.tree_collapse');
                                                    _X.Xeach(temp, function(k, v) {
                                                        if (_X(v).Xfind('i').txt() === 'remove') {
                                                            v.click();
                                                        }
                                                    });
                                                    _X('.tree_name').classHave('xui_highlight').parent().Xfind('.tree_collapse')[0].click();
                                                }
                                            }
                                        },
                                    ];
                                    _X.Xeach(a, function(k, v) {
                                        _X('<div')
                                            .appendTo(that)
                                            .classAdd('xui_corner_all')
                                            .css({
                                                position: 'absolute',
                                                left: v.left,
                                                top: 0,
                                                bottom: 0,
                                                cursor: 'pointer',
                                            })
                                            .iconAdd({ico: v.ico, color: '#d6d6d6', size: 40, css: {'margin-top': -8}})
                                            .on({
                                                mouseenter: function() {
                                                    _X(this).classAdd('xui_hover');
                                                    _X.AddTooltip({title: v.tooltip});
                                                },
                                                mouseleave: function() {
                                                    _X(this).classRemove('xui_hover');
                                                    _X('.tooltip_class').Xremove();
                                                },
                                                click: function() {
                                                    v.init();
                                                },
                                            });
                                    });
                                });
                            _X('<div')
                                .appendTo(that)
                                .classAdd('exp_header_3_middle')
                                .css({
                                    position: 'absolute',
                                    left: 170,
                                    right: 200,
                                    top: 0,
                                    bottom: 0,
                                });
                            _X('<div')
                                .appendTo(that)
                                .classAdd('exp_header_3_right')
                                .css({
                                    position: 'absolute',
                                    width: 200,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                })     
                                .init(function(that) {
                                    var x = new ExplorerDisplay();
                                    x.SearchFilesFolders();
                                });
                        });
                });
            //Body
            _X('<div')
                .appendTo(that)
                .classAdd('exp_body')
                .css({
                    position: 'relative',
                    height: 'calc(100% - ' + (HeaderHeight + FooterHeight) + 'px)',
                    border: '0px solid transparent',
                })     
                .init(function(that) {
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_body_left, xui_content')
                        .css({
                            position: 'absolute',
                            width: BodyLeftWidth,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            overflow: 'auto',
                            border: '0px solid transparent',
                        });
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_body_resize, xui_header, xui_corner_all')
                        .css({
                            position: 'absolute',
                            left: BodyLeftWidth,
                            width: BodyMiddleWidthResize,
                            top: 0,
                            bottom: 0,
                            cursor: 'pointer',
                        })
                        .on({
                            mousedown: function(e) {
                                if (e.which === 1) {
                                    var xd = e.pageX;
                                    var widthLeft = _X('.exp_body_left').position('width', 'offset');
                                    var left = _X('.exp_body_resize').position('left', 'offset');
                                    var mousemove = function(e) {
                                        if (e.pageX > 50 && e.pageX < window.innerWidth - 50) {
                                            _X('.exp_body_left').css({width: widthLeft + (e.pageX - xd)});
                                            _X('.exp_body_resize').css({left: left + (e.pageX - xd)});
                                            _X('.exp_body_middle').css({left: left + BodyMiddleWidthResize + 2 + (e.pageX - xd)});
                                        } else {}
                                        var x = new ExplorerDisplay();
                                        x.ListStyleResize();
                                    };
                                    var mouseup = function() {
                                        _X(window).off({mouseup: mouseup, mousemove: mousemove});
                                    };
                                    _X(window).on({mousemove: mousemove, mouseup: mouseup});
                                } else {}
                            },
                            mouseenter: function() {
                                _X(this).classAdd('xui_hover');
                            },
                            mouseleave: function() {
                                _X(this).classRemove('xui_hover');
                            },
                            dblclick: function() {
                                if (_X('.exp_body_left').css('width') > 10) {
                                    _X('.exp_body_left').css({width: 0});
                                    _X('.exp_body_resize').css({left: 0});
                                    _X('.exp_body_middle').css({left: BodyMiddleWidthResize});
                                } else {
                                    _X('.exp_body_left').css({width: BodyLeftWidth});
                                    _X('.exp_body_resize').css({left: BodyLeftWidth, width: BodyMiddleWidthResize});
                                    _X('.exp_body_middle').css({left: BodyLeftWidth + BodyMiddleWidthResize + 2});
                                }
                                var x = new ExplorerDisplay();
                                x.ListStyleResize();
                            },
                        });
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_body_middle, xui_content')
                        .css({
                            position: 'absolute',
                            left: BodyLeftWidth + BodyMiddleWidthResize + 2,
                            top: 0,
                            right: BodyRightWidth,
                            bottom: 0,
                            'overflow-x': 'hidden',
                            'overflow-y': 'auto',
                            border: '0px solid transparent',
                        })
                        .on({
                            mousedown: function(e) {
                                if (e.which === 1 && SETTINGS.viewStyle.sel == 'icons') {
                                    var y = new _X.IconsMoveSelect();
                                    y.init();
                                }
                            },
                            scroll: function() {
                                var x = new ExplorerDisplay();
                                var elem = _X('.exp_body_middle').Xfind('.xcube').length;
                                if (_X(this)[0].scrollTop + _X(this).position('height', 'offset') >= _X(this)[0].scrollHeight) {
                                    var newlimit = elem + SETTINGS.searchlimit.sel;
                                    //console.log(elem, newlimit);
                                    if (SEARCHEXP.length > 0) {
                                        x.GetFilesFolders({array: SEARCHEXP.slice(elem, newlimit), defaultEmpty: false});
                                    }
                                    x.FooterInformation();
                                }
                            },
                        });
                    _X('<div')
                        .appendTo(that)  
                        .classAdd('exp_body_right, xui_default')
                        .css({
                            position: 'absolute',
                            width: BodyRightWidth,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            'overflow-x': 'hidden',
                            'overflow-y': 'auto',
                            border: '0px solid transparent',
                        })
                        .init(function(that) {
                            _X('<div')
                                .appendTo(that)  
                                .classAdd('exp_body_right_resize, xui_header, xui_corner_all')
                                .css({
                                    position: 'absolute',
                                    width: 7,
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    cursor: 'pointer',
                                })
                                .on({
                                    mouseenter: function() {
                                        _X(this).classAdd('xui_hover');
                                    },
                                    mouseleave: function() {
                                        _X(this).classRemove('xui_hover');
                                    },
                                    click: function() {
                                        if (_X('.exp_body_right').css('width') > 10) {
                                            _X('.exp_body_right').css({width: 10});
                                            _X(this).parent().Xfind('.exp_body_right_element').Xhide();
                                            _X('.exp_body_middle').css({right: 10});
                                        } else {
                                            _X('.exp_body_right').css({width: BodyRightWidth});
                                            _X(this).parent().Xfind('.exp_body_right_element').Xshow();
                                            _X('.exp_body_middle').css({right: BodyRightWidth});
                                        }
                                        var x = new ExplorerDisplay();
                                        x.ListStyleResize();
                                    },
                                });
                            _X('<div')
                                .appendTo(that)  
                                .classAdd('exp_body_right_element, xui_corner_all')
                                .css({
                                    position: 'absolute',
                                    left: 10,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                })
                                .init(function(that) {
                                    _X('<div')
                                        .appendTo(that)  
                                        .classAdd('exp_body_right_element_top, xui_corner_all')
                                        .css({
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 200,
                                        });
                                    _X('<div')
                                        .appendTo(that)  
                                        .classAdd('exp_body_right_element_bottom, xui_corner_all')
                                        .css({
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            height: 200,
                                            bottom: 0,
                                        });
                                });
                        });
                });
            //Footer
            _X('<div')
                .appendTo(that)
                .classAdd('xui_content, exp_footer')
                .css({
                    position: 'relative',
                    height: FooterHeight,
                    border: '0px solid transparent',
                })
                .init(function(that) {
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_footer_left')
                        .css({
                            float: 'left',
                            width: 350,
                        });
                    _X('<div')
                        .appendTo(that)
                        .classAdd('exp_footer_middle')
                        .css({
                            position: 'absolute',
                            left: 350,
                            right: 100,
                            top: -10,
                        });                        
                    _X('<div')
                        .appendTo(that)
                        .css({
                            float: 'right',
                            width: 100,
                        })
                        .init(function(that) {
                            _X('<div')
                                .appendTo(that)
                                .css({
                                    'text-align': 'right',
                                    'font-size': 10,
                                    'padding': 3,
                                    color: '#969696',
                                })                            
                                .append('design by Adrian');
                        });
                });
        });

    _X.prototype.ListMenuStyle = function(options) {
        var self = this;
        var defaults = {
            array: [],
            pushObj: true,
            pushItem: true,
            menuRC: false,
            icoSize: 30,
            click: 'dblclick',
            clasa: '',
            css: {},
            on: {},
        };
        var s = _X.JoinObj(defaults, options);
        _X.Xeach(s.array, function(k, v) {
            _X('<div')
                .appendTo(self)
                .classAdd('xcube, xui_corner_all')
                .classAdd(s.clasa)
                .css(s.css)
                .css({
                    'white-space': 'nowrap',
                    overflow: 'hidden',
                    margin: 3,
                    border: '1px solid transparent',
                    height: 30,
                    cursor: 'pointer',
                })
                .on(s.on)
                .on([s.click, function() {
                    v.init();
                }])
                .on({
                    mouseenter: function() {
                        if (_X('body').classBool('mousedown_true') === false) {
                            _X(this)
                                .classAdd('xui_hover')
                                .css({'box-shadow': 'rgb(51, 51, 51) 1px 1px 2px'});
                        }
                    },
                    mouseleave: function() {
                        _X(this)
                            .classRemove('xui_hover')
                            .css({'box-shadow': ''});
                    },
                    mousedown: function() {
                        _X.ReturnElements({item: this, obj: v, pushItem: s.pushItem, pushObj: s.pushObj});
                        _X('.xcube').classRemove('xui_active');
                        _X(this).classAdd('xui_active');
                    },
                    contextmenu: function(e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        if (s.menuRC !== false) {
                            var x = new _X.Window();
                            x.init({
                                windowType: x.type[3],
                                fontSize: 13,
                                width: 115,
                                height: 'auto',
                                open: false,
                                clasa: 'remove_on_mousedown',
                            });
                            x.right.MenuElements({
                                array: s.menuRC,
                                pushObj: false,
                                pushItem: false,
                                icoSize: 25,
                                click: 'mousedown',
                                color: false,
                            });
                            x.win.OpenWindow();
                            WIN.full.splice(WIN.key, 1);
                        } else {}
                    }
                })
                .init(function(that) {
                    //Icon & Title
                    _X('<div')
                        .appendTo(that)
                        .iconAdd({ico: v.ico, color: v.color, size: s.icoSize})
                        .append('&nbsp' + v.title)
                        .classAdd('format_text, xcube_title')
                        .css({
                            display: 'inline-block',
                            'text-align': 'left',
                            'vertical-align': 'middle',
                        });
                    //Date
                    _X('<div')
                        .appendTo(that)
                        .append(v.date)
                        .classAdd('format_text, xcube_date')
                        .css({
                            display: 'inline-block',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                            color: '#969696',
                        });
                    //Location
                    _X('<div')
                        .appendTo(that)
                        .append(v.loc)
                        .classAdd('format_text, xcube_loc')
                        .css({
                            display: 'inline-block',
                            'text-align': 'left',
                            'vertical-align': 'middle',
                            color: '#969696',
                        });
                    //Size
                    _X('<div')
                        .appendTo(that)
                        .append(v.size + '&nbsp')
                        .classAdd('format_text, xcube_size')
                        .css({
                            display: 'inline-block',
                            'text-align': 'right',
                            'vertical-align': 'middle',
                            color: '#969696',
                        });
                });
        });
        //_X(self).Xfind('.xcube ').Xfind('children').css({width: (_X(self).position('width', 'scroll') - 8) / 4});        
    };

    function ExplorerDisplay() {
        var that = this;
        var self = this;
        this.SettingsSelectList = function(options) {
            var that = this;
            var defaults = {
                to: '',
                mod: '',
            };
            var settings = _X.JoinObj(defaults, options);
            var cls = _X.ClassVirtual();
            _X('<select')
                .appendTo(_X(settings.to))
                .classAdd(cls.replace('.', ''))
                .classAdd('xui_content, xui_corner_all')
                .css({
                    width: window.innerWidth / 6,
                    height: 28,
                    display: 'inline',
                    border: '1px solid transparent',
                    'box-shadow': '-1px 1px 2px #333',
                })
                .on({
                    change: function() {
                        var selected = _X(cls).Xval();
                        settings.mod.sel = selected;
                        if (settings.mod == SETTINGS.theme) {
                            _X('#stylesheet').attr({href: '../css/xui/' + selected + '.css'});
                        } else {}
                        if (settings.mod == SETTINGS.viewStyle) {
                            that.GetFilesFolders();
                            _X('.folder_path').Xfind('children').classHave('xui_highlight')[0].click();
                        } else {}
                    },
                    mouseenter: function() {
                        _X(cls).classAdd('xui_hover');
                        _X.AddTooltip({title: settings.mod.tooltip});
                    },
                    mouseleave: function() {
                        _X(cls).classRemove('xui_hover');
                        _X('.tooltip_class').Xremove();
                    },
                })
                .init(function(that) {
                    _X.Xeach(settings.mod.array, function(k, v) {
                        _X('<option')
                            .appendTo(that)
                            .txt(v);
                    });
                });
            //Default Option Select
            _X(cls).Xval(settings.mod.sel);
        };        
        this.InfosRight = function() {
            var obj = SELECTED.obj;
            if (obj.title === undefined) {obj = FILES[0];}
            _X('.exp_body_right_element_top')
                .Xempty()
                .init(function(that) {
                    _X.CubeIcon({
                        to: _X(that),
                        array: _X(obj),
                        size: 100,
                        menuRC: false,
                        title: false,
                        tooltip: false,
                        drag: true,
                        cube: true,
                        icoControls: true,
                        rotationAngle: [-30, -20],
                        margin: 10,
                        perspective: 200,
                        dragArea: that,
                        //css: {animation: 'axisRotate 15s infinite linear',},
                    });                    
                    var a = {
                        'Title:': obj.title,
                        'Path:': obj.loc,
                        'Date:': obj.date,
                        'Size:': obj.size,
                    };
                    _X.Xeach(a, function(k, v) {
                        if (v !== undefined) {
                            _X('<div')
                                .appendTo(that)
                                .css({color: 'red'})
                                .append(k);
                            _X('<div')
                                .appendTo(that)
                                .css({
                                    'overflow-wrap': 'break-word',
                                    'word-wrap': 'break-word',
                                    hyphens: 'auto',
                                    'font-size': 12,
                                    'margin-left': 10,
                                    'max-width': 100,
                                    'user-select': 'text',
                                })
                                .append(v);   
                        }
                    });
                });
        };
        
        this.FooterInformation = function() {
            _X('.exp_footer_left')
                .Xempty()
                .init(function(that) {
                    var a = {
                        'Items: ': _X.Xsearch({d: 'max', a: FILES, l: 'title', s: ''}).length,
                        'Displayed: ': _X('.exp_body_middle').Xfind('.xcube').length,
                        'Search result: ': SEARCHEXP.length,
                    };                    
                    _X.Xeach(a, function(k, v) {
                        if (v !== 0) {
                            _X('<div')
                                .appendTo(that)
                                .css({
                                    display: 'inline',
                                    'padding-left': 10,
                                })
                                .append(k)
                                .append(v);
                        }
                    });
                });
        };

        this.SearchFilesFolders = function() {
            var inp = _X.ClassVirtual();
            var cheBox = _X.ClassVirtual();
            _X('.exp_header_3_right')
                .init(function(self) {
                    _X(self)
                        .XInput({
                            id: cheBox,
                            type: 'checkbox',
                            width: 24,
                            tooltip: true,
                            tooltipData: 'Search in Selected Path or Element',
                        });
                    _X(self)
                        .XInput({
                            id: inp,
                            type: 'search',
                            name: 'Search Box',
                            width: 'calc(100% - 34px)',
                            height: 24,
                            css: {
                                'border-radius': 5,
                                border: '1px solid #333',
                            },
                            on: {
                                keyup: function(e) {
                                    e.stopImmediatePropagation();
                                    if (e.keyCode == 13 || SETTINGS.autosearch.sel == 'true') {
                                        var value = _X(this).Xval();
                                        SEARCHEXP.length = 0;
                                        if (_X(cheBox).checkBool() === false) {
                                            SEARCHEXP = _X.Xsearch({d: 'max', a: FILES, l: 'title', s: value});
                                        } else {
                                            var path = SELECTED.obj.loc.split('/').slice(1).join('/');
                                            var newArray = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: path})[0].items;
                                            SEARCHEXP = _X.Xsearch({d: 'max', a: newArray, l: 'title', s: value});
                                        }
                                        that.GetFilesFolders({array: SEARCHEXP.slice(0, SETTINGS.searchlimit.sel)});
                                        that.FooterInformation();
                                    } else {}
                                }
                            },
                        });
                });
        };

        this.GetFilesFolders = function(options) {
            var defaults = {
                array: [],
                defaultEmpty: true,
            };
            var settings = _X.JoinObj(defaults, options);
            if (settings.defaultEmpty === true) {
                _X('.exp_body_middle').Xempty();
            } else {}
            if (SETTINGS.viewStyle.sel == 'icons') {
                _X('.exp_body_middle').css({'padding-top': 0});
                _X.CubeIcon({
                    to: _X('.exp_body_middle'),
                    array: _X.Xsearch({a: settings.array, s: 'folder'}),
                    size: 65,
                    css: {float: 'left'},
                    menuRC: _X.Xsearch({s: 'rc7'}),
                    tooltip: false,
                    drag: true,
                    cube: SETTINGS.threeDicon.sel,
                    rotationAngle: 20,
                    margin: 10,
                    perspective: 200,
                    dragArea: '.exp_body_middle',
                    on: {
                        click: function() {
                            if (SEARCHEXP.length > 0) {that.CreatePath()}
                            that.InfosRight();
                            that.FooterInformation();
                        },
                    },
                });
                _X.CubeIcon({
                    to: _X('.exp_body_middle'),
                    array: _X.Xsearch({a: settings.array, s: 'file'}),
                    size: 65,
                    css: {float: 'left'},
                    menuRC: _X.Xsearch({s: 'rc6'}),
                    tooltip: false,
                    drag: true,
                    cube: SETTINGS.threeDicon.sel,
                    rotationAngle: 20,
                    margin: 10,
                    perspective: 200,
                    dragArea: '.exp_body_middle',
                    on: {
                        click: function() {
                            if (SEARCHEXP.length > 0) {that.CreatePath()}
                            that.InfosRight();
                            that.FooterInformation();
                        },
                    },
                });
            } else {
                _X('.exp_body_middle')
                    .css({'padding-top': 18})
                    .init(function(self) {
                        _X('<div')
                            .appendTo(self)
                            .css({
                                position: 'fixed',
                                width: '100%',
                                'margin-top': -18,
                                height: 15, 
                            })
                            .init(function(that) {
                                var a = [
                                    {name: 'Title', header1: '1', header2: '2', elem1: 'title', elem2: 'date'},
                                    {name: 'Date', header1: '2', header2: '3', elem1: 'date', elem2: 'loc'},
                                    {name: 'Path', header1: '3', header2: '4', elem1: 'loc', elem2: 'size'},
                                    {name: 'Size', header1: '4', header2: '', elem1: 'size', elem2: ''},
                                ];
                                _X.Xeach(a, function(k, v) {
                                    _X('<div')
                                        .appendTo(that)
                                        .classAdd('list_top_header_' + v.header1 + ', list_top_header, xui_header, xui_corner_all')
                                        .css({
                                            display: 'inline-block',
                                            'text-align': 'center',
                                            cursor: 'pointer',
                                        })
                                        .append(v.name)
                                        .on({
                                            mouseenter: function() {
                                                _X(this).classAdd('xui_hover');
                                            },
                                            mouseleave: function() {
                                                _X(this).classRemove('xui_hover');
                                            },                                    
                                            click: function(e) {
                                                var x = new ExplorerDisplay();
                                                var array = [];
                                                x.CreatePath();
                                                if (SEARCHEXP.length > 0) {
                                                    array = SEARCHEXP;
                                                } else {
                                                    array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: x.splitpath.join('/')})[0].items;
                                                }
                                                if (v.name == 'Title') {
                                                    array.sort(function(a, b) {
                                                        var nameA = a.title.toUpperCase();
                                                        var nameB = b.title.toUpperCase();
                                                        if (nameA < nameB) {
                                                            return -1;
                                                        }
                                                        if (nameA > nameB) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    });
                                                }
                                                if (v.name == 'Date') {
                                                    array.sort(function(a, b) {
                                                        var nameA = a.date.toUpperCase();
                                                        var nameB = b.date.toUpperCase();
                                                        if (nameA < nameB) {
                                                            return -1;
                                                        }
                                                        if (nameA > nameB) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    });
                                                }
                                                if (v.name == 'Path') {
                                                    array.sort(function(a, b) {
                                                        var nameA = a.loc.toUpperCase();
                                                        var nameB = b.loc.toUpperCase();
                                                        if (nameA < nameB) {
                                                            return -1;
                                                        }
                                                        if (nameA > nameB) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    });
                                                }
                                                if (v.name == 'Size') {
                                                    array.sort(function(a, b) {
                                                        return a.sizeUnformatted - b.sizeUnformatted;
                                                    });
                                                }
                                                x.GetFilesFolders({array: array});
                                                x.FooterInformation();
                                            },
                                        });
                                    if (v.header2.length > 0) {
                                        _X('<div')
                                            .appendTo(that)
                                            .classAdd('xui_default, xui_corner_all')
                                            .css({
                                                display: 'inline-block',
                                                'text-align': 'center',
                                                cursor: 'pointer',
                                            })
                                            .append('&nbsp')
                                            .on({
                                                mouseenter: function() {
                                                    _X(this).classAdd('xui_hover');
                                                },
                                                mouseleave: function() {
                                                    _X(this).classRemove('xui_hover');
                                                },
                                                mousedown: function(e) {
                                                    if (e.which === 1) {
                                                        var xd = e.pageX;
                                                        var elem1width = _X('.list_top_header_' + v.header1).position('width', 'box');
                                                        var elem2left = _X(this).position('left', 'box');
                                                        var elem2width = _X(this).position('width', 'box');
                                                        var elem3width = _X('.list_top_header_' + v.header2).position('width', 'box') - 4;
                                                        //
                                                        var elem1movewidth = _X('.exp_body_middle ').Xfind('.xcube_' + v.elem1).getElem('first').position('width', 'box') + 2;
                                                        var elem2moveleft = _X('.exp_body_middle ').Xfind('.xcube_' + v.elem2).getElem('first').position('left', 'box') - 2;
                                                        var elem2movewidth = _X('.exp_body_middle ').Xfind('.xcube_' + v.elem2).getElem('first').position('width', 'box') - 2;
                                                        var mousemove = function(e) {
                                                            if (e.pageX > elem2left - elem1width + 10 && e.pageX < elem2left + elem3width - 10) {
                                                                _X('.list_top_header_' + v.header1)
                                                                    .css({
                                                                        width: elem1width + (e.pageX - xd)
                                                                    });
                                                                _X(this).css({left: elem2left + (e.pageX - xd)});
                                                                _X('.list_top_header_' + v.header2)
                                                                    .css({
                                                                        left: elem2left + elem2width + (xd - e.pageX),
                                                                        width: elem3width + (xd - e.pageX)
                                                                    });
                                                                //
                                                                _X('.exp_body_middle')
                                                                    .init(function(that) {
                                                                        _X(that)
                                                                            .Xfind('.xcube_' + v.elem1)
                                                                            .css({
                                                                                width: elem1movewidth + (e.pageX - xd)
                                                                            });
                                                                        _X(that)
                                                                            .Xfind('.xcube_' + v.elem2)
                                                                            .css({
                                                                                left: elem2moveleft + (xd - e.pageX),
                                                                                width: elem2movewidth + (xd - e.pageX)
                                                                            });
                                                                    });
                                                            } else {}
                                                        };
                                                        var mouseup = function() {
                                                            _X(window).off({mouseup: mouseup, mousemove: mousemove});
                                                        };
                                                        _X(window).on({mousemove: mousemove, mouseup: mouseup});
                                                    } else {}
                                                },
                                            });
                                    }
                                });
                            });                        
                        _X(self).ListMenuStyle({
                            array: _X.Xsearch({a: settings.array, s: 'folder'}),
                            menuRC: _X.Xsearch({s: 'rc7'}),
                            on: {
                                click: function() {
                                    if (SEARCHEXP.length > 0) {that.CreatePath()}
                                    that.InfosRight();
                                    that.FooterInformation();
                                },
                            },
                        });
                        _X(self).ListMenuStyle({
                            array: _X.Xsearch({a: settings.array, s: 'file'}),
                            menuRC: _X.Xsearch({s: 'rc6'}),
                            on: {
                                click: function() {
                                    if (SEARCHEXP.length > 0) {that.CreatePath()}
                                    that.InfosRight();
                                    that.FooterInformation();
                                },
                            },
                        });                        
                    });
                that.ListStyleResize();
            }
        };

        this.ListStyleResize = function() {
            if (SETTINGS.viewStyle.sel == 'list') {
                _X('.exp_body_middle').Xfind('.xcube ').Xfind('children').css({width: (_X('.exp_body_middle').position('width', 'scroll') - 8) / 4});
                _X('.list_top_header').css({width: (_X('.exp_body_middle').position('width', 'scroll') - 23) / 4});
            }
        };

        this.pathResize = function() {
            var width = _X('.folder_path').position('width', 'offset');
            var elemLength = _X('.folder_path').Xfind('children').length;
            _X('.folder_path').Xfind('children').css({width: (width / elemLength - 1)});
        };
        
        this.path;
        this.splitpath;
        
        this.CreatePath = function(obj) {
            if (obj === undefined) {that.path = SELECTED.obj.loc;}
            else {that.path = obj.loc}
            if (that.path.indexOf('.') > -1) {that.splitpath = that.path.split('/').slice(1, -1);}
            else {that.splitpath = that.path.split('/').slice(1);}
            _X('.folder_path').Xremove();
            _X('<div')
                .appendTo('.exp_header_3_middle')
                .classAdd('folder_path')
                .css({
                    width: '100%',
                    padding: 1,
                })
                .init(function(self) {
                    _X.Xeach(that.splitpath, function(k, v) {
                        _X('<div')
                            .appendTo(self)
                            .classAdd('xui_corner_all, format_text')
                            .css({
                                float: 'left',
                                'box-sizing': 'border-box',
                                cursor: 'pointer',
                                border: '1px solid transparent',
                                'box-shadow': '-1px 1px 2px #333',
                                overflow: 'hidden',
                            })
                            .iconAdd({ico: 'folder', color: '#d6d6d6', size: 20})
                            .append(' ' + v + '/')
                            .on({
                                mouseenter: function() {
                                    _X(this).classAdd('xui_hover');
                                    _X.AddTooltip({title: v});
                                },
                                mouseleave: function() {
                                    _X(this).classRemove('xui_hover');
                                    _X('.tooltip_class').Xremove();
                                },
                                click: function() {
                                    SEARCHEXP.length = 0;
                                    _X('.folder_path').Xfind('children').classRemove('xui_highlight');
                                    _X(this).classAdd('xui_highlight');
                                    var searchPath = that.path.substring(0, that.path.indexOf(v) + v.length);
                                    var array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: searchPath})[0];
                                    that.GetFilesFolders({array: array.items});
                                    SELECTED.obj = array;
                                    that.InfosRight();
                                    that.FooterInformation();
                                },
                                contextmenu: function(e) {
                                    var searchPath = that.path.substring(0, that.path.indexOf(v) + v.length);
                                    var array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: searchPath})[0];
                                    SELECTED.obj = array;
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                        var x = new _X.Window();
                                        x.init({
                                            windowType: x.type[3],
                                            fontSize: 13,
                                            width: 115,
                                            height: 'auto',
                                            open: false,
                                            clasa: 'remove_on_mousedown',
                                        });
                                        x.right.MenuElements({
                                            array: _X.Xsearch({s: 'rc8'}),
                                            pushObj: false,
                                            pushItem: false,
                                            icoSize: 25,
                                            click: 'mousedown',
                                            color: false,
                                        });
                                        x.win.OpenWindow();
                                        WIN.full.splice(WIN.key, 1);
                                },
                                dblclick: function() {
                                    SEARCHEXP.length = 0;
                                    var searchPath = that.path.substring(0, that.path.indexOf(v) + v.length);
                                    var array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: searchPath})[0];
                                    that.CreatePath(array);
                                    that.GetFilesFolders({array: array.items});
                                    that.InfosRight();
                                    SELECTED.obj = array;
                                    _X('.folder_path').Xfind('children').getElem('last')[0].click();
                                },
                            });
                    });
                });
            if (SEARCHEXP.length > 0) {
                _X('.folder_path').Xfind('children').classRemove('xui_highlight');
                _X('.folder_path').Xfind('children').getElem('last').classAdd('xui_highlight');
            }
            that.pathResize();
        };
    }
    
    //Create Explorer
    (function() {
        function TreeElements(appendTo, v) {
            var FolderToArray = v.loc.split('/').slice(1);
            var MarginLeft = function(v) {
                return v == 1 ? -15 : 25;
            };
            _X('<div')
                .appendTo(appendTo)
                .classAdd('tree_body')
                .css({
                    'margin-left': MarginLeft(FolderToArray.length),
                    padding: 1,
                    'border-left': '1px dotted',
                    'white-space': 'nowrap',
                    overflow: 'hidden',
                })
                .init(function(that) {
                    _X('<div')
                        .appendTo(that)
                        .classAdd('tree_info')
                        .css({
                            display: 'inline-block',
                            'margin-left': 16,
                            width: 'auto',
                            height: 'auto',
                        })
                        .init(function(that) {
                            _X('<div')
                                .appendTo(that)
                                .classAdd('xui_corner_all')
                                .css({
                                    display: 'inline',
                                    cursor: 'pointer',
                                    border: '1px solid transparent',
                                    padding: 1,
                                })
                                .init(function(that) {
                                    if (v.folderCount > 0) {
                                        _X(that)
                                            .classAdd('tree_collapse')
                                            .iconAdd({
                                                ico: 'remove',
                                                size: 16,
                                                color: '#000000',
                                                css: {
                                                    'padding-bottom': 2,
                                                },
                                            })
                                            .on({
                                                mouseenter: function() {
                                                    _X(this)
                                                        .classAdd('xui_hover')
                                                        .css({'box-shadow': 'rgb(51, 51, 51) 1px 1px 2px'});
                                                },
                                                mouseleave: function() {
                                                    _X(this)
                                                        .classRemove('xui_hover')
                                                        .css({'box-shadow': ''});
                                                },
                                                click: function(e) {
                                                    e.preventDefault();
                                                    e.stopImmediatePropagation();
                                                    if (_X(this).parent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', 'none']).length > 0) {
                                                        _X(this).parent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', 'none']).Xshow(SETTINGS.effect.sel);
                                                        _X(this).Xfind('i').Xempty().append('remove');
                                                    } else {
                                                        _X(this).parent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', '']).Xhide(SETTINGS.effect.sel);
                                                        _X(this).Xfind('i').Xempty().append('add');
                                                    }
                                                },
                                            });
                                    } else {
                                        _X(that).parent().css({'margin-left': 32});
                                    }
                                });
                            _X('<div')
                                .appendTo(that)
                                .classAdd('xui_corner_all, tree_name')
                                .css({
                                    display: 'inline',
                                    cursor: 'pointer',
                                    border: '1px solid transparent',
                                    padding: 2,
                                })
                                .iconAdd({
                                    ico: v.ico,
                                    color: v.color,
                                    css: {
                                        'padding-bottom': 2,
                                    }
                                })
                                .append(' ' + FolderToArray[FolderToArray.length - 1])
                                .on({
                                    mouseenter: function() {
                                        if (_X('body').classBool('mousedown_true') === false) {
                                            _X(this)
                                                .classAdd('xui_hover')
                                                .css({'box-shadow': 'rgb(51, 51, 51) 1px 1px 2px'});
                                        }
                                    },
                                    mouseleave: function() {
                                        _X(this)
                                            .classRemove('xui_hover')
                                            .css({'box-shadow': ''});
                                    },
                                    mousedown: function() {
                                        v.init();
                                        _X('.tree_name').classRemove('xui_highlight');
                                        _X(this).classAdd('xui_highlight');
                                    },
                                    click: function(e) {
                                        SEARCHEXP.length = 0;
                                        _X('.tree_name').classRemove('xui_highlight');
                                        _X(this).classAdd('xui_highlight');
                                        v.init();
                                    },
                                    contextmenu: function(e) {
                                        v.init();
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                            var x = new _X.Window();
                                            x.init({
                                                windowType: x.type[3],
                                                fontSize: 13,
                                                width: 115,
                                                height: 'auto',
                                                open: false,
                                                clasa: 'remove_on_mousedown',
                                            });
                                            x.right.MenuElements({
                                                array: _X.Xsearch({s: 'rc7'}),
                                                pushObj: false,
                                                pushItem: false,
                                                icoSize: 25,
                                                click: 'mousedown',
                                                color: false,
                                            });
                                            x.win.OpenWindow();
                                            WIN.full.splice(WIN.key, 1);
                                    },
                                    dblclick: function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                        if (_X(this).parent().Xfind('.tree_collapse')[0] !== undefined) {
                                            _X(this).parent().Xfind('.tree_collapse')[0].click();
                                        }
                                    },
                                })
                                .init(function(that) {
                                    ScanElementsCreateTree(v.items, that.parent('.tree_body'));
                                });
                        });
                });
        }
        function ScanElementsCreateTree(array, appendto) {
            _X.Xeach(array, function(k, v) {
                if (v.loc.indexOf('.') > -1) {
                    if (v.search.indexOf('iframe') > -1) {v.init = _X.OpenIframe;}
                    if (v.search.indexOf('video') > -1) {v.init = _X.OpenVideo;}
                    if (v.search.indexOf('photo') > -1) {v.init = _X.OpenPhoto;}
                }
                if (v.search.indexOf('folder') > -1) {
                    v.init = function() {
                        var x = new ExplorerDisplay();
                        x.GetFilesFolders({array: v.items});
                        x.CreatePath(v);
                        x.FooterInformation();
                        x.InfosRight();
                        SELECTED.obj = v;
                        _X('.folder_path').Xfind('children').getElem('last')[0].click();
                    };
                }
                if (v.hasOwnProperty('items')) {
                    TreeElements(appendto, v);
                }
            });
        }
        ScanElementsCreateTree(FILES, '.exp_body_left');
    })();
    
    _X(window).on({
        load: function() {
            _X('.exp_body_left').Xfind('.tree_name')[0].click();
            _X('.exp_body_middle').Xfind('.xcube')[0].click();
        },
        resize: function() {
            var x = new ExplorerDisplay();
            x.pathResize();
            x.ListStyleResize();
            _X('.exp_header_2').Xfind('children').css({width: window.innerWidth / 6});
        },
    });

    _X(document).on({
        mouseup: function() {
            /*
            var temp = [];
            temp = DesktopIconsSel;
            _X('.exp_body_right_element_bottom').Xempty();
            _X.Xeach(temp, function(k, v) {
                console.log(v);
                _X(v).appendTo('.exp_body_right_element_bottom');
                //_X('.exp_body_right_element_bottom').append(v);
            });
            */
        },
        contextmenu: function(e) {
            e.preventDefault();
        },
    });
