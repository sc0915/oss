package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.model.TMeInStockInfo;
import com.shinowit.service.InStockInfoDeleteService;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/20.
 */
public class InStockDeleteAction extends ActionSupport {

    @Resource
    private InStockInfoDeleteService instockservice;

    private TMeInStockInfo instock;

    private boolean success;

    private boolean state;

    private String message;

    public String instockdel(){
        String id=instock.getBillCode();
        boolean result=instockservice.del(id);
        if(result==true){
            state=true;
            success=true;
            message="删除成功！";
            return SUCCESS;
        }else{
            state=false;
            success=true;
            message="删除失败！";
            return SUCCESS;
        }
    }


    public TMeInStockInfo getInstock() {
        return instock;
    }

    public void setInstock(TMeInStockInfo instock) {
        this.instock = instock;
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
