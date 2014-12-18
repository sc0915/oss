/**
 * Created by SC on 2014/11/6.
 */
Ext.define("login",{
    extend:"Ext.form.Panel",
    initComponent: function () {
        var me=this;
        Ext.apply(this,{
            title:"登陆",
            border:false,
            padding:5,
            height:150,
            width:300,
            layout:"form",
            frame:true,
            defaults:{
                xtype:"textfield",
                allowBlank:false,
                labelWidth:45,
                border:false,
                labelAlign:"right"
            },
            bodyStyle:{
                backgroundColor:"#d0d0d0"
            },
            items:[
                {
                    fieldLabel:"用户名",
                    name:"oper.operName"
                },{
                    fieldLabel:"密　码",
                    inputType:"password",
                    name:"oper.pwd"
                },{
                    xtype:"panel",
                    border:false,
                    layout:"column",
                    bodyStyle:{
                        backgroundColor:"#d0d0d0"
                    },
                    items:[
                        {
                            xtype:"textfield",
                            fieldLabel:"验证码",
                            columnWidth:.65,
                            labelWidth:45,
                            name:"yzm",
                            allowBlank:false,
                            labelAlign:"right"
                        },{
                            xtype:"panel",
                            columnWidth:.35,
                            bodyStyle:{
                                backgroundColor:"#d0d0d0"
                            },
                            html:'&nbsp;<img src="../../validCode.jsp"  width="76" height="22"  onclick="this.src=\'../../validCode.jsp?r=\'+Math.random()"/>'
                        }
                    ]
                }
            ],
            buttonAlign:"center",
            buttons:[
                {
                    text:"登陆",
                    handler:me.login
                },{
                    text:"重置",
                    handler: function () {
                        this.up("form").getForm().reset();
                    }
                }
            ]
        });
        this.callParent();
    },
    login: function () {
        var form=this.up('form').getForm();
        if(form.isValid()){
            form.submit({
                url:'/login/login',
                success: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    if(msg.state){
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.WARNING,
                            buttons:Ext.MessageBox.YES
                        });
                        window.location="/one";
                    }else{
                        Ext.MessageBox.show({
                            title:'提示',
                            msg:msg.message,
                            icon:Ext.MessageBox.QUESTION,
                            buttons:Ext.MessageBox.YES
                        });
                    }
                },
                failure: function (form,action) {
                    var msg=Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES
                    });
                }
            });
        }
    }
});