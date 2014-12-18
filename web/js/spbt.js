/**
 * Created by SC on 2014/12/1.
 */
Ext.define('js.spbt',{
    extend: 'Ext.panel.Panel',
    requires:['Ext.chart.*',
    'Ext.layout.container.Fit',
    'Ext.window.MessageBox'
    ],
    initComponent: function () {
        var store = Ext.create('Ext.data.Store', {
            fields:[
                'merchandiseName',
                'id',
                'inTime',
                'num',
                'price',
                'totalMoney'
            ],
            proxy:{
                type:"ajax",
                url:"/main/viewinstock",
                reader:{
                    type:"json",
                    root:"viewMerchandinstockList"
                }
            },
            autoLoad:true
        });

        var donut = false;

        var chart = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            animate: true,
            store: store,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [
                {
                    type: 'pie',
                    field: 'num',
                    showInLegend: true,
                    donut: donut,
                    tips: {
                        trackMouse: true,
                        renderer: function (storeItem, item) {
                            var total = 0;
                            store.each(function (rec) {
                                total += rec.get('num');
                            });
                            this.setTitle(storeItem.get('merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'merchandiseName',
                        display: 'rotate',
                        contrast: true,
                        font: '18px Arial'
                    }
                }
            ]
        });
        Ext.apply(this, {
            title: '入库盘点饼图',
            closable: true,
            id: 'spbt',
            width: 800,
            height: 600,
            layout: 'fit',
            items: chart
        });
        this.callParent();
    }
});








