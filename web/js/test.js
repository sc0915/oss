/**
 * Created by SC on 2014/12/17.
 */
Ext.define('test',{
    extend:'Ext.container.Viewport',
    requires:'MyApp.ux.DateTimeField',
    initComponent: function () {
        Ext.apply(this,{
            layout:'border',
            items:[
                {
                    region:'north',
                    xtype:'toolbar',
                    border:false,
                    height:40,
                    items:[
                        {
                            xtype:'tbtext',
                            text:'这个是什么东西！',
                            style:{color:'yellow',fontSize:'30pt'}
                        },'->',
                        {
                            xtype:'button',
                            text:'注销'
                        }
                    ]
                },{
                    region:'center',
                    id:'main',
                    xtype:'tabpanel',
                    border:false,
                    title:'这个核心',
                    items:[
                        {
                            xtype:'form',
                            items:[{
                                xtype:'datetimefield',
                                width : 300,
                                labelWidth : 80,
                                endDateField:'etime',
                                vtype:'daterange',
                                fieldLabel: '时间',
                                format: 'Y-m-d H:i:s',
                                name:'stime'
                            },
                                {
                                    xtype:'datetimefield',
                                    width : 300,
                                    labelWidth : 80,
                                    startDateField:'stime',
                                    vtype:'daterange',
                                    fieldLabel: '记录时间',
                                    format: 'Y-m-d H:i:s',
                                    name:'etime'
                                }]
                        }

                    ]
                },{
                    region:'south',
                    xtype:'toolbar',
                    border:false,
                    items:['->',
                        {
                            xtype:'tbtext',
                            text:'这东西还需要版权吗？',
                            style:{color:'yellow',fontSize:'10pt'}
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});