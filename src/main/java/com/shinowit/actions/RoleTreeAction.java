package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.RoleTreeDAO;
import com.shinowit.model.RoleTreeNode;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/12/2.
 */
public class RoleTreeAction extends ActionSupport {

    @Resource
    private RoleTreeDAO roletreedao;


    private RoleTreeNode node;

    private boolean success;

    public String roletree(){
        success=true;
        node=roletreedao.queryPower();
        return SUCCESS;
    }



    public RoleTreeNode getNode() {
        return node;
    }

    public void setNode(RoleTreeNode node) {
        this.node = node;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
