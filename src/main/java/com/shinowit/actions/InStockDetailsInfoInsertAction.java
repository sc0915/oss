package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeInStockInfo;
import com.shinowit.service.InStockInfoInsertService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/11/17.
 */
public class InStockDetailsInfoInsertAction extends ActionSupport {

    @Resource
    private InStockInfoInsertService  stockservice;

    private TMeInStockInfo instockinfo;

    private List<TMeInStockDetailsInfo> instockdeta_list;

    private boolean success;

    private String message;

    private boolean state;



    public String insertstock(){
        boolean result=stockservice.instock(instockinfo,instockdeta_list);
        if(result==false){
            success=false;
            message="保存失败！";
            return SUCCESS;
        }else{
            success=true;
            message="保存成功！";
            return SUCCESS;
        }
    }

    public TMeInStockInfo getInstockinfo() {
        return instockinfo;
    }

    public void setInstockinfo(TMeInStockInfo instockinfo) {
        this.instockinfo = instockinfo;
    }

    public List<TMeInStockDetailsInfo> getInstockdeta_list() {
        return instockdeta_list;
    }

    public void setInstockdeta_list(List<TMeInStockDetailsInfo> instockdeta_list) {
        this.instockdeta_list = instockdeta_list;
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
