package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseCInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/12.
 */
public class MerchandiseCInfoSelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfo> tmmcidao;

    private TMeMerchandiseCInfo tmmci;

    private boolean success;

    private String message;

    private String more;

    public String tmmcidelete(){
        String Arrays[]=more.split(",");
        for(String s:Arrays){
            int i=tmmcidao.executeHQL("delete from TMeMerchandiseCInfo where merchandiseCid=?",s);
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

    public String tmmcideleteone(){
        boolean result=tmmcidao.delete(tmmci);
        if(result==false){
            success=false;
            message="网络异常删除失败！";
            return SUCCESS;
        }else{
            success=true;
            message="删除成功！";
            return SUCCESS;
        }
    }


    public TMeMerchandiseCInfo getTmmci() {
        return tmmci;
    }

    public void setTmmci(TMeMerchandiseCInfo tmmci) {
        this.tmmci = tmmci;
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
