package com.shinowit.inter;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import java.util.Map;

/**
 * Created by SC on 2014/11/19.
 */
public class LoginInter extends AbstractInterceptor {


    @Override
    public String intercept(ActionInvocation invocation) throws Exception {
        Map<String,Object> session=invocation.getInvocationContext().getSession();
        if(session.containsKey("log")==false){
            return "faile";
        }else{
            return invocation.invoke();
        }
    }
}
