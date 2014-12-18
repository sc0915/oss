/**
 * Created by SC on 2014/11/8.
 */
Ext.define('js.sell',{
    id:"sell",
    extend:'Ext.view.View',
    mainMethod: function(){},
    initComponent: function () {
        var me = this,mystore,imageTpl;
        mystore=Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/sell',
                reader: {
                    type: 'json',
                    root: 'selllist'
                }
            },
            fields: [
                {name:'menuSellImg', type:'string'},
                {name:'menuSellUrl', type:'string'},
                {name:'menuSellId', type:'string'},
                {name:'menuSellHover', type:'string'}
            ],
            autoLoad: true
        });
        imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuSellImg" >',
            '<img src="{menuSellImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this,{
            id:"sell",
            xtype:"dataview",
            store: mystore,
            margin:'200% auto auto 100%',
            tpl: imageTpl,
            itemSelector: 'div.menuSellImg',
            listeners:{
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuSellUrl'),record.get('menuSellId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuSellHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuSellImg;
                }
            }
        });
        this.callParent();
    }
});