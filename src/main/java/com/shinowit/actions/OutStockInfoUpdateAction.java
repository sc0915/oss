package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.model.TMeOutStockDetailsInfo;
import com.shinowit.model.TMeOutStockInfo;
import com.shinowit.service.OutStockInfoUpdateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/28.
 */
@Service
public class OutStockInfoUpdateAction extends ActionSupport {

    @Resource
    private OutStockInfoUpdateService outStockInfoUpdateService;

    private TMeOutStockInfo outStockInfo;

    private List<TMeOutStockDetailsInfo> detailsInfoList;

    private boolean success;

    private boolean state;

    private String message;

    public String outstockupdate(){
        boolean result=outStockInfoUpdateService.outstockupdate(outStockInfo,detailsInfoList);
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

    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

    public List<TMeOutStockDetailsInfo> getDetailsInfoList() {
        return detailsInfoList;
    }

    public void setDetailsInfoList(List<TMeOutStockDetailsInfo> detailsInfoList) {
        this.detailsInfoList = detailsInfoList;
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
