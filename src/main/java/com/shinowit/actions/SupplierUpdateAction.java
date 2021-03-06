package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TBaSupplierInfo;

import javax.annotation.Resource;


/**
 * Created by SC on 2014/11/12.
 */
public class SupplierUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfo> supplierdao;

    private TBaSupplierInfo supplier;

    private boolean success;

    private String message;

    public String supplierupdate(){
        boolean result=supplierdao.update(supplier);
        if(result==false){
            success=false;
            message="网络异常更新失败！";
            return SUCCESS;
        }
        if(result==true){
            success=true;
            message="更新成功";
            return SUCCESS;
        }
        return SUCCESS;
    }


    public TBaSupplierInfo getSupplier() {
        return supplier;
    }

    public void setSupplier(TBaSupplierInfo supplier) {
        this.supplier = supplier;
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
