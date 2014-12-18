package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/13.
 */
public class ProStatusInfoInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeProStatusInfo> tmpsidao;

    private List<TMeProStatusInfo> tmpsilist;

    private TMeProStatusInfo tmpsi;

    private String message;

    private boolean success;

    public String tmpsiinsert(){
        tmpsilist=tmpsidao.myfindByHql("from TMeProStatusInfo where proStatusName=?",tmpsi.getProStatusName());
        for(TMeProStatusInfo t:tmpsilist){
            if(t.getProStatusName().equals(tmpsi.getProStatusName())){
                success=false;
                message="促销状态已存在！";
                return SUCCESS;
            }
        }
        Object obj=tmpsidao.insert(tmpsi);
        if(obj==null){
            success=false;
            message="网络异常添加失败！";
            return SUCCESS;
        }else{
            success=true;
            message="添加成功！";
            return SUCCESS;
        }
   }

    public List<TMeProStatusInfo> getTmpsilist() {
        return tmpsilist;
    }

    public void setTmpsilist(List<TMeProStatusInfo> tmpsilist) {
        this.tmpsilist = tmpsilist;
    }

    public TMeProStatusInfo getTmpsi() {
        return tmpsi;
    }

    public void setTmpsi(TMeProStatusInfo tmpsi) {
        this.tmpsi = tmpsi;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
