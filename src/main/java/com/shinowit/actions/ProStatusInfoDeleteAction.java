package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeProStatusInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/13.
 */
public class ProStatusInfoDeleteAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeProStatusInfo> tmpsidao;

    private TMeProStatusInfo tmpsi;

    private boolean success;

    private String message;

    private String more;

    public String tmpsidelmore(){
        String arrays[]=more.split(",");
        for(String s:arrays){
            int result=tmpsidao.executeHQL("delete from TMeProStatusInfo where proStatusId=?",Integer.valueOf(s));
            if(result<1){
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


    public String tmpsidelone(){
        boolean result=tmpsidao.delete(tmpsi);
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


    public TMeProStatusInfo getTmpsi() {
        return tmpsi;
    }

    public void setTmpsi(TMeProStatusInfo tmpsi) {
        this.tmpsi = tmpsi;
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
