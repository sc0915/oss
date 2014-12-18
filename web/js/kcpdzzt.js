/**
 * Created by SC on 2014/12/3.
 */
Ext.define('js.kcpdzzt',{
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
            title:'库存盘点柱状图',
            width: 500,
            id:'kcpdzzt',
            closable:true,
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
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('merchandiseName') + ': ' + storeItem.get('num') + ' 个');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'num',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'merchandiseName',
                    yField: 'num'
                }
            ]

        });
        this.callParent();
    }
});



