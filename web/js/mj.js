/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.mj",{
   extend:"Ext.grid.Panel",
    pagenum:18,
   initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
       var me=this;
       var mystore=Ext.create("Ext.data.Store",{
           pageSize:me.pagenum,
           proxy:{
               type:"ajax",
               url:"/restore/supplier",
               reader:{
                   type:"json",
                   root:"supplierlist",
                   totalProperty:'sumcount'
               }
           },
           fields:['id','supplierId','supplierName','supplierAb','address','linkName','linkTel','qq','email','sortId','state'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {
                   var gysbm=Ext.getCmp('g_bm');
                   var gysmc=Ext.getCmp('g_mc');
                   if(gysbm||gysmc){
                       if(gysbm.getValue()||gysmc.getValue()){
                           if(operation.params){
                               operation.params.num=gysbm.getValue();
                               operation.params.gysname=gysmc.getValue();
                           }else{
                               operation.params={num:gysbm.getValue()}
                               operation.params={gysname:gysmc.getValue()}
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
           title:"供应商信息",
           id:"mj",
           store:mystore,
           closable:true,
           //添加到grid
           selModel:checkBox,
           disableSelection: false,//表示可以选择行
           columns:[
               {text:'递增流水号',dataIndex:'id',hidden:true},
               {text:'供应商编码',dataIndex:'supplierId',isPrimaryKey: true},
               {text:'供应商名称',dataIndex:'supplierName'},
               {text:'供应商助记码',dataIndex:'supplierAb'},
               {text:'地址',dataIndex:'address'},
               {text:'联系人',dataIndex:'linkName'},
               {text:'联系电话',dataIndex:'linkTel'},
               {text:'QQ',dataIndex:'qq'},
               {text:'Email',dataIndex:'email'},
               {text:'排序编码',dataIndex:'sortId',hidden:true},
               //修改的时候可以显示中文
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
                                   labelWidth : 70,
                                   name:'num',
                                   id:'g_bm',
                                   fieldLabel:'供应商编码'
                               },{
                                   xtype:'textfield',
                                   labelAlign:'right',
                                   name:'gysname',
                                   id:'g_mc',
                                   labelWidth : 70,
                                   fieldLabel:'供应商名称'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('mj').store.load({
                                           params:{
                                               num:Ext.getCmp('g_bm').getValue(),
                                               gysname:Ext.getCmp('g_mc').getValue()
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
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        Ext.create('Ext.window.Window',{
            title:'添加供应商',
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
                            fieldLabel:'供应商编码',
                            name:'supplier.supplierId'
                        },{
                            fieldLabel:'供应商名称',
                            name:'supplier.supplierName'
                        },{
                            fieldLabel:'地址',
                            name:'supplier.address'
                        },{
                            fieldLabel:'联系人',
                            name:'supplier.linkName'
                        },{
                            fieldLabel:'联系电话',
                            name:'supplier.linkTel'
                        },{
                            fieldLabel:'QQ',
                            name:'supplier.qq'
                        },{
                            fieldLabel:'Email',
                            name:'supplier.email'
                        },{
                            fieldLabel:'排序编码',
                            name:'supplier.sortId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'supplier.state',
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
    copyinsert: function (copyadd) {
        var record = Ext.getCmp('mj').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        Ext.create('Ext.window.Window',{
            title:'添加供应商',
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
                            fieldLabel:'供应商编码',
                            name:'supplier.supplierId',
                            value: record.get('supplierId')
                        },{
                            fieldLabel:'供应商名称',
                            name:'supplier.supplierName',
                            value: record.get('supplierName')
                        },{
                            fieldLabel:'地址',
                            name:'supplier.address',
                            value: record.get('address')
                        },{
                            fieldLabel:'联系人',
                            name:'supplier.linkName',
                            value: record.get('linkName')
                        },{
                            fieldLabel:'联系电话',
                            name:'supplier.linkTel',
                            value: record.get('linkTel')
                        },{
                            fieldLabel:'QQ',
                            name:'supplier.qq',
                            value: record.get('qq')
                        },{
                            fieldLabel:'Email',
                            name:'supplier.email',
                            value: record.get('email')
                        },{
                            fieldLabel:'排序编码',
                            name:'supplier.sortId',
                            value: record.get('sortId')
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'supplier.state',
                            value: record.get('state'),
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
                    handler:copyadd.copyinsertsql
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
    update: function (update) {
        var record = Ext.getCmp('mj').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        Ext.create('Ext.window.Window',{
            title:'添加供应商',
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
                            fieldLabel:'供应商编码',
                            name:'supplier.supplierId',
                            value: record.get('supplierId'),
                            readOnly:true
                        },{
                            fieldLabel:'供应商名称',
                            name:'supplier.supplierName',
                            value: record.get('supplierName')
                        },{
                            fieldLabel:'供应商助记码',
                            name:'supplier.supplierAb',
                            value: record.get('supplierAb')
                        },{
                            fieldLabel:'地址',
                            name:'supplier.address',
                            value: record.get('address')
                        },{
                            fieldLabel:'联系人',
                            name:'supplier.linkName',
                            value: record.get('linkName')
                        },{
                            fieldLabel:'联系电话',
                            name:'supplier.linkTel',
                            value: record.get('linkTel')
                        },{
                            fieldLabel:'QQ',
                            name:'supplier.qq',
                            value: record.get('qq')
                        },{
                            fieldLabel:'Email',
                            name:'supplier.email',
                            value: record.get('email')
                        },{
                            fieldLabel:'排序编码',
                            name:'supplier.sortId',
                            value: record.get('sortId'),
                            readOnly:true
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'supplier.state',
                            value: record.get('state'),
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
    delmore: function () {
        var record = Ext.getCmp('mj').getSelectionModel().getSelection();
        var list='';
        for (var i = 0, len = Ext.getCmp('mj').getSelectionModel().getSelection().length; i < len; i++) {
            list += record[i].get('supplierId');
            if (i != len - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + Ext.getCmp('mj').getSelectionModel().getSelection().length + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/restore/supplierdelet?more=' + list,
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('mj').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('mj').store.reload();
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
    },
    delone: function () {
        var record = Ext.getCmp('mj').getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + record.get('supplierId') + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/restore/supplierdel?supplier.supplierId=' + record.get('supplierId'),
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('mj').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('mj').store.reload();
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
    },
    insertsql: function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/restore/supplierinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('mj').store.reload();
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
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
    },
    copyinsertsql:function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/restore/supplierinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('mj').store.reload();
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
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
    },
    updatesql: function () {
        var form=this.up('window').down('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/restore/supplierupdate',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('mj').store.reload();
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.WARNING,
                        buttons:Ext.MessageBox.YES
                    });
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