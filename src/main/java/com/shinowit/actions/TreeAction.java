package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.TreeDAO;
import com.shinowit.model.TAuOperInfo;
import com.shinowit.model.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by SC on 2014/12/2.
 */
public class TreeAction extends ActionSupport {

    @Resource
    private TreeDAO treedao;

    private List<TAuOperInfo> userinfo;

    private TreeNode node;

    private boolean success;


    public String tree(){
//        String user_id=(String)ServletActionContext.getContext().getSession().get("log");
        success=true;
        HttpSession session= ServletActionContext.getRequest().getSession();
        userinfo=(List<TAuOperInfo>)session.getAttribute("log");
        node=treedao.queryPower(userinfo.get(0).getOperId());
        return SUCCESS;
    }



    public TreeNode getNode() {
        return node;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
