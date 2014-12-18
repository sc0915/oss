/**
 * Created by SC on 2014/11/16.
 */
Ext.define("js.ckcx", {
    id: 'ckcx',
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',
    nowEditRecord: {},
    initComponent: function () {
        var curDate = new Date();
        var curtime = Ext.Date.format(curDate, 'Y-m-d H:i:s');
        var me = this, mystore, callEditing, outstocktype, callEditingnote, merinfo, oper;
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
                url: "/store/tMemerchandiseInfo",
                reader: {
                    type: "json",
                    root: "tMemerchandiseInfoList"
                }
            }
        });
        outstocktype = Ext.create('Ext.data.Store', {
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
                url: "/xsck/outstockpage",
                reader: {
                    type: "json",
                    root: "outStockInfoList",
                    totalProperty: 'sumcount'
                }
            },
            fields: [
                'outBillCode',
                'operUser.operName',
                'operUser.operId',
                'outType',
                'outTime',
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
                        var myckcxstore = Ext.data.StoreManager.lookup("myrckcxstore");
                        if (context.field === 'outStockMerName') {
                            context.record.set('code', me.myCode);
                            context.record.set('outStockMerName', me.myName);
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
                        if (myckcxstore.data.items.length === 0) {
                            me.totalmoney = 0;
                        } else {
                            for (var i = 0; i < myckcxstore.data.items.length; i++) {
                                if (!isNaN(myckcxstore.data.items[i].data.total) && myckcxstore.data.items[i].data.total != "") {
                                    me.totalmoney += myckcxstore.data.items[i].data.total;
                                }
                            }
                        }
                        var parentStore = Ext.getCmp('northckcxgrid').store;
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
                    id: "northckcxgrid",
                    store: mystore,
                    autoScroll: true,
                    columns: [
                        {
                            text: '出库单号',
                            dataIndex: 'outBillCode',
                            hidden: true
                        },
                        {
                            text: '操作员',
                            dataIndex: 'operUser.operId',
                            editor: {
                                allowBlank: false,
                                xtype: "combobox",
                                store: oper,
                                displayField: 'operName',
                                valueField: 'operId'
                            }

                        },
                        {
                            text: '出库方式',
                            dataIndex: 'outType',
                            editor: {
                                xtype: "combobox",
                                name: "outType",
                                store: outstocktype,
                                displayField: "name",
                                valueField: "abbr"
                            }
                        },
                        {
                            text: '出库时间',
                            dataIndex: 'outTime',
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
                            editor: {allowBlank: false}
                        },
                        {
                            text: '出库金额',
                            dataIndex: 'totalMoney',
                            editable: false
                        },
                        {
                            text: '备注',
                            dataIndex: 'remark',
                            editable: true,
                            editor: {allowBlank: false}
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
//                            Ext.getCmp('ckcxcenter').store.reload({
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
                                                url: '/xsck/detapage',
                                                params: {
                                                    code: record.get('outBillCode')
                                                },
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp('ckcxcenter').store.reload();
                                                    Ext.each(msg.outDetailsList, function (item) {
                                                        Ext.data.StoreManager.lookup('myckcxstore').add({
                                                            price: item.price,
                                                            stockPrice: item.stockPrice,
                                                            outStockMerName: item.merchandiseInfo.merchandiseName,
                                                            num: item.num,
                                                            total: item.num * item.price,
                                                            code: item.merchandiseInfo.merchandiseId,
                                                            id: item.id,
                                                            outStockInfoByBillCode: item.outStockInfo.outBillCode
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
                                            var medata = Ext.getCmp('northckcxgrid').getSelectionModel().getSelection()[0];
                                            var mydata = Ext.data.StoreManager.lookup('myckcxstore').data.items;
                                            var postDate = [];
                                            var Dat=[];
                                            Ext.each(mydata, function (item, index) {
                                                postDate[index]=item.data;
                                                postDate[index]['merchandiseInfo']={};
                                                postDate[index]['outStockInfo']={};
                                                postDate[index]['merchandiseInfo']['merchandiseId']=item.data.code
                                                postDate[index]['outStockInfo']['outBillCode']=item.data.outStockInfoByBillCode
//                                                if (!item.data.total) {
//                                                    return;
//                                                }
//                                                me.postDate += 'inStockDetailsInfoList['+index+'].merchandiseInfo.merchandiseId=' + item.data.code + '&inStockDetailsInfoList[' + index + '].num=' + item.data.num + '&inStockDetailsInfoList[' + index + '].price=' + item.data.price + '&inStockDetailsInfoList[' + index + '].id=' + item.data.id + '&inStockDetailsInfoList[' + index + '].id=' + item.data.id + '&inStockDetailsInfoList[' + index + '].outStockInfo.billCode=' + item.data.outStockInfo;
//                                                if (index != mydata.length - 1) {
//                                                    me.postDate += '&';
//                                                }
                                            });
                                            Ext.each(medata, function (item) {
                                                Dat=item.data;
                                                Dat['operUser']={};
                                                Dat['operUser']['operId']=medata.get('operUser.operId');
                                            });
                                            //getDate += '&outStockInfo.billCode=' + me.medata.get('billCode') + '&outStockInfo.operUser.operId=' + me.medata.get('operUser.operId') + '&outStockInfo.supplierInfo.supplierId=' + me.medata.get('supplierInfo.supplierId') + '&outStockInfo.inType=' + me.medata.get('inType') + '&outStockInfo.inTime=' + me.medata.get('inTime') + '&outStockInfo.handler=' + me.medata.get('handler') + '&outStockInfo.totalMoney=' + me.medata.get('totalMoney') + '&outStockInfo.remark=' + me.medata.get('remark')
 //                                           Ext.Ajax.request({
                                            var form=Ext.create('Ext.form.Panel',{

                                            });
                                            form.submit({
                                                url: '/xsck/outstockupdate',
                                                jsonSubmit:true,
                                                params:{
                                                    outStockInfo:Dat,
                                                    detailsInfoList:postDate
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
                                                    }else{
                                                        Ext.MessageBox.show({
                                                            title: '提示',
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
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
                                                url: '/xsck/outstockdel?outStockInfo.outBillCode=' + record.get('outBillCode'),
                                                success: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
                                                    if (msg.state) {
                                                        Ext.MessageBox.show({
                                                            title: "提示",
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                        Ext.getCmp('northckcxgrid').store.reload();
                                                        Ext.getCmp('ckcxcenter').store.reload();
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: "提示",
                                                            msg: msg.message,
                                                            icon: Ext.MessageBox.WARNING,
                                                            buttons: Ext.MessageBox.YES
                                                        });
                                                    }
                                                },
                                                failure: function (response) {
                                                    var msg = Ext.JSON.decode(response.responseText);
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
                    id: "ckcxcenter",
                    xtype: "grid",
                    plugins: callEditing,
                    border: false,
                    store: Ext.create("Ext.data.ArrayStore", {
                        id: "myckcxstore",
                        data: [],
                        fields: [
                            'id',
                            'num',
                            'price',
                            'code',
                            'merchandiseInfo.merchandiseId',
                            'outStockInfo.outBillCode',
                            'outStockInfoByBillCode',
                            'total',
                            'stockPrice',
                            'outStockMerName'
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
                            dataIndex: 'outStockMerName',
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
                            text: '出库数量',
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
                            text: '出库单号',
                            dataIndex: 'outStockInfoByBillCode',
                            hidden: true
                        },
                        {
                            text: "总价",
                            dataIndex: "total"
                        },
                        {
                            text: "成本价",
                            dataIndex: "stockPrice"
                        },{
                            dataIndex: 'merchandiseInfo.merchandiseId',
                            hidden: true
                        },{
                            dataIndex: 'outStockInfo.outBillCode',
                            hidden: true
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});


