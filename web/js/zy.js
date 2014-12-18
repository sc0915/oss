/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.zy",{
    id:"jsyz",
   extend:"Ext.grid.Panel",
    pagenum:5,
   initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
       var me=this;
       var mystore=Ext.create("Ext.data.Store",{
           pageSize:me.pagenum,
           proxy:{
               type:"ajax",
               url:"/data/operpage",
               reader:{
                   type:"json",
                   root:"operlist",
                   totalProperty:'sumcount'
               }
           },
           fields:['id',
               'operId',
               'operName',
               'pwd',
               'address',
               'linkTel',
               'qq',
               'email',
               'mobile',
               'sortId',
               'state',
               'roleInfo.roleName',
               'roleInfo.roleId'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {                   
                   var gysmc=Ext.getCmp('zy_mc');
                   if(gysmc){
                       if(gysmc.getValue()){
                           if(operation.params){
                               operation.params.name=gysmc.getValue();
                           }else{
                               operation.params={name:gysmc.getValue()}
                           }
                       }
                   }
               }
           }
       });
       mystore.load({
           params:{
               start:0,
               limit:me.pagenum
           }
       });
       Ext.apply(this,{
           title:"职员信息",
           id:"js_zy",
           store:mystore,
           closable:true,
           //添加到grid
           selModel:checkBox,
           disableSelection: false,//表示可以选择行
           columns:[
               {text:'递增流水号',dataIndex:'id',hidden:true},
               {text:'操作员编码',dataIndex:'operId',isPrimaryKey: true},
               {text:'角色名称',dataIndex:'roleInfo.roleName'},
               {text:'操作员名称',dataIndex:'operName'},
               {text:'密码',dataIndex:'pwd'},
               {text:'地址',dataIndex:'address'},
               {text:'联系电话',dataIndex:'linkTel'},
               {text:'QQ',dataIndex:'qq'},
               {text:'Email',dataIndex:'email'},
               {text:'手机号码',dataIndex:'mobile'},
               {text:'排序编码',dataIndex:'sortId',hidden:true},
               {text:'状态',dataIndex:'state'}

           ],
           dockedItems:[{
               xtype:'pagingtoolbar',
               store:mystore,
               dock:'bottom',
               displayInfo:true
           }],
           tbar:[
               {
                   xtype:'panel',
                   border:false,
                   width:600,
                   layout:'vbox',
                   items:[
                       {
                           xtype:'panel',
                           border:false,
                           width:600,
                           layout : "column",
                           items:[
                               {
                                   xtype:'textfield',
                                   labelAlign:'right',
                                   name:'name',
                                   id:'zy_mc',
                                   labelWidth : 70,
                                   fieldLabel:'操作员名称'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('js_zy').store.load({
                                           params:{
                                               name:Ext.getCmp('zy_mc').getValue()
                                           }
                                       });
                                   }
                               }
                           ]
                       },{
                           xtype:'panel',
                           border:false,
                           width : 400,
                           items:[
                               {
                                   xtype:'button',
                                   text:'空白新增',
                                   handler: function () {me.insert(me)}
                               },{
                                   xtype:'button',
                                   text:'复制新增',
                                   handler:function(){me.copyinsert(me)}
                               },{
                                   xtype:'button',
                                   text:'修改',
                                   handler:function(){me.update(me)}
                               },{
                                   xtype:'button',
                                   text:'单条删除',
                                   handler:me.delone
                               },{
                                   xtype:'button',
                                   text:'多条删除',
                                   handler:me.delmore
                               }
                           ]
                       }
                   ]
               }



           ]
       });
       this.callParent();
   },
    insert: function (add) {
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":true, "name":"使用"},
                {"abbr":false, "name":"关闭"}
            ]
        });

        var role = Ext.create('Ext.data.Store', {
            fields: ['roleId', 'roleName'],
            proxy:{
                type:"ajax",
                url:"/store/operInfo",
                reader:{
                    type:"json",
                    root:"roleInfoList"
                }
            }
        });
        Ext.create('Ext.window.Window',{
            title:'添加职员',
            width:400,
            modal:true,
            items:[
                {
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'zy_insertform',
                    frame:true,
                    padding:5,
                    defaults:{
                        xtype:'textfield',
                        allowBlank:false,
                        labelWidth:90,
                        labelAlign:'right'
                    },
                    items:[
                        {
                            fieldLabel:'操作员编码',
                            name:'operInfo.operId'
                        },{
                            xtype:"combobox",
                            store:role,
                            fieldLabel:'角色名称',
                            name:'operInfo.roleInfo.roleName',
                            displayField: 'roleName',
                            valueField: 'roleId'
                        },{
                            fieldLabel:'操作员名称',
                            name:'operInfo.operName'
                        },{
                            fieldLabel:'密码',
                            name:'operInfo.pwd'
                        },{
                            fieldLabel:'地址',
                            name:'operInfo.address'
                        },{
                            fieldLabel:'联系电话',
                            name:'operInfo.linkTel'
                        },{
                            fieldLabel:'QQ',
                            name:'operInfo.qq'
                        },{
                            fieldLabel:'Email',
                            name:'operInfo.email'
                        },{
                            fieldLabel:'手机号码',
                            name:'operInfo.mobile'
                        },{
                            fieldLabel:'排序编码',
                            name:'operInfo.sortId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'operInfo.state',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr'
                        }
                    ]
                }
            ],
            buttonAlign:'center',
            buttons:[
                {
                    text:'添加',
                    handler:add.insertsql
                },
                {
                    text:'重置',
                    handler: function () {
                        Ext.getCmp('zy_insertform').getForm().reset();
                    }
                },{
                    text:'关闭',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
    },
    copyinsert: function (copyadd) {
        var record = Ext.getCmp('js_zy').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":true, "name":"使用"},
                {"abbr":false, "name":"关闭"}
            ]
        });
        var role = Ext.create('Ext.data.Store', {
            fields: ['roleId', 'roleName'],
            proxy:{
                type:"ajax",
                url:"/store/operInfo",
                reader:{
                    type:"json",
                    root:"roleInfoList"
                }
            }
        });
        Ext.create('Ext.window.Window',{
            title:'添加职员',
            width:400,
            modal:true,
            items:[
                {
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'zy_coryform',
                    frame:true,
                    padding:5,
                    defaults:{
                        xtype:'textfield',
                        allowBlank:false,
                        labelWidth:90,
                        labelAlign:'right'
                    },
                    items:[
                        {
                            fieldLabel:'操作员编码',
                            name:'operInfo.operId',
                            value:record.get('operId')
                        },{
                            xtype:"combobox",
                            store:role,
                            fieldLabel:'角色名称',
                            name:'operInfo.roleInfo.roleId',
                            displayField: 'roleName',
                            valueField: 'roleId',
                            value:record.get('roleInfo.roleId')
                        },{
                            fieldLabel:'操作员名称',
                            name:'operInfo.operName',
                            value:record.get('operName')
                        },{
                            fieldLabel:'密码',
                            name:'operInfo.pwd',
                            value:record.get('pwd')
                        },{
                            fieldLabel:'地址',
                            name:'operInfo.address',
                            value:record.get('address')
                        },{
                            fieldLabel:'联系电话',
                            name:'operInfo.linkTel',
                            value:record.get('linkTel')
                        },{
                            fieldLabel:'QQ',
                            name:'operInfo.qq',
                            value:record.get('qq')
                        },{
                            fieldLabel:'Email',
                            name:'operInfo.email',
                            value:record.get('email')
                        },{
                            fieldLabel:'手机号码',
                            name:'operInfo.mobile',
                            value:record.get('mobile')
                        },{
                            fieldLabel:'排序编码',
                            name:'operInfo.sortId',
                            value:record.get('sortId')
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'operInfo.state',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr',
                            value:record.get('state')
                        }
                    ]
                }
            ],
            buttonAlign:'center',
            buttons:[
                {
                    text:'添加',
                    handler:copyadd.copyinsertsql
                },
                {
                    text:'重置',
                    handler: function () {
                        Ext.getCmp('zy_coryform').getForm().reset();
                    }
                },{
                    text:'关闭',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
    },
    update: function (update) {
        var record = Ext.getCmp('js_zy').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":1, "name":"使用"},
                {"abbr":0, "name":"关闭"}
            ]
        });
        var role = Ext.create('Ext.data.Store', {
            fields: ['roleId', 'roleName'],
            proxy:{
                type:"ajax",
                url:"/store/operInfo",
                reader:{
                    type:"json",
                    root:"roleInfoList"
                }
            }
        });
        Ext.create('Ext.window.Window',{
            title:'修改职员',
            width:400,
            modal:true,
            items:[
                {
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'form',
                    frame:true,
                    padding:5,
                    defaults:{
                        xtype:'textfield',
                        allowBlank:false,
                        labelWidth:90,
                        labelAlign:'right'
                    },
                    items:[
                        {
                            fieldLabel:'操作员编码',
                            name:'operInfo.operId',
                            value:record.get('operId')
                        },{
                            xtype:"combobox",
                            store:role,
                            fieldLabel:'角色名称',
                            name:'operInfo.roleInfo.roleName',
                            displayField: 'roleName',
                            valueField: 'roleId',
                            value:record.get('roleInfo.roleName')
                        },{
                            fieldLabel:'操作员名称',
                            name:'operInfo.operName',
                            value:record.get('operName')
                        },{
                            fieldLabel:'密码',
                            name:'operInfo.pwd',
                            value:record.get('pwd')
                        },{
                            fieldLabel:'地址',
                            name:'operInfo.address',
                            value:record.get('address')
                        },{
                            fieldLabel:'联系电话',
                            name:'operInfo.linkTel',
                            value:record.get('linkTel')
                        },{
                            fieldLabel:'QQ',
                            name:'operInfo.qq',
                            value:record.get('qq')
                        },{
                            fieldLabel:'Email',
                            name:'operInfo.email',
                            value:record.get('email')
                        },{
                            fieldLabel:'手机号码',
                            name:'operInfo.mobile',
                            value:record.get('mobile')
                        },{
                            fieldLabel:'排序编码',
                            name:'operInfo.sortId',
                            value:record.get('sortId')
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'operInfo.state',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr',
                            value:record.get('state')
                        }
                    ]
                }
            ],
            buttonAlign:'center',
            buttons:[
                {
                    text:'修改',
                    handler:update.updatesql
                },
                {
                    text:'重置',
                    handler: function () {
                        Ext.getCmp('form').getForm().reset();
                    }
                },{
                    text:'关闭',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }).show();
    },
//    delmore: function () {
//        var record = Ext.getCmp('js_zy').getSelectionModel().getSelection();
//        var list='';
//        for (var i = 0, len = Ext.getCmp('js_zy').getSelectionModel().getSelection().length; i < len; i++) {
//            list += record[i].get('operInfoId');
//            if (i != len - 1) {
//                list += ',';
//            }
//        }
//        Ext.MessageBox.show({
//            title: '删除提示',
//            msg: '确实要删除数据【' + Ext.getCmp('js_zy').getSelectionModel().getSelection().length + '条】么?',
//            icon: Ext.MessageBox.WARNING,
//            buttons: Ext.MessageBox.YESNO,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    Ext.Ajax.request({
//                        url: '/restore/operInfodelet?more=' + list,
//                        success: function (response) {
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('js_zy').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.WARNING,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        },
//                        failure:function(response){
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('js_zy').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.QUESTION,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        }
//                    });
//                }
//            }
//        });
//    },
//    delone: function () {
//        var record = Ext.getCmp('js_zy').getSelectionModel().getSelection()[0];
//        Ext.MessageBox.show({
//            title: '删除提示',
//            msg: '确实要删除数据【' + record.get('operInfoId') + '条】么?',
//            icon: Ext.MessageBox.WARNING,
//            buttons: Ext.MessageBox.YESNO,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    Ext.Ajax.request({
//                        url: '/restore/operInfodel?operInfo.operInfoId=' + record.get('operInfoId'),
//                        success: function (response) {
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('js_zy').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.WARNING,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        },
//                        failure:function(response){
//                            var msg=Ext.JSON.decode(response.responseText);
//                            Ext.getCmp('js_zy').store.reload();
//                            Ext.MessageBox.show({
//                                title:'提示',
//                                msg:msg.message,
//                                icon:Ext.MessageBox.QUESTION,
//                                buttons:Ext.MessageBox.YES
//                            });
//                        }
//                    });
//                }
//            }
//        });
//    },
    insertsql: function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/data/operinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    if(msg.state){
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                        Ext.getCmp('js_zy').store.reload();
                    }else{
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                    }
                },
                failure: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:"网络超时，链接失败！",
                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES
                    });
                }
            });
        }
    },
    copyinsertsql:function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/data/operinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    if(msg.state){
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                        Ext.getCmp('js_zy').store.reload();
                    }else{
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                    }
                },
                failure: function (form,action) {
                   // var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:'网络超时！',                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES
                    });
                }
            });
        }
    },
    updatesql: function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/data/operupdate',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    if(msg.state){
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                        Ext.getCmp('js_zy').store.reload();
                    }else{
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                    }
                },
                failure: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES
                    });
                }
            });
        }
    }
});