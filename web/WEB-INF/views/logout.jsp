<%--
  Created by IntelliJ IDEA.
  User: SC
  Date: 2014/11/19
  Time: 20:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<%
session.invalidate();
response.sendRedirect(request.getContextPath() + "/login/log");
%>
</body>
</html>
