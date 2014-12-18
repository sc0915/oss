package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.dao.RoleDistableDAO;
import com.shinowit.model.TAuPower;
import com.shinowit.model.TAuRoleInfo;
import com.shinowit.service.RoleInfoInsertService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/8.
 */
public class RoleDisableAction extends ActionSupport {

    @Resource
    private RoleDistableDAO roleDistableDAO;

    private String message;

    private boolean success;

    private boolean state;

    private TAuRoleInfo roleInfo;

    private boolean rolesta;

    public String roledis() {
        roleInfo.setState(rolesta);
        boolean result = roleDistableDAO.roledistable(roleInfo);
        if (rolesta == false) {
            if (result == true) {
                state = true;
                success = true;
                message = "禁用成功！";
                return SUCCESS;
            } else {
                state = false;
                success = true;
                message = "禁用失败！";
                return SUCCESS;
            }
        } else {
            if (result == true) {
                state = true;
                success = true;
                message = "启用成功！";
                return SUCCESS;
            } else {
                state = false;
                success = true;
                message = "启用失败！";
                return SUCCESS;
            }
        }
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public TAuRoleInfo getRoleInfo() {
        return roleInfo;
    }

    public void setRoleInfo(TAuRoleInfo roleInfo) {
        this.roleInfo = roleInfo;
    }

    public boolean isRolesta() {
        return rolesta;
    }

    public void setRolesta(boolean rolesta) {
        this.rolesta = rolesta;
    }
}
