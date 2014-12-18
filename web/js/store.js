/**
 * Created by SC on 2014/11/8.
 */
Ext.define('js.store',{
    id:"store",
    extend:'Ext.view.View',
    mainMethod: function(){},
    initComponent: function () {
        var me = this,mystore,imageTpl;
        mystore=Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/store',
                reader: {
                    type: 'json',
                    root: 'storelist'
                }
            },
            fields: [
                {name:'menuStoreImg', type:'string'},
                {name:'menuStoreUrl', type:'string'},
                {name:'menuStoreId', type:'string'},
                {name:'menuStoreHover', type:'string'}
            ],
            autoLoad: true
        });
        imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuStoreImg" >',
            '<img src="{menuStoreImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this,{
            id:"store",
            store: mystore,
            margin:'200% auto auto 150%',
            tpl: imageTpl,
            itemSelector: 'div.menuStoreImg',
            listeners:{
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuStoreUrl'),record.get('menuStoreId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuStoreHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuStoreImg;
                }
            }


        });
        this.callParent();
    }
});
