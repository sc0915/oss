/**
 * Created by SC on 2014/11/10.
 */
Ext.define("js.ck",{
    id:"ck",
    extend:"Ext.grid.Panel",
    pagenum:5,
   initComponent: function () {
       var me=this,mystore;
       mystore =Ext.create("Ext.data.Store",{
           pageSize:me.pagenum,
           proxy:{
               type:"ajax",
               url:"/store/stockpage",
               reader:{
                   type:"json",
                   root:"tMestocksinfoList",
                   totalProperty:'sumcount'
               }
           },
           fields:[
               'id',
               'avgPrice',
               'num',
               'merchandiseInfo.merchandiseName'
           ],
           autoLoad:false,
           listeners:{
               beforeload: function (store,operation) {
                   var ckmc=Ext.getCmp('ck_mc');
                   if(ckmc){
                       if(ckmc.getValue()){
                           if(operation.params){
                               operation.params.name=ckmc.getValue();
                           }else{
                               operation.params={name:ckmc.getValue()}
                           }
                       }
                   }
               }
           }
       });
       mystore.load({
           params:{
               start:0,
               limit:me.pagenum
           }
       });
       Ext.apply(this,{
           title:"库存信息",
           store:mystore,
           id:"js_ck",
           closable:true,
           columns:[
               {text:'递增流水号',dataIndex:'id',hidden:true},
               {text:'商品名称',dataIndex:'merchandiseInfo.merchandiseName'},
               {text:'加权平均价',dataIndex:'avgPrice'},
               {text:'库存数量',dataIndex:'num'}
           ],
           dockedItems:[{
               xtype:'pagingtoolbar',
               store:mystore,
               dock:'bottom',
               displayInfo:true
           }],
           tbar:[
//               {
//                   xtype:'panel',
//                   border:false,
//                   width:600,
//                   items:[
//                       {
//                           xtype:'panel',
//                           border:false,
//                           width:600,
//                           layout : "column",
//                           items:[
                              {
                                   xtype:'textfield',
                                   labelAlign:'right',
                                   name:'name',
                                   id:'ck_mc',
                                   labelWidth : 70,
                                   fieldLabel:'商品名称'
                               },
                               {
                                   xtype:'button',
                                   text:'查询',
                                   handler:function(){
                                       Ext.getCmp('js_ck').store.load({
                                           params:{
                                               name:Ext.getCmp('ck_mc').getValue()
                                           }
                                       });
                                   }
                               }
//                           ]
//                       }
//                   ]
//               }
           ]
       });
       this.callParent();
   }
});