package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/15.
 */
public class MerchandiseInfoDeleteAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> tmmidao;

    private TMeMerchandiseInfo tmmi;

    private boolean success;

    private String message;

    private String more;

    public String tmmidelmore (){
        String arrays[]=more.split(",");
        for(String s:arrays){
            int i=tmmidao.executeHQL("delete from TMeMerchandiseInfo where merchandiseId=?",s);
            if(i<1){
                success=false;
                message="网络异常删除失败！";
                return SUCCESS;
            }else{
                success=true;
                message="删除成功！";
            }
        }
        return SUCCESS;
    }


    public String tmmidelone(){
        boolean result=tmmidao.delete(tmmi);
        if(result==false){
            success=false;
            message="删除失败！";
            return SUCCESS;
        }else{
            success=true;
            message="删除成功！";
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

    public String getMore() {
        return more;
    }

    public void setMore(String more) {
        this.more = more;
    }
}
