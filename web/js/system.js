/**
 * Created by SC on 2014/11/9.
 */
Ext.define('js.system',{
    id:"system",
    extend:'Ext.view.View',
    mainMethod: function(){},
    initComponent: function () {
        var me = this;
        var mystore=Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/menusystem',
                reader: {
                    type: 'json',
                    root: 'systemlist'
                }
            },
            fields: [
                {name:'menuSystemImg', type:'string'},
                {name:'menuSystemId', type:'string'},
                {name:'menuSystemUrl', type:'string'},
                {name:'menuSystemHover', type:'string'}
            ],
            autoLoad: true
        });
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuSystemImg" >',
            '<img src="{menuSystemImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this,{
            id:"system",
            store: mystore,
            margin:'200% auto auto 200%',
            tpl: imageTpl,
            itemSelector: 'div.menuSystemImg',
            listeners:{
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuSystemUrl'),record.get('menuSystemId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuSystemHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuSystemImg;
                }
            }
        });
        this.callParent();
    }
});
