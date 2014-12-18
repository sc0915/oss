package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.md5.GB2Alpha;
import com.shinowit.model.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by SC on 2014/11/11.
 */
public class SupplierInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfo> supplierdao;

    private TBaSupplierInfo supplier;

    private List<TBaSupplierInfo> supplierlist;

    private boolean success;

    private String message;


    public String supplierinsert(){
        supplierlist=supplierdao.myfindByHql("from TBaSupplierInfo where supplierId=? or supplierName=?",supplier.getSupplierId(),supplier.getSupplierName());
        for(TBaSupplierInfo t:supplierlist){
            if(t.getSupplierId().equals(supplier.getSupplierId())){
                success=false;
                message="供应商编码已存在！";
                return SUCCESS;
            }
            if(t.getSupplierName().equals(supplier.getSupplierName())){
                success=false;
                message="供应商名称已存在！";
                return SUCCESS;
            }
        }
        GB2Alpha gba=new GB2Alpha();
        supplier.setSupplierAb(gba.String2Alpha(supplier.getSupplierName()));
        Object obj=supplierdao.insert(supplier);
        if(obj==null){
            success=false;
            message="网络异常添加失败！";
            return SUCCESS;
        }
        if(obj!=null){
            success=true;
            message="添加成功";
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

    public List<TBaSupplierInfo> getSupplierlist() {
        return supplierlist;
    }

    public void setSupplierlist(List<TBaSupplierInfo> supplierlist) {
        this.supplierlist = supplierlist;
    }
}
