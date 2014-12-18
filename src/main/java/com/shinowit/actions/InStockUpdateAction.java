package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeInStockInfo;
import com.shinowit.service.InStockInfoUpdateService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/24.
 */
public class InStockUpdateAction extends ActionSupport {

    @Resource
    private InStockInfoUpdateService infoUpdateService;

    private TMeInStockInfo inStockInfo;

    private List<TMeInStockDetailsInfo> inStockDetailsInfoList;

    private boolean success;

    private String message;

    private boolean state;

     public String stockupdate() {
        boolean result = infoUpdateService.stockupdate(inStockInfo, inStockDetailsInfoList);
         if(result==true){
             state=true;
             success=true;
             message="更新成功！";
             return SUCCESS;
         }else{
             state=false;
             success=true;
             message="更新失败！";
             return SUCCESS;
         }
    }

    public TMeInStockInfo getInStockInfo() {
        return inStockInfo;
    }

    public void setInStockInfo(TMeInStockInfo inStockInfo) {
        this.inStockInfo = inStockInfo;
    }

    public List<TMeInStockDetailsInfo> getInStockDetailsInfoList() {
        return inStockDetailsInfoList;
    }

    public void setInStockDetailsInfoList(List<TMeInStockDetailsInfo> inStockDetailsInfoList) {
        this.inStockDetailsInfoList = inStockDetailsInfoList;
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
