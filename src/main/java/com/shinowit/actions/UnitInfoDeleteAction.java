package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/13.
 */
public class UnitInfoDeleteAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeUnitInfo> uidao;

    private TMeUnitInfo ui;

    private boolean success;

    private String message;

    private String more;

    public String uidelmore(){
        String arrays[]=more.split(",");
        for(String s:arrays){
            int i=uidao.executeHQL("delete from TMeUnitInfo where unitId=?",Integer.valueOf(s));
            if(i<0){
                success=false;
                message="删除成功";
                return SUCCESS;
            }else{
                success=true;
                message="删除成功！";
            }
        }
        return SUCCESS;
    }


    public String uidelone(){
        boolean result=uidao.delete(ui);
        if(result==false){
            success=false;
            message="删除失败！";
            return SUCCESS;
        }else{
            success=true;
            message="删除成功！";
            return SUCCESS;
        }
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

    public String getMore() {
        return more;
    }

    public void setMore(String more) {
        this.more = more;
    }
}
