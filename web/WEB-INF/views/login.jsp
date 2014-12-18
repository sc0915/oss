<%--
  Created by IntelliJ IDEA.
  User: SC
  Date: 2014/11/6
  Time: 21:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String path=request.getContextPath();%>
<html>
<head>
    <title></title>
    <link href="<%=path%>/extjs/resources/css/ext-all.css" type="text/css" rel="stylesheet"/>
    <link href="<%=path%>/extjs/resources/css/xtheme-gray-extend.css" type="text/css" rel="stylesheet"/>
    <script src="<%=path%>/extjs/ext-all.js" type="text/javascript"></script>
    <script src="<%=path%>/extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script src="<%=path%>/js/login.js" type="text/javascript"></script>

    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create("login",{
                renderTo:Ext.getBody()
            }).center();
        });
    </script>
</head>
<body  style="background:url('<%=path%>/imgs/back.jpg');background-size:100% ">

</body>
</html>
