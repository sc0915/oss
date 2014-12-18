package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuAuthorization;
import com.shinowit.model.TAuRoleInfo;
import com.shinowit.service.RoleDeleteService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/6.
 */
public class RoleInfoDeleteAction extends ActionSupport {

    @Resource
    private RoleDeleteService roleDeleteService;

    private TAuRoleInfo roleInfo;

    private boolean success;

    private boolean state;

    private String message;


    public String roledel() {
        boolean result = false;
        try {
            String delid = roleInfo.getRoleId();
            result = roleDeleteService.roledelservice(delid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (result = true) {
            state = true;
            success = true;
            message = "删除成功！";
            return SUCCESS;
        } else {
            state = false;
            success = true;
            message = "删除失败！";
            return SUCCESS;
        }
    }

    public TAuRoleInfo getRoleInfo() {
        return roleInfo;
    }

    public void setRoleInfo(TAuRoleInfo roleInfo) {
        this.roleInfo = roleInfo;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
