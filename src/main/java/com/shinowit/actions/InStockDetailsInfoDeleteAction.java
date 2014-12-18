package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/20.
 */
public class InStockDetailsInfoDeleteAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> indetadao;

    private TMeInStockDetailsInfo indeta;

    private boolean success;

    private boolean state;

    private String message;

    public String indetadel(){
        boolean result=indetadao.delete(indeta);
        if(result==true){
            state=true;
            success=true;
            message="删除成功！";
            return SUCCESS;
        }else{
            state=false;
            success=true;
            message="删除失败!";
            return SUCCESS;
        }
    }


    public TMeInStockDetailsInfo getIndeta() {
        return indeta;
    }

    public void setIndeta(TMeInStockDetailsInfo indeta) {
        this.indeta = indeta;
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
