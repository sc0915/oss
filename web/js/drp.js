/**
 * Created by SC on 2014/11/8.
 */
Ext.define('js.drp',{
    id:"drp",
    extend:'Ext.view.View',
    mainMethod: function(){},//spwh
    initComponent: function () {
        var me=this;
        var mystore=Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/drp',
                reader: {
                    type: 'json',
                    root: 'drplist'
                }
            },
            fields: [
                {name:'menuDrpImg', type:'string'},
                {name:'menuDrpHover',type:'string'},
                {name:'menuDrpUrl',type:'string'},
                {name:'menuDrpHover',type:'string'}
            ],
            autoLoad: true
        });
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuDrpImg" >',
            '<img src="{menuDrpImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this,{
            id:"drp",
            store: mystore,
            margin:'200% auto auto 100%',
            tpl: imageTpl,
            itemSelector: 'div.menuDrpImg',
            listeners:{
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuDrpUrl'),record.get('menuDrpId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuDrpHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuDrpImg;
                }
            }
        });
        this.callParent();
    }
});
