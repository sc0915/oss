/**
 * Created by SC on 2014/12/6.
 */
Ext.define('js.yhqxpz', {
    extend: 'Ext.panel.Panel',
    pagenum: 5,
    initComponent: function () {
        var me = this;
        var rolestore = Ext.create('Ext.data.Store', {
            pageSize: me.pagenum,
            proxy: {
                type: "ajax",
                url: "/system/rolepage",
                reader: {
                    type: "json",
                    root: "roleInfoList",
                    totalProperty: 'sumcount'
                }
            },
            fields: [
                'id',
                'roleId',
                'roleName',
                'sortId',
                'state'
            ],
            autoLoad: false
        });
        rolestore.load({
            params: {
                start: 0,
                limit: me.pagenum
            }
        });
        Ext.apply(this, {
            layout: 'hbox',
            title: '用户权限',
            closable: true,
            items: [
                {
                    title: '用户权限操作',
                    xtype: 'grid',
                    id: 'yhqxpz',
                    border: false,
                    flex: 2,
                    store: rolestore,
                    columns: [
                        {text: '递增流水号', dataIndex: 'id', hidden: true},
                        {text: '角色编码', dataIndex: 'roleId', isPrimaryKey: true},
                        {text: '角色名称', dataIndex: 'roleName'},
                        {text: '排序编码', dataIndex: 'sortId'},
                        {text: '状态', dataIndex: 'state', renderer: function (value) {
                            if ((value == 'false') || (value == false)) {
                                return '未启用';
                            }
                            if ((value == 'true') || (true == value)) {
                                return '启用';
                            }
                        }
                        }
                    ],
                    listeners: {
                        select: function () {
                            var record = Ext.getCmp('yhqxpz').getSelectionModel().getSelection()[0];
                            Ext.Ajax.request({
                                url: '/system/roledistree',
                                params: {
                                    roleid: record.get('roleId')
                                },
                                async: false,
                                success: function (response) {
                                    me.jsonData = response.responseText;
                                    if (typeof(me.jsonData) === 'string') {
                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                        me.myDate = me.jsonData.node.children;
                                        Ext.getCmp("yhqxdispalytree").getRootNode().removeAll(false);
                                        Ext.getCmp("yhqxdispalytree").setRootNode(me.jsonData.node);
                                        Ext.getCmp("yhqxdispalytree").getRootNode().data.text = '角色对应权限';
                                        Ext.getCmp("yhqxdispalytree").expandAll();
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    html:'<table width="1px" height="90000px" border="0 " cellpadding="0" cellspacing="0" style="border-left:1px" >'+
                        '<tr>'+
                        '<td width="11"></td>'+
                        '</tr>'+
                        '</table>'
                },
                {
                    xtype: 'treepanel',
                    title: '权限查看',
                    id: 'yhqxdispalytree',
                    border: false,
                    flex: 1,
                    store: Ext.create("Ext.data.TreeStore", {
                        fields: [
                            { name: 'id', type: 'string', mapping: 'power.menuId'},
                            { name: 'text', type: 'string', mapping: 'power.text'}
                        ],
                        root: {
                            text: '角色对应权限',
                            id: '-1',
                            children: me.myDate
                        }
                    })
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: rolestore,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: '添加',
                    handler: function () {
                        me.insert(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '修改',
                    handler: function () {
                        me.updaterole(me)
                    }
                },
                {
                    xtype: 'button',
                    text: '删除',
                    handler: me.del
                },
                {
                    xtype: 'button',
                    text: '启用/禁用',
                    handler: me.dis
                }
            ]

        });
        this.callParent();
    },
    insert: function (add) {
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        Ext.Ajax.request({
            url: '/system/roletree',
            async: false,
            success: function (response) {
                jsonData = response.responseText;
                if (typeof(jsonData) === 'string') {
                    jsonData = Ext.JSON.decode(jsonData);
                }
            }
        });
        var role_treestore = Ext.create("Ext.data.TreeStore", {
            id: 'role_treeid',
            fields: [
                { name: 'id', type: 'string', mapping: 'power.menuId'},
                { name: 'text', type: 'string', mapping: 'power.text'}
            ],
            root: {
                text: '角色对应权限',
                id: '-1',
                children: jsonData.node.children
            }
        });
        Ext.create('Ext.window.Window', {
            title: '添加角色',
            width: 400,
            modal: true,
            height: 500,
            layout: 'border',
            items: [
                {
                    region: 'north',
                    items: [
                        {
                            xtype: 'form',
                            layout: 'form',
                            id: 'role_form',
                            frame: true,
                            border: false,
                            padding: 5,
                            defaults: {
                                xtype: 'textfield',
                                allowBlank: false,
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    fieldLabel: '角色编码',
                                    name: 'roleId'
                                },
                                {
                                    fieldLabel: '角色名称',
                                    name: 'roleName'
                                },
                                {
                                    fieldLabel: '排序编码',
                                    name: 'sortId'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '状态',
                                    name: "state",
                                    store: states,
                                    displayField: 'name',
                                    valueField: 'abbr'
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    height: 250,
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'treepanel',
                            border: false,
                            title: '权限选择',
                            autoScroll: true,
                            id: 'role_tree',
                            store: role_treestore,
                            listeners: {
                                checkchange: function (node, checked) {
                                    node.expand();
                                    node.checked = checked;

                                    if (true == checked) {
                                        var parent_node = node.parentNode;
                                        while (parent_node != null) {
                                            parent_node.set('checked', checked);
                                            parent_node = parent_node.parentNode;
                                        }
                                    }
                                    node.eachChild(function (child) {
                                        child.set('checked', checked);
                                        child.fireEvent('checkchange', child, checked);
                                    });
                                    if (Ext.getCmp("role_tree").getRootNode().data.id == "-1") {
                                        Ext.getCmp("role_tree").getRootNode().data.checked = false;
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '添加',
                    handler: add.insertsql
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('role_form').getForm().reset();
                    }
                },
                {
                    text: '关闭',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
        Ext.getCmp('role_tree').expandAll();
    },
    insertsql: function () {
        var roleform = {};
        var formdata = Ext.getCmp('role_form').query();
        Ext.each(formdata, function (item) {
            if (item) {
                if (item.xtype == 'combobox' || item.xtype == 'textfield') {
                    roleform[item.name] = item.lastValue;
                }
            }
        });
        var roletree = [];
        var treegrid = Ext.getCmp('role_tree').getChecked();
        Ext.each(treegrid, function (node, index) {
            if (node.data.id != '-1') {
                roletree[index] = {};
                roletree[index].menuId = node.data.id
            }
        });
        var form = Ext.create('Ext.form.Panel', {

        });
        form.submit({
            url: '/system/roleinsert',
            jsonSubmit: true,
            params: {
                roleInfo: roleform,
                powerlist: roletree
            },
            success: function (form, action) {
                var msg = Ext.JSON.decode(action.response.responseText);
                if (msg.state) {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('yhqxpz').store.reload();
                } else {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                }
            },
            failure: function (form, action) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: '网络连接超时！',
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.MessageBox.YES
                });
            }
        });
    },
    updaterole: function (update) {
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "true", "name": "使用"},
                {"abbr": "false", "name": "停用"}
            ]
        });
        Ext.Ajax.request({
            url: '/system/roletree',
            async: false,
            success: function (response) {
                jsonData = response.responseText;
                if (typeof(jsonData) === 'string') {
                    jsonData = Ext.JSON.decode(jsonData);
                }
            }
        });
        var role_treestore = Ext.create("Ext.data.TreeStore", {
            id: 'role_updatetree',
            fields: [
                { name: 'id', type: 'string', mapping: 'power.menuId'},
                { name: 'text', type: 'string', mapping: 'power.text'}
            ],
            root: {
                text: '角色对应权限',
                id: '-1',
                children: jsonData.node.children
            }
        });
        var record = Ext.getCmp('yhqxpz').getSelectionModel().getSelection()[0];
        Ext.create('Ext.window.Window', {
            title: '添加角色',
            width: 400,
            modal: true,
            height: 500,
            layout: 'border',
            items: [
                {
                    region: 'north',
                    items: [
                        {
                            xtype: 'form',
                            layout: 'form',
                            id: 'role_updateform',
                            frame: true,
                            border: false,
                            padding: 5,
                            defaults: {
                                xtype: 'textfield',
                                allowBlank: false,
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    fieldLabel: '角色编码',
                                    name: 'roleId',
                                    value: record.get('roleId')
                                },
                                {
                                    fieldLabel: '角色名称',
                                    name: 'roleName',
                                    value: record.get('roleName')
                                },
                                {
                                    fieldLabel: '排序编码',
                                    name: 'sortId',
                                    value: record.get('sortId')
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '状态',
                                    name: "state",
                                    store: states,
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    value: record.get('state')
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'center',
                    height: 250,
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'treepanel',
                            border: false,
                            title: '权限选择',
                            autoScroll: true,
                            id: 'updata_qxtree',
                            store: role_treestore,
                            listeners: {
                                'checkchange': function (node, checked) {
                                    node.expand();
                                    node.checked = checked;

                                    if (true == checked) {
                                        var parent_node = node.parentNode;
                                        while (parent_node != null) {
                                            parent_node.set('checked', checked);
                                            parent_node = parent_node.parentNode;
                                        }
                                    }
                                    node.eachChild(function (child) {
                                        child.set('checked', checked);
                                        child.fireEvent('checkchange', child, checked);
                                    });
                                    if (Ext.getCmp("roletreeinsert").getRootNode().data.id == "-1") {
                                        Ext.getCmp("roletreeinsert").getRootNode().data.checked = false;
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    text: '更新',
                    handler: function () {
                        update.updatasql(update)
                    }
                },
                {
                    text: '重置',
                    handler: function () {
                        Ext.getCmp('role_updateform').getForm().reset();
                    }
                },
                {
                    text: '关闭',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
        Ext.getCmp('updata_qxtree').expandAll();
    },
    updatasql: function (chuan) {
        var roleupdateform = {};
        var formdata = Ext.getCmp('role_updateform').query();
        Ext.each(formdata, function (item) {
            if (item) {
                if (item.xtype == 'combobox' || item.xtype == 'textfield') {
                    roleupdateform[item.name] = item.lastValue;
                }
            }
        });
        var roletree = [];
        var treegrid = Ext.getCmp('role_tree').getChecked();
        Ext.each(treegrid, function (node, index) {
            if (node.data.id != '-1') {
                roletree[index] = {};
                roletree[index].menuId = node.data.id
            }
        });
        var form = Ext.create('Ext.form.Panel', {

        });
        if (chuan.postRoleIdData == null) {
            chuan.postRoleIdData = [];
        }
        form.submit({
            url: '/system/roleupdate',
            jsonSubmit: true,
            params: {
                roleInfo: roleupdateform,
                powerlist: roletree
            },
            success: function (form, action) {
                var msg = Ext.JSON.decode(action.response.responseText);
                if (msg.state) {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    Ext.getCmp('yhqxpz').store.reload();
                } else {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                }
            },
            failure: function (form, action) {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: '网络连接超时！',
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.MessageBox.YES
                });
            }
        });
    },
    del: function () {
        var record = Ext.getCmp('yhqxpz').getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + record.get('roleName') + '】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/system/roledel?roleInfo.roleId=' + record.get('roleId'),
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            if (msg.state) {
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('yhqxpz').store.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.getCmp('yhqxpz').store.reload();
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '网络超时！',
                                icon: Ext.MessageBox.QUESTION,
                                buttons: Ext.MessageBox.YES
                            });
                        }
                    });
                }
            }
        });
    },
    dis: function () {
        var record = Ext.getCmp('yhqxpz').getSelectionModel().getSelection()[0];
        var messagestate = "";
        var sta = "";
        if (record.get('state') == true) {
            messagestate = '禁用';
            sta = false;
        } else {
            messagestate = '启用';
            sta = true;
        }
        Ext.MessageBox.show({
            title: '' + messagestate + '提示',
            msg: '确实要' + messagestate + '【' + record.get('roleName') + '】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/system/roledis?roleInfo.roleId=' + record.get('roleId'),
                        params: {
                            rolesta: sta
                        },
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            if (msg.state) {
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('yhqxpz').store.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                            }
                        },
                        failure: function (response) {
                            Ext.getCmp('yhqxpz').store.reload();
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '网络超时！',
                                icon: Ext.MessageBox.QUESTION,
                                buttons: Ext.MessageBox.YES
                            });
                        }
                    });
                }
            }
        });
    }
});