package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/13.
 */
public class UnitInfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeUnitInfo> uidao;

    private List<TMeUnitInfo> uilist;

    private TMeUnitInfo ui;

    private boolean success;

    private String message;

    public String uiupdate(){
        uilist=uidao.myfindByHql("from TMeUnitInfo where name=?",ui.getName());
        for(TMeUnitInfo t:uilist){
            if(t.getName().equals(ui.getName())){
                success=false;
                message="名称不能重复！";
            }
        }
        boolean result=uidao.update(ui);
        if(result=false){
            success=false;
            message="网络异常更新失败！";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功！";
            return SUCCESS;
        }
    }

    public List<TMeUnitInfo> getUilist() {
        return uilist;
    }

    public void setUilist(List<TMeUnitInfo> uilist) {
        this.uilist = uilist;
    }

    public TMeUnitInfo getUi() {
        return ui;
    }

    public void setUi(TMeUnitInfo ui) {
        this.ui = ui;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
