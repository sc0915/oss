/**
 * Created by SC on 2014/11/7.
 */
Ext.define('js.restore', {
    id:"restore",
    extend: 'Ext.view.View',
    mainMethod: function () {
    },
    initComponent: function () {
        var me = this;
        var mystore = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/main/restore',
                reader: {
                    type: 'json',
                    root: 'restorelist'
                }
            },
            fields: [
                {name: 'menuResotreImg', type: 'string'},
                {name: 'menuRestoreHover', type: 'string'},
                {name: 'menuRestoreUrl', type: 'string'},
                {name: 'menuRestoreId', type: 'string'}
            ],
            autoLoad: true
        });
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div  class="menuResotreImg" >',
            '<img src="{menuResotreImg}" />',
            '</div>',
            '</tpl>'
        );
        Ext.apply(this, {
            id: "restore",
            store: mystore,
            margin: '200% auto auto 100%',
            tpl: imageTpl,
            itemSelector: 'div.menuResotreImg',
            listeners: {
                itemclick:function(view, record){
                    me.mainMethod(record.get(GLOBAL_PATH + 'menuRestoreUrl'),record.get('menuRestoreId'));
                },
                itemmouseenter: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuRestoreHover;
                },
                itemmouseleave: function (view,record,item) {
                    item.childNodes[0].src = record.data.menuResotreImg;
                }
            }
        });
        this.callParent();
    }
});
