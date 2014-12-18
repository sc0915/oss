package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.model.TMeOutStockDetailsInfo;
import com.shinowit.model.TMeOutStockInfo;
import com.shinowit.service.OutStockInfoInsertService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/27.
 */
public class OutStockInfoInsertAction extends ActionSupport {

    @Resource
    private OutStockInfoInsertService outStockInfoInsertService;

    private TMeOutStockInfo outStockInfo;

    private List<TMeOutStockDetailsInfo>outDetailsInfoList;

    private boolean success;

    private String message;


    public String outstockinsert(){
        boolean result=outStockInfoInsertService.outstock(outStockInfo,outDetailsInfoList);
        if(result==false){
            success=false;
            message="出库失败！";
            return SUCCESS;
        }else{
            success=true;
            message="出库成功！";
            return SUCCESS;
        }
    }

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public List<TMeOutStockDetailsInfo> getOutDetailsInfoList() {
        return outDetailsInfoList;
    }

    public void setOutDetailsInfoList(List<TMeOutStockDetailsInfo> outDetailsInfoList) {
        this.outDetailsInfoList = outDetailsInfoList;
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
