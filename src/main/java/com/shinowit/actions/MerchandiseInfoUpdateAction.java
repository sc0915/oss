package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/15.
 */
public class MerchandiseInfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> tmmidao;

    private TMeMerchandiseInfo tmmi;

    private boolean success;

    private String message;

    public String tmmiupdate(){
        boolean result=tmmidao.update(tmmi);
        if(result==false){
            success=false;
            message="网络异常更新失败！";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功！";
            return SUCCESS;
        }
    }

    public TMeMerchandiseInfo getTmmi() {
        return tmmi;
    }

    public void setTmmi(TMeMerchandiseInfo tmmi) {
        this.tmmi = tmmi;
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
