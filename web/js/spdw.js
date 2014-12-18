/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.spdw",{
    id:"spdw",
   extend:"Ext.grid.Panel",
   initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
       var me=this;
       var mystore=Ext.create("Ext.data.Store",{
           pageSize:18,
           proxy:{
               type:"ajax",
               url:"/spdw/spdwpage",
               reader:{
                   type:"json",
                   root:"uilist",
                   totalProperty:'sumcount'
               }
           },
           fields:['unitId','name','status','remark'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {
                   var mcname=Ext.getCmp('mcname');
                   if(mcname){
                       if(mcname.getValue()){
                           if(operation.params){
                               operation.params.name=mcname.getValue();
                           }else{
                               operation.params={name:mcname.getValue()}
                           }
                       }
                   }
               }
           }
       });
       mystore.load({
           params:{
               start:0,
               limit:18
           }
       });
       Ext.apply(this,{
           title:"商品单位信息",
           //id:"spdw",
           store:mystore,
           closable:true,
           //添加到grid
           selModel:checkBox,
           disableSelection: false,//表示可以选择行
           columns:[
               {text:'单位编号',dataIndex:'unitId',isPrimaryKey: true},
               {text:'名称',dataIndex:'name'},
               {text:'状态',dataIndex:'status'},
               {text:'备注',dataIndex:'remark'}
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
                                   id:'mcname',
                                   labelWidth : 80,
                                   fieldLabel:'商品类别名称'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('spdw').store.load({
                                           params:{
                                               name:Ext.getCmp('mcname').getValue()
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
            title:'商品单位信息表',
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
                            fieldLabel:'商品单位名称',
                            name:'ui.name'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'ui.status',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr'
                        },{
                            fieldLabel:'备注',
                            name:'ui.remark'
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
        var record = Ext.getCmp('spdw').getSelectionModel().getSelection()[0];
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
                            fieldLabel:'商品单位名称',
                            value: record.get('name'),
                            name:'ui.name'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            value: record.get('status'),
                            readOnly:true,
                            name:'ui.status',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr'
                        },{
                            fieldLabel:'备注',
                            value: record.get('remark'),
                            name:'ui.remark'
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
        var record = Ext.getCmp('spdw').getSelectionModel().getSelection()[0];
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
                            fieldLabel:'递增流水号',
                            name:'ui.unitId',
                            value: record.get('unitId'),
                            hidden:true
                        },{
                            fieldLabel:'促销状态名称',
                            value: record.get('name'),
                            name:'ui.name'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            value: record.get('status'),
                            name:'ui.status',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr'
                        },{
                            fieldLabel:'备注',
                            value: record.get('remark'),
                            name:'ui.remark'
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
        var record = Ext.getCmp('spdw').getSelectionModel().getSelection();
        var list='';
        for (var i = 0, len = Ext.getCmp('spdw').getSelectionModel().getSelection().length; i < len; i++) {
            list += record[i].get('unitId');
            if (i != len - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + Ext.getCmp('spdw').getSelectionModel().getSelection().length + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/spdw/spdwdelmore?more=' + list,
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spdw').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spdw').store.reload();
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
        var record = Ext.getCmp('spdw').getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + record.get('name') + '】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/spdw/spdwdelone?ui.unitId=' + record.get('unitId'),
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spdw').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });[]
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spdw').store.reload();
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
                url:'/spdw/spdwinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spdw').store.reload();
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
                url:'/spdw/spdwinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spdw').store.reload();
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
                url:'/spdw/spdwupdate',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spdw').store.reload();
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