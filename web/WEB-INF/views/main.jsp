<%--
  Created by IntelliJ IDEA.
  User: SC
  Date: 2014/11/7
  Time: 8:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String path=request.getContextPath();%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
    <link href="<%=path%>/extjs/resources/css/ext-all.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path%>/extjs/resources/css/xtheme-galdaka.css" type="text/css" rel="stylesheet"/>
    <script src="<%=path%>/extjs/ext-all.js" type="text/javascript"></script>
    <script src="<%=path%>/extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>

    <script type="text/javascript"> GLOBAL_PATH = '<%=request.getContextPath()%>'</script>

    <script src="<%=path%>/js/main.js" type="text/javascript"></script>
    <style type="text/css">
        .part01{
            width: 100%;
            height: 100%;
            background:#476F92;
        }
        .service {
            background-image: url("../../imgs/service.png");
        }
        .phone{
            background-image: url("../../imgs/phone.png");
        }
        .x-toolbar{height:45px;}
        /*#panel-1011-innerCt{background: #4D9DD2}*/
        .menuResotreImg{ margin-left: 50px; float: left;}
        .menuSellImg{ margin-left: 50px; float: left;}
        .menuStoreImg{ margin-left: 50px; float: left;}
        .menuDrpImg{ margin-left: 50px; float: left;}
        .menuDataImg{ margin-left: 50px; float: left;}
        .menuSystemImg{ margin-left: 50px; float: left;}
    </style>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create("main",{
                renderTo:Ext.getBody()
            });
        });
    </script>
</head>
<body>
<s:hidden id="tree1"  value="%{#session.log[0].operId}"></s:hidden>
</body>
</html>
