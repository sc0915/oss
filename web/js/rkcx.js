/**
 * Created by SC on 2014/11/16.
 */
Ext.define("js.rkcx", {
    id: 'rkcx',
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',
    nowEditRecord: {},
    initComponent: function () {
        var curDate = new Date();
        var curtime = Ext.Date.format(curDate, 'Y-m-d H:i:s');
        var me = this, mystore, myrkcxstore, callEditing, instocktype, callEditingnote, merinfo, oper, supplier;
        supplier = Ext.create('Ext.data.Store', {
            fields: ['supplierId', 'supplierName'],
            proxy: {
                type: "ajax",
                url: "/store/tBaSupplierInfo",
                reader: {
                    type: "json",
                    root: "tBaSupplierInfoList"
                }
            }
        });
        oper = Ext.create('Ext.data.Store', {
            fields: ['operId', 'operName'],
            proxy: {
                type: "ajax",
                url: "/store/tAuOperInfo",
                reader: {
                    type: "json",
                    root: "tAuOperInfoList"
                }
            }
        });
        merinfo = Ext.create('Ext.data.Store', {
            fields: ['merchandiseId', 'merchandiseName'],
            proxy: {
                type: "ajax",
                url: "/store/tMeMerchandiseInfo",
                reader: {
                    type: "json",
                    root: "tMeMerchandiseInfoList"
                }
            }
        });
        instocktype = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": 1, "name": "正常入库"},
                {"abbr": 2, "name": "报溢"},
                {"abbr": 3, "name": "盘盈"}
            ]
        });
        mystore = Ext.create("Ext.data.Store", {
            id: 'mystore',
            pageSize: 5,
            proxy: {
                type: "ajax",
                url: "/rkcx/instockpage",
                reader: {
                    type: "json",
                    root: "instocklist",
                    totalProperty: 'sumcount'
                }
            },
            fields: [
                'billCode',
                'operUser.operName',
                'supplierInfo.supplierName',
                'operUser.operId',
                'supplierInfo.supplierId',
                'inType',
                'inTime',
                'handler',
                'totalMoney',
                'remark'
            ],
            autoLoad: false
        });
        mystore.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        callEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function (editor, context) {
                    if (context.value) {
                        var myrkcxstore = Ext.data.StoreManager.lookup("myrkcxstore");
                        if (context.field === 'inStockMerName') {
                            context.record.set('code', me.myCode);
                            context.record.set('inStockMerName', me.myName);
                        }
                        if (context.field === "num") {
                            if (context.record.data.price) {
                                context.record.set('total',context.record.data.price * context.value);
                            }
                        }
                        if (context.field === "price") {
                            if (context.record.data.num) {
                                context.record.set('total',context.record.data.num * context.value);
                            }
                        }
                        me.totalmoney = 0;
                        if (myrkcxstore.data.items.length === 0) {
                            me.totalmoney = 0;
                        } else {
                            for (var i = 0; i < myrkcxstore.data.items.length; i++) {
                                if (!isNaN(myrkcxstore.data.items[i].data.total) && myrkcxstore.data.items[i].data.total != "") {
                                    me.totalmoney += myrkcxstore.data.items[i].data.total;
                                }
                            }
                        }
                        var parentStore = Ext.getCmp('northrkcxgrid').store;
                        me.nowEditRecord.data.totalMoney = me.totalmoney;
                        var parentIndex = parentStore.indexOf(me.nowEditRecord);
                        parentStore.remove(me.nowEditRecord);
                        parentStore.insert(parentIndex, me.nowEditRecord);
                    }
                }
            }
        });
        callEditingnote = new Ext.grid.plugin.CellEditing({
        });
        Ext.apply(this, {
            title: "进货查询",
            closable: true,
            layout: "border",
            border: false,
            items: [
                {
                    region: "north",
                    flex: 1,
                    xtype: "grid",
                    plugins: callEditingnote,
                    id: "northrkcxgrid",
                    store: mystore,
                    autoScroll: true,
                    columns: [
                        {
                            text: '入库单号',
                            dataIndex: 'billCode',
                            hidden: true
                        },
                        {
                            text: '操作员',
                            dataIndex: 'operUser.operName',
                            editor: {
                                allowBlank: false,
                                xtype: "combobox",
                                store: oper,
                                displayField: 'operName',
                                valueField: 'operId'
                            }
                        },
                        {
                            text: '供应商名称',
                            dataIndex: 'supplierInfo.supplierName',
                            editable: true,
                            editor: {
                                allowBlank: false,
                                xtype: "combobox",
                                store: supplier,
                                displayField: 'supplierName',
                                valueField: 'supplierId'
                            }
                        },
                        {
                            text: '入库方式',
                            dataIndex: 'inType',
                            editor: {
                                xtype: "combobox",
                                name: "inType",
                                store: instocktype,
                                displayField: "name",
                                valueField: "abbr"
                            }
                        },
                        {
                            text: '入库时间',
                            dataIndex: 'inTime',
                            editable: true,
                            value: curtime,
                            editor: {
                                allowBlank: false
                            },
                            renderer: function(value){
                                return value.replace('T', ' ');
                            }
                        },
                        {
                            text: '经手人',
                            dataIndex: 'handler',
                            editable: true,
                            editor: {
                                allowBlank: false
                            }
                        },
                        {
                            text: '入库金额',
                            dataIndex: 'totalMoney',
                            editable: false
                        },
                        {
                            text: '备注',
                            dataIndex: 'remark',
                            editable: true,
                            editor: {
                                allowBlank: false
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: mystore,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    listeners: {
                        //单击grid的行出发事件
//                            select: function ( grid, record) {
//                            Ext.getCmp('rkcxcenter').store.reload({
//                                params:{
//                                    code:record.get('billCode')
//                                }
//                            });
//                       }
                        itemcontextmenu: function (view, record, item, index, e) {
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            me.nowEditRecord = record;
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float: true,
                                items: [
                                    {
                                        text: "查看",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            //当点击时隐藏右键菜单
                                            this.up("menu").hide();
                                            Ext.Ajax.request({
                                                url: '/rkcx/indetapage',
                                                params: {
                                                    code: record.get('billCode')
                                                },
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp('rkcxcenter').store.reload();
                                                    Ext.each(msg.indetalist, function (item) {
                                                        Ext.data.StoreManager.lookup('myrkcxstore').add({
                                                            price: item.price,
                                                            inStockMerName: item.merchandiseInfo.merchandiseName,
                                                            num: item.num,
                                                            total: item.num * item.price,
                                                            code: item.merchandiseInfo.merchandiseId,
                                                            id: item.id,
                                                            InStockInfoByBillCode: item.inStockInfo.billCode
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "修改",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            var medata = Ext.getCmp('northrkcxgrid').getSelectionModel().getSelection()[0];
                                            var mydata = Ext.data.StoreManager.lookup('myrkcxstore').data.items;
                                            var postDate = [];
                                            var Dat=[];
                                            Ext.each(mydata, function (item, index) {
                                                postDate[index]=item.data;
                                                postDate[index]['merchandiseInfo'] = {};
                                                postDate[index]['merchandiseInfo']['merchandiseId']=item.data.code;
                                                postDate[index]['inStockInfo']= {};
                                                postDate[index]['inStockInfo']['billCode']=item.data.InStockInfoByBillCode;
                                                //get方法提交
//                                                if (!item.data.total) {
//                                                    return;
//                                                }
//                                                me.postDate += 'inStockDetailsInfoList['+index+'].merchandiseInfo.merchandiseId=' + item.data.code + '&inStockDetailsInfoList[' + index + '].num=' + item.data.num + '&inStockDetailsInfoList[' + index + '].price=' + item.data.price + '&inStockDetailsInfoList[' + index + '].id=' + item.data.id + '&inStockDetailsInfoList[' + index + '].id=' + item.data.id + '&inStockDetailsInfoList[' + index + '].inStockInfo.billCode=' + item.data.inStockInfo;
//                                                if (index != mydata.length - 1) {
//                                                    me.postDate += '&';
//                                                }
                                            });
                                            Ext.each(medata, function (item) {
                                                Dat=item.data;
                                                Dat['operUser']={};
                                                Dat['supplierInfo']={};
                                                Dat['supplierInfo']['supplierId']=medata.get('supplierInfo.supplierId');
                                                Dat['operUser']['operId']=medata.get('operUser.operId');
                                            });
                                            //get方法提交
//                                            getDate += '&inStockInfo.billCode=' + me.medata.get('billCode') + '&inStockInfo.operUser.operId=' + me.medata.get('operUser.operId') + '&inStockInfo.supplierInfo.supplierId=' + me.medata.get('supplierInfo.supplierId') + '&inStockInfo.inType=' + me.medata.get('inType') + '&inStockInfo.inTime=' + me.medata.get('inTime') + '&inStockInfo.handler=' + me.medata.get('handler') + '&inStockInfo.totalMoney=' + me.medata.get('totalMoney') + '&inStockInfo.remark=' + me.medata.get('remark')
 //                                           Ext.Ajax.request({
                                            var form=Ext.create('Ext.form.Panel',{

                                            });
                                            form.submit({
                                                url: '/rkcx/instockupdate',
                                                jsonSubmit:true,
                                                params:{
                                                    inStockInfo:Dat,
                                                    inStockDetailsInfoList:postDate
                                                },
                                                success: function (form,action) {
                                                    var msg = Ext.JSON.decode(action.response.responseText);
                                                    if(msg.state){
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('northrkcxgrid').store.reload();
                                                        Ext.getCmp('rkcxcenter').store.reload();
                                                    }else{
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.QUESTION,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                    }
                                                },
                                                failure: function (form,action) {
                                                    var msg = Ext.JSON.decode(action.response.responseText);
                                                    Ext.MessageBox.show({
                                                        title: '提示',
                                                        msg: msg.message,
                                                        icon: Ext.MessageBox.QUESTION,
                                                        buttons: Ext.MessageBox.YES
                                                    });
                                                }
                                            });
                                        }
                                    },
                                    {
                                        text: "删除",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            Ext.Ajax.request({
                                                url: '/rkcx/instockdel?instock.billCode=' + record.get('billCode'),
                                                success: function (form,action) {
                                                    var msg = Ext.JSON.decode(action.response.responseText);
                                                    if (msg.state) {
                                                        Ext.MessageBox.show({
                                                            title: "提示",
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('northrkcxgrid').store.reload();
                                                        Ext.getCmp('rkcxcenter').store.reload();
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: "提示",
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                    }
                                                },
                                                failure: function (form,action) {
                                                    var msg = Ext.JSON.decode(action.response.responseText);
                                                    Ext.MessageBox.show({
                                                        title: "提示",
                                                        msg: msg.message,
                                                        icon: Ext.MessageBox.WARNING,
                                                        buttons: Ext.MessageBox.YES
                                                    });
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }
                    }
                },
                {
                    region: "center",
                    flex: 2,
                    id: "rkcxcenter",
                    xtype: "grid",
                    plugins: callEditing,
                    border: false,
                    store: Ext.create("Ext.data.ArrayStore", {
                        id: "myrkcxstore",
                        data: [],
                        fields: [
                            'id',
                            'num',
                            'price',
                            'code',
                            'merchandiseInfo.merchandiseId',
                            'inStockInfo.billCode',
                            'InStockInfoByBillCode',
                            'total',
                            'inStockMerName'
                        ]
                    }),
                    autoScroll: true,
                    columns: [
                        {
                            dataIndex: 'code',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            dataIndex: 'inStockMerName',
                            editor: {
                                xtype: 'combobox',
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                allowBlank: false,
                                store: merinfo,
                                listeners: {
                                    select: function (combo, records) {
                                        me.myCode = this.value;
                                        me.myName = records[0].data.merchandiseName;
                                    }
                                }
                            }
                        },
                        {
                            text: '递增的流水号',
                            dataIndex: 'id',
                            hidden: true
                        },
                        {
                            text: '入库数量',
                            dataIndex: 'num',
                            editor: new Ext.form.field.Number({
                                maxValue: 999999,
                                minValue: 1,
                                allowBlank: false
                            })
                        },
                        {
                            text: '进价',
                            dataIndex: 'price',
                            editor: new Ext.form.field.Number({
                                maxValue: 999999,
                                minValue: 1,
                                allowBlank: false
                            })
                        },
                        {
                            text: '入库单号',
                            dataIndex: 'InStockInfoByBillCode',
                            hidden: true
                        },
                        {
                            text: "总价",
                            dataIndex: "total"
                        },{
                            dataIndex: 'merchandiseInfo.merchandiseId',
                            hidden: true
                        },{
                            dataIndex: 'inStockInfo.billCode',
                            hidden: true
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});


