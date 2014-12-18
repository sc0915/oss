package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by SC on 2014/11/6.
 */
public class LoginAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfo> operdao;

    private List<TAuOperInfo> operlist;

    private TAuOperInfo oper;

    private String message;

    private boolean state;

    private boolean success;

    private String yzm;

    public String execute(){
        return SUCCESS;
    }


    public String loginuser(){
        HttpSession session=ServletActionContext.getRequest().getSession();
        String valid=(String)session.getAttribute("rand");
        operlist=operdao.myfindByHql("from TAuOperInfo where operName=? and pwd=?",oper.getOperName(),oper.getPwd());
            if(operlist.size()<1){
                success=true;
                state=false;
                message="用户名或密码错误！";
                return SUCCESS;
            }
        if((yzm!=null)&&(!yzm.equals(valid))){
            success=true;
            state=false;
            message="验证码不正确！";
            return SUCCESS;
        }else{
                ServletActionContext.getContext().getSession().put("log",operlist);
                success=true;
                state=true;
                message="登陆成功！";
                return SUCCESS;
        }
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
    }

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getYzm() {
        return yzm;
    }

    public void setYzm(String yzm) {
        this.yzm = yzm;
    }
}
