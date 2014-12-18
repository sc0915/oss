/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.spwh",{
    id:"spwh",
   extend:"Ext.grid.Panel",
   initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
       var me=this;
       var mystore=Ext.create("Ext.data.Store",{
           pageSize:18,
           proxy:{
               type:"ajax",
               url:"/drp/spwhpage",
               reader:{
                   type:"json",
                   root:"tmmcilist",
                   totalProperty:'sumcount'
               }
           },
           fields:['id','merchandiseCid','merchandiseCName','sortId','state'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {
                   var mcz=Ext.getCmp('mcz');
                   if(mcz){
                       if(mcz.getValue()){
                           if(operation.params){
                               operation.params.name=mcz.getValue();
                           }else{
                               operation.params={name:mcz.getValue()}
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
           title:"商品维护",
           //id:"spwh",
           store:mystore,
           closable:true,
           //添加到grid
           selModel:checkBox,
           disableSelection: false,//表示可以选择行
           columns:[
               {text:'递增流水号',dataIndex:'id',hidden:true},
               {text:'商品类别编码',dataIndex:'merchandiseCid',isPrimaryKey: true},
               {text:'商品类别名称',dataIndex:'merchandiseCName'},
               {text:'排序编码',dataIndex:'sortId'},
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
                           width:300,
                           layout : "column",
                           items:[
                               {
                                   xtype:'textfield',
                                   labelAlign:'right',
                                   name:'name',
                                   id:'mcz',
                                   labelWidth : 80,
                                   fieldLabel:'商品类别名称'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('spwh').store.load({
                                           params:{
                                               name:Ext.getCmp('mcz').getValue()
                                           }
                                       });
                                   }
                               }
                           ]
                       }
                       ,{

                           border:false,
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
                       }]//
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
            title:'商品类别信息表',
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
                            fieldLabel:'商品类别编码',
                            name:'tmmci.merchandiseCid'
                        },{
                            fieldLabel:'商品类别名称',
                            name:'tmmci.merchandiseCName'
                        },{
                            fieldLabel:'排序编码',
                            name:'tmmci.sortId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'tmmci.state',
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
        var record = Ext.getCmp('spwh').getSelectionModel().getSelection()[0];
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
                            fieldLabel:'商品类别编码',
                            name:'tmmci.merchandiseCid',
                            value: record.get('merchandiseCid')
                        },{
                            fieldLabel:'商品类别名称',
                            name:'tmmci.merchandiseCName',
                            value: record.get('merchandiseCName')
                        },{
                            fieldLabel:'排序编码',
                            name:'tmmci.sortId',
                            value: record.get('sortId')
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'tmmci.state',
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
        var record = Ext.getCmp('spwh').getSelectionModel().getSelection()[0];
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
                            fieldLabel:'商品类别编码',
                            name:'tmmci.merchandiseCid',
                            value: record.get('merchandiseCid'),
                            readOnly:true
                        },{
                            fieldLabel:'商品类别名称',
                            name:'tmmci.merchandiseCName',
                            value: record.get('merchandiseCName')
                        },{
                            fieldLabel:'排序编码',
                            name:'tmmci.sortId',
                            value: record.get('sortId'),
                            readOnly:true
                        },{
                            xtype:'combobox',
                            fieldLabel:'状态',
                            name:'tmmci.state',
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
        var record = Ext.getCmp('spwh').getSelectionModel().getSelection();
        var list='';
        for (var i = 0, len = Ext.getCmp('spwh').getSelectionModel().getSelection().length; i < len; i++) {
            list += record[i].get('merchandiseCid');
            if (i != len - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + Ext.getCmp('spwh').getSelectionModel().getSelection().length + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/drp/spwhdeletemore?more=' + list,
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spwh').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spwh').store.reload();
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
        var record = Ext.getCmp('spwh').getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + record.get('merchandiseCName') + '】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/drp/spwhdeleteone?tmmci.merchandiseCid=' + record.get('merchandiseCid'),
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spwh').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('spwh').store.reload();
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
                url:'/drp/spwhinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spwh').store.reload();
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
                url:'/drp/spwhinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spwh').store.reload();
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
                url:'/drp/spwhdupdage',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('spwh').store.reload();
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