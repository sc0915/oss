/**
 * Created by SC on 2014/11/16.
 */
Ext.define("js.cgrk", {
    id: 'cgrk',
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',
    initComponent: function () {
        var curDate = new Date();
        var curtime = Ext.Date.format(curDate, 'Y-m-d H:i:s');
        var me = this, callEditing, supplier, oper, instocktype, merinfo;
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
                {"abbr": 1, "name": "正常入库"},
                {"abbr": 2, "name": "报溢"},
                {"abbr": 3, "name": "盘盈"}
            ]
        });
        callEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function (editor, context) {
                    if (context.value) {
                        var mystore = Ext.data.StoreManager.lookup("mystore");
                        if (context.field === 'inStockMerName') {
                            context.record.data.code = me.myCode;
                            context.record.data.inStockMerName = me.myName;
                            mystore.remove(context.record);
                            mystore.insert(context.rowIdx, context.record);
                        }
                            if (context.field === "num") {
                            if (context.record.data.price) {
                                context.record.data.total = context.record.data.price * context.value;
                                mystore.remove(context.record);
                                mystore.insert(context.rowIdx, context.record);
                            }
                        }
                        if (context.field === "price") {
                            if (context.record.data.num) {
                                context.record.data.total = context.record.data.num * context.value;
                                mystore.remove(context.record);
                                mystore.insert(context.rowIdx, context.record);
                            }
                        }
                        if (context.record.data.inStockMerName && context.record.data.num && context.record.data.price) {
                            mystore.add({});
                        }
                        me.totalmoney = 0;
                        for (var i = 0; i < mystore.data.items.length; i++) {
                            if (!isNaN(mystore.data.items[i].data.total) && mystore.data.items[i].data.total != "") {
                                me.totalmoney += mystore.data.items[i].data.total;
                            }
                        }
                        Ext.getCmp('jscgrktotalMoney').setValue(me.totalmoney);
                    }
                }
            }
        });
        Ext.apply(this, {
            title: "采购进货",
            layout: "vbox",
            closable: true,
            items: [
                {
                    xtype: "form",
                    width: "100%",
                    id: "cgrkform",
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
                                    fieldLabel: "操作员编码",
                                    name: "instockinfo.operUser.operId",
                                    store: oper,
                                    displayField: 'operName',
                                    valueField: 'operId'
                                },
                                {
                                    xtype: "combobox",
                                    fieldLabel: "供应商编码",
                                    name: "instockinfo.supplierInfo.supplierId",
                                    store: supplier,
                                    displayField: 'supplierName',
                                    valueField: 'supplierId'
                                },
                                {
                                    xtype: "combobox",
                                    fieldLabel: "入库方式",
                                    name: "instockinfo.inType",
                                    store: instocktype,
                                    displayField: "name",
                                    valueField: "abbr"
                                },
                                {
                                    fieldLabel: "入库时间",
                                    value: curtime,
                                    readOnly: true,
                                    name: "instockinfo.inTime"
                                },
                                {
                                    fieldLabel: "经手人",
                                    name: "instockinfo.handler"
                                },
                                {
                                    fieldLabel: "入库金额",
                                    name: "instockinfo.totalMoney",
                                    readOnly: true,
                                    id: 'jscgrktotalMoney',
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
                                    name: "instockinfo.remark"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "grid",
                    width: "100%",
                    autoScroll: true,
                    id: 'jscgrktotalcgrk',
                    border: false,
                    flex: 2,
                    plugins: callEditing,
                    store: Ext.create("Ext.data.ArrayStore", {
                        id: "mystore",
                        data: [
                            {}
                        ],
                        fields: [
                            "code",
                            "num",
                            "price",
                            "total",
                            "inStockMerName"
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
//                                        var instockinfo={};
//                                        var formdata= Ext.getCmp('rukuform').query();
//                                        Ext.each(formdata,function(item){
//                                            if(item){
//                                                if(item.xtype=='combo'||item.xtype=='textfield'){
//                                                    if(item.name=='supplierid'){
//                                                        instockinfo[item.name]={};
//                                                        instockinfo[item.name][item.name]=item.lastValue;
//                                                        instockinfo[item.name]={supplierid:item.lastValue}
//                                                    }else if(item.name=='operid'){
//                                                        instockinfo[item.name]={};
//                                                        instockinfo[item.name]['opername']=item.lastValue;
//                                                    }else{
//                                                        instockinfo[item.name]=item.lastValue
//                                                    }
//                                                }
//
//                                            }
//                                        });
                                        var mydata = Ext.data.StoreManager.lookup('mystore').data.items;
                                        var postDate = '';
                                        for(var i=0;i<mydata.length;i++){}
                                        Ext.each(mydata, function (item, index) {
                                            if (!item.data.total) {
                                                return;
                                            }
                                            postDate +='instockdeta_list['+index+'].merchandiseInfo.merchandiseId=' + item.data.code + '&instockdeta_list['+index+'].num=' + item.data.num + '&instockdeta_list['+index+'].price=' + item.data.price;
                                            if (index != mydata.length - 1) {
                                                postDate += '&';
                                            }
                                        });
                                        Ext.getCmp('cgrkform').submit({
                                            url: '/cgrk/instockinfo?'+postDate,
                                            success: function (form, action) {
                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                //this.up('form').reset();
                                                //Ext.getCmp('jscgrktotalcgrk').removeAll();
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
                            text: "入库数量",
                            dataIndex: "num",
                            editor: new Ext.form.field.Number({
                                maxValue: 999999,
                                minValue: 1,
                                allowBlank: false
                            })
                        },
                        {
                            text: "进价",
                            dataIndex: "price",
                            editor: new Ext.form.field.Number({
                                maxValue: 9999999,
                                minValue: 1,
                                allowBlank: false
                            })
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