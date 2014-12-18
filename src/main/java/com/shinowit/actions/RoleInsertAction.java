package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuPower;
import com.shinowit.model.TAuRoleInfo;
import com.shinowit.service.RoleInfoInsertService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/8.
 */
public class RoleInsertAction extends ActionSupport {

    @Resource
    private RoleInfoInsertService roleInfoInsertService;

    @Resource
    private BaseDAO<TAuRoleInfo> roleInfoDAO;

    private String message;

    private boolean success;

    private boolean state;

    private TAuRoleInfo roleInfo;

    private List<TAuRoleInfo> roleInfoList;

    private List<TAuPower> powerlist;

    public String roleinsert(){
        boolean result=false;
        roleInfoList=roleInfoDAO.myfindByHql("from TAuRoleInfo where roleName=? and roleId=?",roleInfo.getRoleName(),roleInfo.getRoleId());
        if(roleInfoList.size()>0){
            success=true;
            state=false;
            message="权限名称或权限编号已存在！";
            return SUCCESS;
        }
        try {
                result=roleInfoInsertService.roleinsertservice(roleInfo,powerlist);
        }catch (Exception e){
            e.printStackTrace();
        }
        if(result==true){
            state=true;
            success=true;
            message="添加成功！";
            return SUCCESS;
        }else{
            state=false;
            success=true;
            message="添加失败！";
            return SUCCESS;
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

    public List<TAuPower> getPowerlist() {
        return powerlist;
    }

    public void setPowerlist(List<TAuPower> powerlist) {
        this.powerlist = powerlist;
    }

    public List<TAuRoleInfo> getRoleInfoList() {
        return roleInfoList;
    }

    public void setRoleInfoList(List<TAuRoleInfo> roleInfoList) {
        this.roleInfoList = roleInfoList;
    }
}
