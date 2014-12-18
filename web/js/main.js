/**
 * Created by SC on 2014/11/7.
 */
Ext.define("main", {
    extend: "Ext.container.Viewport",
    oldItem: '',
    oldPath: '',
    //jsonData: {node: {children: []}},
    myMenuClick: function (jsModel, jsId) {
        Ext.require(GLOBAL_PATH + jsModel, function () {
            var center = Ext.getCmp('core');
            var tab = center.items.get(jsId);
            if (!tab) {
                var obj = Ext.create(GLOBAL_PATH + jsModel);
                center.add(obj);
                center.setActiveTab(obj);
            } else {
                if (center.getActiveTab() !== tab) {
                    center.setActiveTab(tab);
                }
            }
        }, this);
    },
    initComponent: function () {
//        var user_id = document.getElementById('tree1').value;
        var me = this;
        Ext.Ajax.request({
            url: '/main/tree',
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }
        });

        var store = Ext.create("Ext.data.TreeStore", {
            fields: [
                { name: 'id', type: 'string', mapping: 'power.menuId'},
                { name: 'text', type: 'string', mapping: 'power.text'}
            ],
            root: {
                text: '权限',
                id: '-1',
                children: me.jsonData.node.children
            }
        });

        this.createlist();
        Ext.apply(this, {
            layout: "border",
            border: false,
            items: [
                {
                    region: "north",
                    xtype: "panel",
                    border: false,
                    height: 115,
                    bodyStyle: {
                        backgroundImage: 'url("../../imgs/web.gif")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize:'100%'
                    },
                    html: "<div style='float: left;height: 75px;width: 150px;padding-left: 100px;'><img src='../../imgs/logo.jpg' style='width: 85px;height: 90px;'></div>" +
                        "<table style='height: 100;float: left; margin-left: 33px;' >" +
                        "<tr>" +
                        "<td valign='middle'>" +
                        "<marquee width='1000px' direction=left scrollamount=2 scrolldelay=50 onmouseover='this.stop()' onmouseout='this.start()'>" +
                        "<div style='float: left;margin:2px 0 0 0;  border=0px;font-size: 35pt'>S·MEI AD平台</div></marquee>" +
                        "</td>" +
                        "</tr>" +
                        "</table>",
                    bbar: [
                        {
                            text: '常用功能',
                            menu: [
                                {
                                    text: '采购入库',
                                    listeners: {
                                        click: function () {
                                            me.myMenuClick(GLOBAL_PATH + 'js.cgrk', 'cgrk');
                                        }
                                    }
                                },
                                {
                                    text: "销售出库",
                                    listeners: {
                                        click: function () {
                                            me.myMenuClick(GLOBAL_PATH + 'js.xsck', 'xsck_myjs');
                                        }
                                    }
                                },
                                {
                                    text: "入库查询",
                                    listeners: {
                                        click: function () {
                                            me.myMenuClick(GLOBAL_PATH + 'js.rkcx', 'rkcx');
                                        }
                                    }
                                },
                                {
                                    text: "出库查询",
                                    listeners: {
                                        click: function () {
                                            me.myMenuClick(GLOBAL_PATH + 'js.ckcx', 'ckcx');
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            text: "进货管理",
                            menu: [
//                                {
//                                    text: "进货业务",
//                                    menu: [
//                                        {
//                                            text: "进货订单"
//
//                                        },
//                                        {
//                                            text: "进货订单管理"
//                                        },
//                                        {
//                                            text: "进货单"
//                                        },
//                                        {
//                                            text: "付款单"
//                                        }
//                                    ]
//                                },
                                {
                                    text: "进货报表",
                                    menu: [
                                        {
                                            text: "商品进货统计",
                                            menu: [
                                                {
                                                    text: "饼图",
                                                    listeners: {
                                                        click: function () {
                                                            me.myMenuClick(GLOBAL_PATH + 'js.spbt', 'spbt');
                                                        }
                                                    }
                                                },
                                                {
                                                    text: "折线图",
                                                    listeners: {
                                                        click: function () {
                                                            me.myMenuClick(GLOBAL_PATH + 'js.spzxt', 'spzxt');
                                                        }
                                                    }
                                                },
                                                {
                                                    text: '柱状图',
                                                    listeners: {
                                                        click: function () {
                                                            me.myMenuClick(GLOBAL_PATH + 'js.spzxt', 'spzxt');
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "销售管理",
                            menu: [
                                {
                                    text: "批发业务",
                                    menu: [
                                        {
                                            text: "销售订单"
                                        },
                                        {
                                            text: "销售订单管理"
                                        },
                                        {
                                            text: "销售单"
                                        },
                                        {
                                            text: "收款单"
                                        }
                                    ]
                                },
                                {
                                    text: "价格管理",
                                    menu: [
                                        {
                                            text: "物价管理"
                                        },
                                        {
                                            text: "价格折扣跟踪"
                                        }
                                    ]
                                },
                                {
                                    text: "促销管理",
                                    menu: [
                                        {
                                            text: "时段促销单管理"
                                        },
                                        {
                                            text: "商品促销统计"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "分销订货",
                            menu: [
                                {
                                    text: "卖家导航"
                                },
                                {
                                    text: "管理分销后台"
                                },
                                {
                                    text: "管理我的买家"
                                },
                                {
                                    text: "买家导航"
                                }
                            ]
                        },
                        {
                            text: "库存管理",
                            menu: [
//                                {
//                                    text: "库存业务",
//                                    menu: [
//                                        {
//                                            text: "报损单"
//                                        },
//                                        {
//                                            text: "报溢单"
//                                        },
//                                        {
//                                            text: "挑拨单"
//                                        }
//                                    ]
//                                },
                                {
                                    text: "库存盘点",
                                    menu: [
                                        {
                                            text: '饼图',
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.kcpdbt', 'kcpdbt');
                                                }
                                            }
                                        },
                                        {
                                            text: "折线图",
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.kcpdzxt', 'kcpdzxt');
                                                }
                                            }
                                        },
                                        {
                                            text: '柱状图',
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.kcpdzzt', 'kcpdzzt');
                                                }
                                            }
                                        }
                                    ]
                                }
//                                {
//                                    text: "库存报表",
//                                    menu: [
//                                        {
//                                            text: "报损单统计"
//                                        },
//                                        {
//                                            text: "报溢单统计"
//                                        },
//                                        {
//                                            text: "挑拨单统计"
//                                        }
//                                    ]
//                                }
                            ]
                        },
                        {
                            text: "商品资料",
                            menu: [
                                {
                                    text: "商品管理",
                                    menu: [
                                        {
                                            text: "商品维护",
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.spwh', 'spwh');
                                                }
                                            }
                                        },
                                        {
                                            text: "商品促销",
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.spcx', 'spcx');
                                                }
                                            }
                                        },
                                        {
                                            text: "商品单位",
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.spdw', 'spdw');
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    text: "往来单位管理",
                                    menu: [
                                        {
                                            text: "地区信息",
                                            listeners: {
                                                click: function () {
                                                    me.myMenuClick(GLOBAL_PATH + 'js.wldwadder', 'wldwadder');
                                                }
                                            }
                                        },
                                        {
                                            text: "往来单位"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "其他金融",
                            menu: [
                                {text: "信用贷款"}
                            ]
                        },
                        {
                            text: "系统管理",
                            menu: [
                                {
                                    text: "用户权限配置"
                                },
                                {
                                    text: "用户登录日志"
                                }
                            ]
                        },
                        {
                            text: "帮助",
                            menu: [
                                {
                                    text: "版本更新"
                                },
                                {
                                    text: "系统锁定"
                                }
                            ]
                        },
                        '->',
                        {
                            iconCls: 'phone',
                            text: "400-544-045"
                        },
                        {
                            iconCls: 'service',
                            text: "客服在线"
                        },
                        {
                            text: "管理员",
                            menu: [
                                {
                                    text: "修改密码"
                                },
                                {
                                    text: "退出",
                                    listeners: {
                                        click: function () {
                                            window.location = "/logout/logout"
                                        }
                                    }
                                }
                            ]

                        }
                    ]

                },
                {
                    region: "west",
                    width: 50,
                    id: 'myMenu',
                    autoScroll: true,
                    collapsible: true,
                    items: me.menuList,
                    bodyStyle: {
                        backgroundColor: "#476F92"
                    }
                },
                {
                    region: "center",
                    xtype: "tabpanel",
                    id: "core",
                    items: [
                        {
                            title: '导航图',
                            layout: 'card',
                            id: 'card',
                            bodyStyle: {
                                backgroundImage: 'url("../../imgs/bei.jpg")',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize:'100%'
                            },
                            items: []
                        },
                        {
                            title:'天气',
                            bodyStyle: {
                                backgroundImage: 'url("../../imgs/bei.jpg")',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize:'100%'
                            },
                            html:'<iframe allowtransparency="true" frameborder="0" width="140" height="300" scrolling="on" src="http://tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=1&d=3&bd=0&k=000000&f=&q=1&e=1&a=1&c=54511&w=140&h=300&align=center"></iframe>'
                        }
                   ]

                },
                {
                    region: "south",
                    height: 50,
                    id: 'myBottom',
                    xtype: "toolbar",
                    items: ["->",
                        {
                            xtype: "tbtext",
                            text: "S·MEI AD © 版权",
                            style: {
                                fontSize: '15pt'
                            }
                        }
                    ]
                },
                {
                    region: 'east',
                    xtype: 'treepanel',
                    collapsible: true,
                    split: true,
                    id: 'westPanel',
                    width: 175,
                    store: store,
                    listeners: {
                        itemclick: function (tree, record) {
                            Ext.require(record.raw.power.url, function () {
                                var center = Ext.getCmp('core');
                                var tab = center.items.get(record.raw.power.urlId);
                                if (!tab) {
                                    var obj = Ext.create(record.raw.power.url);
                                    center.add(obj);
                                    center.setActiveTab(obj);
                                } else {
                                    if (center.getActiveTab() !== tab) {
                                        center.setActiveTab(tab);
                                    }
                                }
                            }, this);
                        }
                    }
                }
            ]
        });
        this.callParent();
        Ext.getCmp('westPanel').expandAll();

        window.setTimeout(function () {
            Ext.getCmp('myBottom').setHeight(49);
        }, 500);
    },
    menuList: new Array(),
    createlist: function () {
        var menu = {}, tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<img src="{imgurl}" style="margin-left:0px;"/>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: '/main/onemenu',
            async: false,
            success: function (response) {
                menu = Ext.JSON.decode(response.responseText);
            }
        });
        for (var i = 0; i < menu.tmlist.length; i++) {
            var store = 'store1' + i, item;
            Ext.create('Ext.data.Store', {
                id: store,
                data: menu.tmlist[i],
                fields: [
                    {
                        name: 'imgurl',
                        type: 'string'
                    },
                    {
                        name: "imgid",
                        type: "string"
                    },
                    {
                        name: "url",
                        type: "string"
                    },
                    {
                        name: "imgHoverUrl",
                        type: "string"
                    }
                ]
            });
            item = {
                xtype: 'panel',
                border: false,
                items: [
                    {
                        xtype: 'dataview',
                        store: Ext.data.StoreManager.lookup(store),
                        tpl: tpl,
                        itemSelector: 'div.part01',
                        listeners: {
                            itemclick: function (view, record, item) {
                                if (me.oldItem) {
                                    me.oldItem.children[0].src = me.oldPath;
                                }
                                me.oldItem = item;
                                me.oldPath = item.children[0].src;
                                item.children[0].src = record.get('imgHoverUrl');

                                Ext.require(record.get(GLOBAL_PATH + 'url'), function () {
                                    var center = Ext.getCmp('card');
                                    var tab = center.items.get(record.get('imgid'));
                                    var layout = Ext.getCmp('card').getLayout();
                                    if (!tab) {
                                        var obj = Ext.create(record.get(GLOBAL_PATH + 'url'), {mainMethod: me.myMenuClick});
                                        center.add(obj);
                                        layout.setActiveItem(obj);
                                    } else {
                                        layout.setActiveItem(tab.id);
                                    }
                                }, this);
                            }
                        }
                    }
                ]
            };
            me.menuList.push(item);
        }
    }
})
;

