package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.model.TMeOutStockInfo;
import com.shinowit.service.OutStockInfoDeleteService;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/28.
 */
public class OutStockInfoDelteAction extends ActionSupport {

    @Resource
    private OutStockInfoDeleteService outStockInfoDeleteService;

    private TMeOutStockInfo outStockInfo;

    private boolean success;

    private String message;

    private boolean state;

    public String outstockdel(){
        String code=outStockInfo.getOutBillCode();
        boolean result=outStockInfoDeleteService.outstockdel(code);
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

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
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

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }
}
