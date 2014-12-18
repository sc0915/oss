/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.sp",{
   extend:"Ext.grid.Panel",
    width: 500,
   initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
       var me=this;
       var mystore=Ext.create("Ext.data.Store",{
           pageSize:18,
           proxy:{
               type:"ajax",
               url:"/data/tmmipage",
               reader:{
                   type:"json",
                   root:"tmmilist",
                   totalProperty:'sumcount'
               }
           },
           fields:['id',
               'merchandiseId',
               'merchandiseName',
               'merchandiseAb',
               'price',
               'saleStatus',
               'spec',
               'remark',
               'clickCount',
               'picPath',
               'describe',
               'proStatusInfo.proStatusName',
               'merchandiseCInfo.merchandiseCName',
               'unitInfo.name'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {
                   var gysmc=Ext.getCmp('gmc');
                   var gysbm=Ext.getCmp('bm');
                   if(gysmc||gysbm){
                       if(gysmc.getValue()||gysbm.getValue()){
                           if(operation.params){
                               operation.params.gysname=gysmc.getValue();
                               operation.params.num=gysbm.getValue();
                           }else{
                               operation.params={gysname:gysmc.getValue()}
                               operation.params={num:gysbm.getValue()}
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
           title:"商品信息",
           id:"jsspshowdata",
           store:mystore,
           closable:true,
           autoScroll: true,
           //添加到grid
           selModel:checkBox,
           disableSelection: false,//表示可以选择行
           columns:[
               {text:'递增流水号',dataIndex:'id',hidden:true},
               {text:'商品编码',dataIndex:'merchandiseId',hidden:true},
               {text:'商品名称',dataIndex:'merchandiseName'},
               {text:'商品助记码',dataIndex:'merchandiseAb'},
               {text:'商品价格',dataIndex:'price'},
               {text:'销售状态',dataIndex:'saleStatus'},
               {text:'规格',dataIndex:'spec'},
               {text:'描述',dataIndex:'describe'},
               {text:'促销状态编码',dataIndex:'proStatusInfo.proStatusName'},
               {text:'商品类别编码',dataIndex:'merchandiseCInfo.merchandiseCName'},
               {text:'单位编码',dataIndex:'unitInfo.name'},
               {text:'图片',dataIndex:'picPath'},
               {text:'点击数',dataIndex:'clickCount'},
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
                                   labelWidth : 70,
                                   name:'gysname',
                                   id:'bm',
                                   fieldLabel:'商品名称'
                               },{
                                   xtype:'textfield',
                                   labelAlign:'right',
                                   name:'num',
                                   id:'gmc',
                                   labelWidth : 70,
                                   fieldLabel:'助记码'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('jsspshowdata').store.load({
                                           params:{
                                               gysname:Ext.getCmp('bm').getValue(),
                                               num:Ext.getCmp('gmc').getValue()
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
    insert: function (add){
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        var tmmicA = Ext.create('Ext.data.Store', {
            fields: ['merchandiseCid', 'merchandiseCName'],
            proxy:{
                type:"ajax",
                url:"/drp/spwhpage",
                reader:{
                    type:"json",
                    root:"tmmcilist"
                }
            }
        });
        var tmpsA = Ext.create('Ext.data.Store', {
            fields: ['proStatusId', 'proStatusName'],
            proxy:{
                type:"ajax",
                url:"/spcx/spcxpage",
                reader:{
                    type:"json",
                    root:"tmpsilist"
                }
            }
        });
        var tmuA = Ext.create('Ext.data.Store', {
            fields: ['unitId', 'name'],
            proxy:{
                type:"ajax",
                url:"/spdw/spdwpage",
                reader:{
                    type:"json",
                    root:"uilist"
                }
            }
        });
        Ext.create('Ext.window.Window',{
            title:'添加商品',
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
                            fieldLabel:'商品名称',
                            name:'tmminfo.merchandiseName'
                        },{
                            fieldLabel:'商品价格',
                            name:'tmminfo.price'
                        },{
                            xtype:'combobox',
                            fieldLabel:'销售状态',
                            name:'tmminfo.saleStatus',
                            store: states,
                            displayField: 'name',
                            valueField: 'abbr'
                        },{
                            fieldLabel:'规格',
                            name:'tmminfo.spec'
                        },{
                            fieldLabel:'描述',
                            name:'tmminfo.describe'
                        },{
                            xtype:'combobox',
                            fieldLabel:'促销状态编码',
                            name:'tmminfo.proStatusInfo.proStatusId',
                            store: tmpsA,
                            displayField: 'proStatusName',
                            valueField: 'proStatusId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'商品类别编码',
                            name:'tmminfo.merchandiseCInfo.merchandiseCid',
                            store: tmmicA,
                            displayField: 'merchandiseCName',
                            valueField: 'merchandiseCid'
                        },{
                            xtype:'combobox',
                            fieldLabel:'单位编码',
                            name:'tmminfo.unitInfo.name',
                            store: tmuA,
                            displayField: 'name',
                            valueField: 'unitId'
                        },{
                            fieldLabel:'图片',
                            name:'tmminfo.picPath'
                        },{
                            fieldLabel:'点击数',
                            name:'tmminfo.clickCount',
                            readOnly:true,
                            value:0
                        },{
                            fieldLabel:'备注',
                            name:'tmminfo.remark'
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
        var record = Ext.getCmp('jsspshowdata').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        var tmmicA = Ext.create('Ext.data.Store', {
            fields: ['merchandiseCid', 'merchandiseCName'],
            proxy:{
                type:"ajax",
                url:"/drp/spwhpage",
                reader:{
                    type:"json",
                    root:"tmmcilist"
                }
            }
        });
        var tmpsA = Ext.create('Ext.data.Store', {
            fields: ['proStatusId', 'proStatusName'],
            proxy:{
                type:"ajax",
                url:"/spcx/spcxpage",
                reader:{
                    type:"json",
                    root:"tmpsilist"
                }
            }
        });
        var tmuA = Ext.create('Ext.data.Store', {
            fields: ['unitId', 'name'],
            proxy:{
                type:"ajax",
                url:"/spdw/spdwpage",
                reader:{
                    type:"json",
                    root:"uilist"
                }
            }
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
                            fieldLabel:'商品名称',
                            value: record.get('merchandiseName'),
                            name:'tmminfo.merchandiseName'
                        },{
                            fieldLabel:'商品价格',
                            value: record.get('price'),
                            name:'tmminfo.price'
                        },{
                            xtype:'combobox',
                            fieldLabel:'销售状态',
                            name:'tmminfo.saleStatus',
                            store: states,
                            displayField: 'name',
                            value: record.get('abbr'),
                            valueField: 'abbr'
                        },{
                            fieldLabel:'规格',
                            value: record.get('spec'),
                            name:'tmminfo.spec'
                        },{
                            fieldLabel:'描述',
                            value: record.get('describe'),
                            name:'tmminfo.describe'
                        },{
                            xtype:'combobox',
                            fieldLabel:'促销状态编码',
                            store: tmpsA,
                            displayField: 'proStatusName',
                            valueField: 'proStatusId',
                            value: record.get('proStatusInfo.proStatusId'),
                            name:'tmminfo.proStatusInfo.proStatusId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'商品类别编码',
                            store: tmmicA,
                            displayField: 'merchandiseCName',
                            valueField: 'merchandiseCid',
                            value: record.get('merchandiseCInfo.merchandiseCid'),
                            name:'tmminfo.merchandiseCInfo.merchandiseCid'
                        },{
                            xtype:'combobox',
                            fieldLabel:'单位编码',
                            store: tmuA,
                            displayField: 'name',
                            valueField: 'unitId',
                            name:'tmminfo.unitInfo.unitId',
                            value: record.get('unitInfo.unitId')
                        },{
                            fieldLabel:'图片',
                            name:'tmminfo.picPath',
                            value: record.get('picPath')
                        },{
                            fieldLabel:'点击数',
                            name:'tmminfo.clickCount',
                            readOnly:true,
                            value:0
                        },{
                            fieldLabel:'备注',
                            value: record.get('remark'),
                            name:'tmminfo.remark'
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
        var record = Ext.getCmp('jsspshowdata').getSelectionModel().getSelection()[0];
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"true", "name":"使用"},
                {"abbr":"false", "name":"停用"}
            ]
        });
        var tmmicA = Ext.create('Ext.data.Store', {
            fields: ['merchandiseCid', 'merchandiseCName'],
            proxy:{
                type:"ajax",
                url:"/drp/spwhpage",
                reader:{
                    type:"json",
                    root:"tmmcilist"
                }
            }
        });
        var tmpsA = Ext.create('Ext.data.Store', {
            fields: ['proStatusId', 'proStatusName'],
            proxy:{
                type:"ajax",
                url:"/spcx/spcxpage",
                reader:{
                    type:"json",
                    root:"tmpsilist"
                }
            }
        });
        var tmuA = Ext.create('Ext.data.Store', {
            fields: ['unitId', 'name'],
            proxy:{
                type:"ajax",
                url:"/data/tmu",
                reader:{
                    type:"json",
                    root:"tmulist"
                }
            }
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
                            fieldLabel:'商品编号',
                            value: record.get('merchandiseId'),
                            name:'tmmi.merchandiseId',
                            hidden:true
                        },{
                            fieldLabel:'商品名称',
                            value: record.get('merchandiseName'),
                            name:'tmmi.merchandiseName'
                        },{
                            fieldLabel:'商品助记码',
                            value: record.get('merchandiseAb'),
                            name:'tmmi.merchandiseAb'
                        },{
                            fieldLabel:'商品价格',
                            value: record.get('price'),
                            name:'tmmi.price'
                        },{
                            xtype:'combobox',
                            fieldLabel:'销售状态',
                            name:'tmmi.saleStatus',
                            store: states,
                            displayField: 'name',
                            value: record.get('abbr'),
                            valueField: 'abbr'
                        },{
                            fieldLabel:'规格',
                            value: record.get('spec'),
                            name:'tmmi.spec'
                        },{
                            fieldLabel:'描述',
                            value: record.get('describe'),
                            name:'tmmi.describe'
                        },{
                            xtype:'combobox',
                            fieldLabel:'促销状态编码',
                            name:'tmmi.proStatusInfo.proStatusId',
                            store: tmpsA,
                            displayField: 'proStatusName',
                            value: record.get('proStatusId'),
                            valueField: 'proStatusId'
                        },{
                            xtype:'combobox',
                            fieldLabel:'商品类别编码',
                            name:'tmmi.merchandiseCInfo.merchandiseCid',
                            store: tmmicA,
                            displayField: 'merchandiseCName',
                            value: record.get('merchandiseCid'),
                            valueField: 'merchandiseCid'
                        },{
                            xtype:'combobox',
                            fieldLabel:'单位编码',
                            name:'tmmi.unitInfo.unitId',
                            store: tmuA,
                            displayField: 'name',
                            value: record.get('unitId'),
                            valueField: 'unitId'
                        },{
                            fieldLabel:'图片',
                            name:'tmmi.picPath',
                            value: record.get('picPath')
                        },{
                            fieldLabel:'点击数',
                            name:'tmmi.clickCount',
                            readOnly:true,
                            value:0
                        },{
                            fieldLabel:'备注',
                            value: record.get('remark'),
                            name:'tmmi.remark'
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
        var record = Ext.getCmp('jsspshowdata').getSelectionModel().getSelection();
        var list='';
        for (var i = 0, len = Ext.getCmp('jsspshowdata').getSelectionModel().getSelection().length; i < len; i++) {
            list += record[i].get('merchandiseId');
            if (i != len - 1) {
                list += ',';
            }
        }
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + Ext.getCmp('jsspshowdata').getSelectionModel().getSelection().length + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/data/tmmidelmore?more=' + list,
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('jsspshowdata').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('jsspshowdata').store.reload();
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
        var record = Ext.getCmp('jsspshowdata').getSelectionModel().getSelection()[0];
        Ext.MessageBox.show({
            title: '删除提示',
            msg: '确实要删除数据【' + record.get('merchandiseName') + '条】么?',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.MessageBox.YESNO,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: '/data/tmmidelone?tmmi.merchandiseId=' + record.get('merchandiseId'),
                        success: function (response) {
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('jsspshowdata').store.reload();
                            Ext.MessageBox.show({
                                title:'提示',
                                msg:msg.message,
                                icon:Ext.MessageBox.WARNING,
                                buttons:Ext.MessageBox.YES
                            });
                        },
                        failure:function(response){
                            var msg=Ext.JSON.decode(response.responseText);
                            Ext.getCmp('jsspshowdata').store.reload();
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
                url:'/data/tmmiinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('jsspshowdata').store.reload();
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
                url:'/data/tmmiinsert',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('jsspshowdata').store.reload();
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
                url:'/data/tmmiupdate',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('jsspshowdata').store.reload();
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

