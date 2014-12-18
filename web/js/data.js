/**
 * Created by SC on 2014/11/9.
 */
Ext.define('js.data',{
    id:"data",
    extend:'Ext.view.View',
    mainMethod: function(){},//date
    initComponent: function () {
        var me = this,mystore,imageTpl;
        mystore=Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/menudata',
                reader: {
                    type: 'json',
                    root: 'datalist'
                }
            },
            fields: [
                {name:'menuDataImg', type:'string'},
                {name:'menuDataUrl', type:'string'},
                {name:'menuDataId', type:'string'},
                {name:'menuDataHover', type:'string'}
            ],
            autoLoad: true
        });
        imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuDataImg" >',
            '<img src="{menuDataImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this,{
            id:"data",
            margin:'200% auto auto 200%',
            store: mystore,
            tpl: imageTpl,
            itemSelector: 'div.menuDataImg',
            listeners:{
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuDataUrl'),record.get('menuDataId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuDataHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuDataImg;
                }
            }
        });
        this.callParent();
    }
});
