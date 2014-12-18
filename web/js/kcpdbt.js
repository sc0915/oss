/**
 * Created by SC on 2014/12/1.
 */
Ext.define('js.kcpdbt',{
    extend: 'Ext.panel.Panel',
    initComponent: function () {
        var store = Ext.create('Ext.data.JsonStore', {
            fields:[
                'num',
                'merchandiseName'
            ],
            proxy:{
                type:"ajax",
                url:"/main/viewpie",
                reader:{
                    type:"json",
                    root:"viewPieList"
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
                            //calculate percentage.
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
            title:'库存盘点饼图',
            closable:true,
            id: 'kcpdbt',
            width: 800,
            height: 600,
            layout: 'fit',
            items: chart
        });
        this.callParent();
    }
});
