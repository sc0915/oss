/**
 * Created by SC on 2014/11/16.
 */
Ext.define("js.xsck", {
    //id:'xsck',
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',
    initComponent: function () {
        var curDate = new Date();
        var curtime = Ext.Date.format(curDate, 'Y-m-d H:i:s');
        var me = this, callEditing, oper, instocktype, merinfo;
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
        merinfo = Ext.create('Ext.data.Store',{
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
                {"abbr": 1, "name": "正常出库"},
                {"abbr": 2, "name": "报溢"},
                {"abbr": 3, "name": "盘盈"}
            ]
        });
        callEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function (editor, context) {
                    if (context.value) {
                        var mystore = Ext.data.StoreManager.lookup("xsck_store");
                        if (context.field === 'outStockMerName') {
                            context.record.set('code', me.myCode);
                            context.record.set('outStockMerName', me.myName);
                        }
                        if (context.field === "outStockMerName") {
                            Ext.Ajax.request({
                                url:'/xsck/tMestocksinfo?uuid=' + me.myCode,
                                success: function (response) {
                                    var msg=Ext.JSON.decode(response.responseText);
                                    for(var i=0;i<msg.tMestocksinfoList.length;i++){
                                        context.record.data.stockPrice = msg.tMestocksinfoList[i].avgPrice;
                                        context.record.data.num = msg.tMestocksinfoList[i].num;
                                        mystore.remove(context.record);
                                        mystore.insert(context.rowIdx, context.record);
                                    }
                                }
                            });
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
                        if (context.record.data.outStockMerName && context.record.data.num && context.record.data.price) {
                            mystore.add({});
                        }
                        me.totalmoney = 0;
                        for (var i = 0; i < mystore.data.items.length; i++) {
                            if (!isNaN(mystore.data.items[i].data.total) && mystore.data.items[i].data.total != "") {
                                me.totalmoney += mystore.data.items[i].data.total;
                            }
                        }
                        Ext.getCmp('jsxscktotalMoney').setValue(me.totalmoney);
                    }
                }
            }
        });
        Ext.apply(this, {
            title: "销售出库",
            id:"xsck_myjs",
            layout: "vbox",
            closable: true,
            items: [
                {
                    xtype: "form",
                    width: "100%",
                    id: "xsckform",
                    layout: "vbox",
                    border: false,
                    height: 128,
                    items: [
                        {
                            layout: 'column',
                            height: 58,
                            border: false,
                            width: '100%',
                            defaults: {
                                allowBlank: false,
                                xtype: "textfield",
                                labelWidth: 80,
                                labelAlign: "right",
                                columnWidth: .33,
                                margin: '5 0 0 0'
                            },
                            items: [
                                {
                                    xtype: "combobox",
                                    fieldLabel: "操作员",
                                    name: "outStockInfo.operUser.operId",
                                    store: oper,
                                    displayField: 'operName',
                                    valueField: 'operId'
                                },
                                {
                                    xtype: "combobox",
                                    fieldLabel: "出库方式",
                                    name: "outStockInfo.outType",
                                    store: instocktype,
                                    displayField: "name",
                                    valueField: "abbr"
                                },
                                {
                                    fieldLabel: "出库时间",
                                    value: curtime,
                                    readOnly: true,
                                    name: "outStockInfo.outTime"
                                },
                                {
                                    fieldLabel: "经手人",
                                    name: "outStockInfo.handler"
                                },
                                {
                                    fieldLabel: "出库金额",
                                    name: "outStockInfo.totalMoney",
                                    readOnly: true,
                                    id: 'jsxscktotalMoney',
                                    value: me.totalmoney
                                }
                            ]
                        },
                        {
                            layout: 'fit',
                            border: false,
                            width: '100%',
                            margin: '2 0 0 0',
                            items: [
                                {
                                    xtype: "textarea",
                                    labelWidth: 80,
                                    labelAlign: "right",
                                    margin: '0 12 0 0',
                                    fieldLabel: "备注",
                                    name: "outStockInfo.remark"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "grid",
                    width: "100%",
                    autoScroll: true,
                    id: 'jsxsckgrid',
                    border: false,
                    flex: 2,
                    plugins: callEditing,
                    store: Ext.create("Ext.data.ArrayStore", {
                        id: "xsck_store",
                        data: [
                            {}
                        ],
                        fields: [
                            "code",
                            "num",
                            "price",
                            "total",
                            "outStockMerName",
                            "stockPrice"
                        ]
                    }),
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            border: true,
                            items: [
                                "->",
                                {
                                    text: "保存",
                                    handler: function () {
                                        var mydata = Ext.data.StoreManager.lookup('xsck_store').data.items;
                                        var postDate = '';
                                        for(var i=0;i<mydata.length;i++){}
                                        Ext.each(mydata, function (item, index) {
                                            if (!item.data.total) {
                                                return;
                                            }
                                            postDate +='outDetailsInfoList['+index+'].merchandiseInfo.merchandiseId=' + item.data.code + '&outDetailsInfoList['+index+'].num=' + item.data.num + '&outDetailsInfoList['+index+'].price=' + item.data.price+'&outDetailsInfoList['+index+'].stockPrice=' + item.data.stockPrice;
                                            if (index != mydata.length - 1) {
                                                postDate += '&';
                                            }
                                        });
                                        Ext.getCmp('xsckform').submit({
                                            url: '/xsck/outstockinsert?'+postDate,
                                            success: function (form, action) {
                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: msg.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                            },
                                            failure: function (form, action) {
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
                                }]
                        }
                    ],
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
                            text: "出库数量",
                            dataIndex: "num",
                            editor: new Ext.form.field.Number({
                                minValue: 1,
                                allowBlank: false
                            })
                        },
                        {
                            text: "售价",
                            dataIndex: "price",
                            editor: new Ext.form.field.Number({
                                maxValue: 9999999,
                                minValue: 1,
                                allowBlank: false
                            })
                        },
                        {
                            text:'出库成本',
                            dataIndex:'stockPrice'
                        },
                        {
                            text: "总价",
                            dataIndex: "total"
                        }
                    ]
                }
            ]

        });
        this.callParent();
    }
});