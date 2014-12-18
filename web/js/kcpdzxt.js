/**
 * Created by SC on 2014/12/3.
 */
Ext.define('js.kcpdzxt', {
    extend:'Ext.chart.Chart',
    initComponent: function () {
        var store = Ext.create('Ext.data.JsonStore', {
            fields: [
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
        Ext.apply(this,{
            title:'库存盘点折线图',
            id:'kcpdzxt',
            closable:true,
            width: 500,
            height: 300,
            animate: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['num'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: 'Sample Values',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['merchandiseName'],
                    title: 'Sample Metrics'
                }
            ],
            series: [
                {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    xField: 'merchandiseName',
                    yField: 'num',
                    markerConfig: {
                        type: 'cross',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0
                    }
                }
//                {
//                    type: 'line',
//                    highlight: {
//                        size: 7,
//                        radius: 7
//                    },
//                    axis: 'left',
//                    fill: true,
//                    xField: 'name',
//                    yField: 'data2',
//                    markerConfig: {
//                        type: 'circle',
//                        size: 4,
//                        radius: 4,
//                        'stroke-width': 0
//                    }
//                }
            ]
        });
        this.callParent();
    }
});



