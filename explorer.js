//jshint maxerr: 2000

    WIN.globalDIV = 'body';
    WIN.taskbar = '.exp_footer_right';
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
    
    var HeaderHeight = function() {
        if (window.innerWidth > 700) {return 81}
        else return 0;
    };
    var FooterHeight = 20;
    var BodyLeftWidth = 200;
    var BodyMiddleWidthResize = 7;
    var BodyRightWidth = 120;
    
    var SEARCHEXP = [];
    var FILES = FILES;
    _X('#varLoad').Xremove();
    
    /*Update the Directory Structure 
    if (true === false) {
        _X.XReadAjax({
            url: 'scan.php',
            callback: function() {}
        });
    }
    */
    //console.log(FILES);
    
    DefaultSearchLocation = [
        {
            search: 'rc7',
            title: 'Download',
            ico: 'cloud_download',
            init: function() {
                var obj = SELECTED.obj;
                var id = _X.ClassVirtual();
                var str = 'download.php?path=' + obj.loc;
                _X('<a')
                    .XappendTo('body')
                    .classAdd(id.replace('.', ''))
                    .attr({
                        href: str,
                        //target: '_blank',
                    });
                _X(id)[0].click();
                _X(id).Xremove();
            },
        }, 
    ];

    //Load Grafik
    (function() {
        var Radius = 70;
        _X.CreateTagElements({
            t: 'body',
            a: [
                {
                    classAdd: 'body_load',
                    css: {
                        position: 'absolute',
                        'z-index': 2000,
                        left: window.innerWidth / 2 - Radius / 2,
                        top: window.innerHeight / 2 - Radius / 2,
                        width: Radius,
                        height: Radius,
                        'border-radius': '50%',
                        animation: 'website_circle_load 2s linear infinite',
                    },
                    items: [
                        {
                            css: {
                                position: 'absolute',
                                left: Radius / 2,
                                top: Radius / 2,
                                width: Radius / 3,
                                height: Radius / 3,
                                animation: 'website_circle_load 1s linear infinite',
                                'background-image': 'linear-gradient(red, yellow)',
                                'border-radius': '50%',
                            },
                        }, {
                            css: {
                                position: 'absolute',
                                left: Radius / 2,
                                top: Radius / 2,
                                width: Radius / 3,
                                height: Radius / Radius,
                                animation: 'website_circle_load 1s linear infinite',
                            },
                            items: [
                                {
                                    css: {
                                        width: Radius / 3,
                                        height: Radius / 3,
                                        'background-image': 'linear-gradient(red, yellow)',
                                        'border-radius': '50%',
                                    },
                                },
                            ],
                        }, {
                            css: {
                                position: 'absolute',
                                left: Radius / 2,
                                top: Radius / 2,
                                width: Radius / Radius,
                                height: Radius / 3,
                                animation: 'website_circle_load 1s linear infinite',
                            },
                            items: [
                                {
                                    css: {
                                        width: Radius / 3,
                                        height: Radius / 3,
                                        'background-image': 'linear-gradient(red, yellow)',
                                        'border-radius': '50%',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    })();

    //Create Website Base Grafik
    _X.CreateTagElements({
        t: 'body',
        a: [
            {
                classAdd: 'desktop_website',
                css: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: 0,
                    overflow: 'hidden',
                    'z-index': 99,
                },
                items: [
                    {
                        classAdd: 'xui_content, exp_header',
                        css: {
                            position: 'relative',
                            height: HeaderHeight(),
                            border: '0px solid transparent',
                        },
                        items: [
                            {
                                classAdd: 'exp_header_1',
                                css: {
                                    position: 'relative',
                                    height: 25,
                                    overflow: 'hidden',
                                },
                                items: [
                                ],
                            }, {
                                classAdd: 'exp_header_2',
                                css: {
                                    position: 'relative',
                                    height: 30,
                                    overflow: 'hidden',
                                },
                                init: function(that) {
                                    var x = new ExplorerDisplay();
                                    x.SettingsSelectList({to: that, mod: SETTINGS.theme});
                                    x.SettingsSelectList({to: that, mod: SETTINGS.effect});
                                    x.SettingsSelectList({to: that, mod: SETTINGS.autosearch});
                                    x.SettingsSelectList({to: that, mod: SETTINGS.searchlimit});
                                    x.SettingsSelectList({to: that, mod: SETTINGS.threeDicon});
                                    x.SettingsSelectList({to: that, mod: SETTINGS.viewStyle});
                                },
                            },{
                                classAdd: 'exp_header_3',
                                css: {
                                    position: 'relative',
                                    height: 25,
                                },
                                items: [
                                    {
                                        classAdd: 'exp_header_3_left',
                                        css: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 200,
                                        },
                                        init: function(that) {
                                            var temp = {
                                                ico1: {
                                                    left: 0,
                                                    tooltip: 'Full Collapse',
                                                    ico: 'navigate_before',
                                                    init: function() {
                                                        var temp = _X('.tree_name')
                                                            .classHave('xui_highlight')
                                                            .Xparent('.tree_body')
                                                            .Xfind('children')
                                                            .Xfind('.tree_collapse');
                                                        _X.Xeach(temp, function(k, v) {
                                                            if (_X(v).Xfind('i').txt() === 'remove') {
                                                                v.click();
                                                            }
                                                        });
                                                    },
                                                },
                                                ico2: {
                                                    left: 40,
                                                    tooltip: 'Collapse First Level',
                                                    ico: 'keyboard_arrow_up',
                                                    init: function() {
                                                        var temp = _X('.tree_name')
                                                            .classHave('xui_highlight')
                                                            .Xparent('.tree_body')
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
                                                },
                                                ico3: {
                                                    left: 80,
                                                    tooltip: 'Full Expand',
                                                    ico: 'navigate_next',
                                                    init: function() {
                                                        var temp = _X('.tree_name')
                                                            .classHave('xui_highlight')
                                                            .Xparent('.tree_body')
                                                            .Xfind('children')
                                                            .Xfind('.tree_collapse');
                                                        _X.Xeach(temp, function(k, v) {
                                                            if (_X(v).Xfind('i').txt() === 'add') {
                                                                v.click();
                                                            }
                                                        });
                                                    },
                                                },
                                                ico4: {
                                                    left: 120,
                                                    tooltip: 'Expand First Level',
                                                    ico: 'keyboard_arrow_down',
                                                    init: function() {
                                                        if (_X('.tree_name').classHave('xui_highlight').Xparent('.tree_body').Xfind('children').classHave('tree_body').cssBool(['display', 'none']) === true) {
                                                            var temp = _X('.tree_name')
                                                                .classHave('xui_highlight')
                                                                .Xparent('.tree_body')
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
                                                            _X('.tree_name').classHave('xui_highlight').Xparent().Xfind('.tree_collapse')[0].click();
                                                        }
                                                    }
                                                },
                                            };
                                            _X.Xeach(temp, function(k, v) {
                                                _X('<div')
                                                    .XappendTo(that)
                                                    .classAdd('xui_corner_all')
                                                    .css({
                                                        position: 'absolute',
                                                        left: v.left,
                                                        top: 0,
                                                        bottom: 0,
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
                                        },
                                    }, {
                                        classAdd: 'exp_header_3_middle',
                                        css: {
                                            position: 'absolute',
                                            left: 170,
                                            right: 200,
                                            top: 0,
                                            bottom: 0,
                                        },
                                    }, {
                                        classAdd: 'exp_header_3_right',
                                        css: {
                                            position: 'absolute',
                                            width: 200,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                        },
                                        init: function() {
                                            var x = new ExplorerDisplay();
                                            x.SearchFilesFolders();
                                        },                                        
                                    },
                                ],
                            },
                        ],
                    }, {
                        classAdd: 'exp_body',
                        css: {
                            position: 'relative',
                            height: 'calc(100% - ' + (HeaderHeight() + FooterHeight) + 'px)',
                            border: '0px solid transparent',
                        },
                        items: [
                            {
                                classAdd: 'exp_body_left, xui_content',
                                css: {
                                    position: 'absolute',
                                    width: BodyLeftWidth,
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    overflow: 'auto',
                                    border: '0px solid transparent',
                                },
                            }, {
                                classAdd: 'exp_body_resize, xui_header, xui_corner_all',
                                css: {
                                    position: 'absolute',
                                    left: BodyLeftWidth,
                                    width: BodyMiddleWidthResize,
                                    top: 0,
                                    bottom: 0,
                                    cursor: 'pointer',
                                },
                                on: {
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
                                    },                                    
                                },
                            }, {
                                classAdd: 'exp_body_middle, xui_content',
                                css: {
                                    position: 'absolute',
                                    left: BodyLeftWidth + BodyMiddleWidthResize + 2,
                                    top: 0,
                                    right: BodyRightWidth,
                                    bottom: 0,
                                    'overflow-x': 'hidden',
                                    'overflow-y': 'auto',
                                    border: '0px solid transparent',
                                },
                                on: {
                                    mousedown: function(e) {
                                        if (e.which === 1) {
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
                                        }                                  
                                    },
                                },
                            }, {
                                classAdd: 'exp_body_right, xui_default',
                                css: {
                                    position: 'absolute',
                                    width: BodyRightWidth,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    'overflow-x': 'hidden',
                                    'overflow-y': 'auto',
                                    border: '0px solid transparent',
                                },
                                init: function(that) {
                                },
                                items: [
                                    {
                                        classAdd: 'exp_body_right_resize, xui_header, xui_corner_all',
                                        css: {
                                            position: 'absolute',
                                            width: 7,
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                        },
                                        on: {
                                            mouseenter: function() {
                                                _X(this).classAdd('xui_hover');
                                            },
                                            mouseleave: function() {
                                                _X(this).classRemove('xui_hover');
                                            },
                                            click: function() {
                                                if (_X('.exp_body_right').css('width') > 10) {
                                                    _X('.exp_body_right').css({width: 10});
                                                    _X(this).Xparent().Xfind('.exp_body_right_element').Xhide();
                                                    _X('.exp_body_middle').css({right: 10});
                                                } else {
                                                    _X('.exp_body_right').css({width: BodyRightWidth});
                                                    _X(this).Xparent().Xfind('.exp_body_right_element').Xshow();
                                                    _X('.exp_body_middle').css({right: BodyRightWidth});
                                                }
                                            },
                                        },
                                    }, {
                                        classAdd: 'exp_body_right_element, xui_corner_all',
                                        css: {
                                            position: 'absolute',
                                            left: 10,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                        },
                                        items: [
                                            {
                                                classAdd: 'exp_body_right_element_top, xui_corner_all',
                                                css: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 200,
                                                },
                                            }, {
                                                classAdd: 'exp_body_right_element_bottom, xui_corner_all',
                                                css: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    height: 200,
                                                    bottom: 0,
                                                },
                                            },                                            
                                        ],
                                    },
                                ],
                            },
                        ],
                    }, {
                        classAdd: 'exp_footer, xui_content',
                        css: {
                            position: 'relative',
                            height: FooterHeight,
                            border: '0px solid transparent',
                        },
                        items: [
                            {
                                classAdd: 'exp_footer_left',
                                css: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 350,
                                },
                            }, {
                                classAdd: 'exp_footer_right',
                                css: {
                                    position: 'absolute',
                                    left: 350,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    });

    function ExplorerDisplay() {
        var that = this;
        this.SettingsSelectList = function(options) {
            var that = this;
            var defaults = {
                to: '',
                mod: '',
            };
            var settings = _X.JoinObj(defaults, options);
            var cls = _X.ClassVirtual();
            _X('<select')
                .XappendTo(_X(settings.to))
                .classAdd(cls.replace('.', ''))
                .classAdd('xui_content, xui_corner_all')
                .css({
                    width: window.innerWidth / 6,
                    height: 28,
                    display: 'inline',
                    border: '1px solid transparent',
                    'box-shadow': '-1px 1px 2px #333',
                });                
            _X.Xeach(settings.mod.array, function(k, v) {
                _X('<option')
                    .XappendTo(cls)
                    .txt(v);
            });
            _X(cls).on({
                change: function() {
                    var selected = _X(cls).Xval();
                    settings.mod.sel = selected;
                    if (settings.mod == SETTINGS.theme) {
                        _X('#stylesheet').attr({href: '../css/xui/' + selected + '.css'});
                    } else {}
                    if (settings.mod == SETTINGS.viewStyle) {
                        that.GetFilesFolders();
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
            });
            //Default Option Select
            _X(cls).Xval(settings.mod.sel);
        };        
        this.InfosRight = function() {
            var obj = SELECTED.obj;
            if (obj.title === undefined) {obj = FILES[0];}
            _X('.exp_body_right_element_top').Xempty();
            _X.CubeIcon({
                to: _X('.exp_body_right_element_top'),
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
                dragArea: '.exp_body_right_element_top',
            });
            //Right
            var array = {
                'Title': obj.title,
                'Location': obj.loc,
                'Date': obj.date,
                'Size': obj.size,
            };
            _X.Xeach(array, function(k, v) {
                if (v !== undefined) {
                    _X('<div')
                        .XappendTo('.exp_body_right_element_top')
                        .css({color: 'red'})
                        .Xappend(k);
                    _X('<div')
                        .XappendTo('.exp_body_right_element_top')
                        .css({
                            'overflow-wrap': 'break-word',
                            'word-wrap': 'break-word',
                            hyphens: 'auto',
                            'font-size': 12,
                            'margin-left': 10,
                            'max-width': 100,
                        })
                        .Xappend(v);
                }
            });
        };
        
        this.FooterInformation = function() {
            var arrayFooter = {
                'Items: ': _X.Xsearch({d: 'max', a: FILES, l: 'title', s: ''}).length - 1,
                'Displayed: ': _X('.exp_body_middle').Xfind('.xcube').length,
                'Search result: ': SEARCHEXP.length,
            };
            _X('.exp_footer_left').Xempty();
            _X.Xeach(arrayFooter, function(k, v) {
                if (v !== 0) {
                    _X('<div')
                        .XappendTo('.exp_footer_left')
                        .css({
                            display: 'inline',
                            'padding-left': 10,
                        })
                        .Xappend(k)
                        .Xappend(v);
                }
            });
        };

        this.SearchFilesFolders = function() {
            var inp = _X.ClassVirtual();
            var cheBox = _X.ClassVirtual();
            _X('.exp_header_3_right').XInput({
                id: cheBox,
                type: 'checkbox',
                width: 24,
                tooltip: true,
                tooltipData: 'Search only in current Path',
            });              
            _X('.exp_header_3_right')
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
                });
            _X(inp).on({
                keyup: function(e) {
                    e.stopImmediatePropagation();
                    if (e.keyCode == 13 || SETTINGS.autosearch.sel == 'true') {
                        var value = _X(this).Xval();
                        SEARCHEXP.length = 0;                        
                        if (_X(cheBox).checkBool() === false) {
                            SEARCHEXP = _X.Xsearch({d: 'max', a: FILES, l: 'title', s: value});
                        } else {
                            var path = SELECTED.obj.loc.split('/').slice(1, -1).join('/');
                            var newArray = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: path})[0].items;
                            SEARCHEXP = _X.Xsearch({d: 'max', a: newArray, l: 'title', s: value});
                        }
                        that.GetFilesFolders({array: SEARCHEXP.slice(0, SETTINGS.searchlimit.sel)});
                        that.FooterInformation();
                    } else {}
                }
            });
        };

        this.MenuElements = function(options) {
            var defaults = {
                to: '',
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
            var colWidth = (_X('.exp_body_middle ').position('width', 'offset') - 8) / 4;
            _X.Xeach(s.array, function(k, v) {
                _X('<div')
                    .XappendTo(s.to)
                    .classAdd('ico_full_body, xui_corner_all')
                    .classAdd(s.clasa)
                    .css({
                        'white-space': 'nowrap',
                        overflow: 'hidden',                           
                        margin: 3,
                        border: '1px solid transparent',
                        height: 30,
                    })
                    .css(s.css)
                    .Xappend(_X('<div')
                        .iconAdd({ico: v.ico, color: v.color, size: s.icoSize})
                        .Xappend(_X.AddSpace(1) + v.title)
                        .classAdd('format_text')
                        .css({
                            width: colWidth,
                            display: 'inline-block',
                            'text-align': 'left',
                            'vertical-align': 'middle',
                        })
                    )
                    .Xappend(_X('<div')
                        .Xappend(_X.AddSpace(1) + v.date)
                        .classAdd('format_text')
                        .css({
                            width: colWidth,
                            display: 'inline-block',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                        })
                    )                     
                    .Xappend(_X('<div')
                        .Xappend(_X.AddSpace(1) + v.loc)
                        .classAdd('format_text')
                        .css({
                            width: colWidth,
                            display: 'inline-block',
                            'text-align': 'left',
                            'vertical-align': 'middle',
                        })
                    )
                    .Xappend(_X('<div')
                        .Xappend(_X.AddSpace(1) + v.size)
                        .classAdd('format_text')
                        .css({
                            width: colWidth,
                            display: 'inline-block',
                            'text-align': 'right',
                            'vertical-align': 'middle',
                        })
                    )                      
                    .on(s.on)
                    .on({
                        mouseenter: function() {
                            _X(this).classAdd('xui_hover');
                        },
                        mouseleave: function() {
                            _X(this).classRemove('xui_hover');
                        },
                        mousedown: function() {
                            _X.ReturnElements({item: this, obj: v, pushItem: s.pushItem, pushObj: s.pushObj});
                            _X('.ico_full_body').classRemove('xui_active');
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
                    .on([s.click, function() {
                        v.init();
                    }]);
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
            } else {
                that.MenuElements({
                    to: _X('.exp_body_middle'),
                    array: _X.Xsearch({a: settings.array, s: 'folder'}),
                    menuRC: false,
                    on: {
                        click: function() {
                            if (SEARCHEXP.length > 0) {that.CreatePath()}
                            that.InfosRight();
                            that.FooterInformation();
                        },
                    },                
                });                
                that.MenuElements({
                    to: _X('.exp_body_middle'),
                    array: _X.Xsearch({a: settings.array, s: 'file'}),
                    menuRC: false,
                    on: {
                        click: function() {
                            if (SEARCHEXP.length > 0) {that.CreatePath()}
                            that.InfosRight();
                            that.FooterInformation();
                        },
                    },                
                });
            }
        };

        this.pathResize = function() {
            var width = _X('.folder_path').position('width', 'offset');
            var elemLength = _X('.folder_path').Xfind('children').length;
            _X('.folder_path').Xfind('children').css({width: (width / elemLength - 1)});
        };
        
        this.CreatePath = function(obj) {
            var path;
            var splitpath;
            if (obj === undefined) {path = SELECTED.obj.loc;}
            else {path = obj.loc}
            if (path.indexOf('.') > -1 || obj === undefined) {splitpath = path.split('/').slice(1, -1);}
            else {splitpath = path.split('/').slice(1);}
            _X('.folder_path').Xremove();
            _X('<div')
                .XappendTo('.exp_header_3_middle')
                .classAdd('folder_path')
                .css({
                    width: '100%',
                    padding: 1,
                });
            _X.Xeach(splitpath, function(k, v) {
                _X('<div')
                    .XappendTo('.folder_path')
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
                    .Xappend(' ' + v + '/')
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
                            var searchPath = path.substring(0, path.indexOf(v) + v.length);
                            var array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: searchPath})[0];
                            that.GetFilesFolders({array: array.items});
                            SELECTED.obj = array;
                            that.InfosRight();
                        },
                        contextmenu: function(e) {
                            var searchPath = path.substring(0, path.indexOf(v) + v.length);
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
                        dblclick: function() {
                            SEARCHEXP.length = 0;
                            var searchPath = path.substring(0, path.indexOf(v) + v.length);
                            var array = _X.Xsearch({d: 'max', a: FILES, l: 'loc', s: searchPath})[0];
                            that.CreatePath(array);
                            that.GetFilesFolders({array: array.items});
                            that.InfosRight();
                            SELECTED.obj = array;
                            _X('.folder_path').Xfind('children').getElem('last')[0].click();
                        },                        
                    });
            });
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
            _X.CreateTagElements({
                t: appendTo,
                a: [
                    {
                        classAdd: 'tree_body',
                        css: {
                            'margin-left': MarginLeft(FolderToArray.length),
                            padding: 1,
                            'border-left': '1px dotted',
                            'white-space': 'nowrap',
                            overflow: 'hidden',
                        },
                        items: [
                            {
                                classAdd: 'tree_info',
                                css: {
                                    display: 'inline-block',
                                    'margin-left': 16,
                                    width: 'auto',
                                    height: 'auto',
                                },
                                items: [
                                    {
                                        classAdd: 'xui_corner_all',
                                        css: {
                                            display: 'inline',
                                            cursor: 'pointer',
                                            border: '1px solid transparent',
                                            padding: 1,
                                        },
                                        init: function(that) {
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
                                                            _X(this).classAdd('xui_hover');
                                                        },
                                                        mouseleave: function() {
                                                            _X(this).classRemove('xui_hover');
                                                        },
                                                        click: function(e) {
                                                            e.preventDefault();
                                                            e.stopImmediatePropagation();
                                                            if (_X(this).Xparent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', 'none']).length > 0) {
                                                                _X(this).Xparent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', 'none']).Xshow(SETTINGS.effect.sel);
                                                                _X(this).Xfind('i').Xempty().Xappend('remove');
                                                            } else {
                                                                _X(this).Xparent('.tree_body').Xfind('children').classHave('tree_body').cssHave(['display', '']).Xhide(SETTINGS.effect.sel);
                                                                _X(this).Xfind('i').Xempty().Xappend('add');
                                                            }
                                                        },
                                                    });
                                            } else {
                                                _X(that).Xparent().css({'margin-left': 32});
                                            }
                                        },
                                    }, {
                                        classAdd: 'xui_corner_all, tree_name',
                                        css: {
                                            display: 'inline',
                                            cursor: 'pointer',
                                            border: '1px solid transparent',
                                            padding: 2,
                                        },
                                        iconAdd: {
                                            ico: v.ico,
                                            color: v.color,
                                            css: {
                                                'padding-bottom': 2,
                                            }
                                        },
                                        append: ' ' + FolderToArray[FolderToArray.length - 1],
                                        on: {
                                            mouseenter: function() {
                                                _X(this).classAdd('xui_hover');
                                            },
                                            mouseleave: function() {
                                                _X(this).classRemove('xui_hover');
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
                                                if (_X(this).Xparent().Xfind('.tree_collapse')[0] !== undefined) {
                                                    _X(this).Xparent().Xfind('.tree_collapse')[0].click();
                                                }
                                            },
                                        },
                                        //Initialize again the function to create the tree
                                        init: function(that) {
                                            ScanElementsCreateTree(v.items, that.Xparent('.tree_body'));
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
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
            _X('.exp_header').css({height: HeaderHeight()});
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
                _X(v).XappendTo('.exp_body_right_element_bottom');
                //_X('.exp_body_right_element_bottom').Xappend(v);
            });
            */
        },
        contextmenu: function(e) {
            e.preventDefault();
        },
    });

    
