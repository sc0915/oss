/**
 * Created by SC on 2014/12/4.
 */
Ext.define("js.spzxt",{
    extend:'Ext.panel.Panel',
    require:[
        'Ext.chart.*',
        'Ext.layout.container.Fit',
        'Ext.window.MessageBox',
        'Ext.grid.Panel'
    ],
    initComponent: function () {
        var pieStore = Ext.create('Ext.data.JsonStore', {
            fields:[
                'MerchandiseName',
                'Num',
                'Price'
            ],
            proxy:{
                type:"ajax",
                url:"/main/linepie",
                reader:{
                    type:"json",
                    root:"list"
                }
            },
            autoLoad:false
        });
        var pieChart = Ext.create('Ext.chart.Chart', {
            width: 100,
            height: 100,
            animate: false,
            store: pieStore,
            shadow: false,
            insetPadding: 0,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'Num',
                showInLegend: false,
                label: {
                    field: 'MerchandiseName',
                    display: 'rotate',
                    contrast: true,
                    font: '9px Arial'
                }
            }]
        });
        var gridStore = Ext.create('Ext.data.Store', {
            fields:[
                'MerchandiseName',
                'Num',
                'Price'
            ],
            proxy:{
                type:"ajax",
                url:"/main/linepie",
                reader:{
                    type:"json",
                    root:"list"
                }
            },
            autoLoad:false
        });
        var store = Ext.create('Ext.data.JsonStore', {
            fields:[
                'inTime',
                'totalMoney'
            ],
            proxy:{
                type:"ajax",
                url:"/main/instock",
                reader:{
                    type:"json",
                    root:"inStockInfoList"
                }
            },
            autoLoad:true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            height: 130,
            width: 480,
            columns: [{
                text   : '商品名称',
                dataIndex: 'MerchandiseName'
            }, {
                text   : '商品数量',
                dataIndex: 'Num'
            },{
                text   : '商品价格',
                dataIndex: 'Price'
            }]
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['totalMoney'],
                    title: false,
                    grid: true
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['inTime'],
                    title: false
                }
            ],
            series: [
                {
                    type: 'line',
                    axis: 'left',
                    gutter: 80,
                    xField: 'inTime',
                    yField: ['totalMoney'],
                    tips: {
                        trackMouse: true,
                        width: 580,
                        height: 170,
                        layout: 'fit',
                        items: {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [pieChart, grid]
                        },
                        renderer: function (klass, item) {
                            grid.store.load({params:{intime: klass.get('inTime')}});
                            pieChart.store.load({params:{intime: klass.get('inTime')}});
                        }
                    }
                }
            ]
        });
        Ext.apply(this,{
            id:'spzxt',
            title:'入库商品折线图',
            width: 800,
            closable:true,
            height: 400,
            layout: 'fit',
            items: chart
        });
        this.callParent();
    }
});


