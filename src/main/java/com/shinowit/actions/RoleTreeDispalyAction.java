package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.RoleTreeDispalyDAO;
import com.shinowit.model.RoleTreeDispalyNode;


import javax.annotation.Resource;

/**
 * Created by SC on 2014/12/2.
 */
public class RoleTreeDispalyAction extends ActionSupport {

    @Resource
    private RoleTreeDispalyDAO roleTreeDispalyDAO;


    private RoleTreeDispalyNode node;

    private boolean success;

    private String roleid;

    public String roledistree(){
        success=true;
        node=roleTreeDispalyDAO.queryPower(roleid);
        return SUCCESS;
    }




    public RoleTreeDispalyNode getNode() {
        return node;
    }

    public void setNode(RoleTreeDispalyNode node) {
        this.node = node;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }
}
