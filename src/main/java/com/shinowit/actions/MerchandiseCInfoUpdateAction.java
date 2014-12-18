package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/12.
 */
public class MerchandiseCInfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfo> tmmcidao;

    private List<TMeMerchandiseCInfo> tmmcilist;

    private TMeMerchandiseCInfo tmmci;

    private boolean success;

    private String message;

    public String tmmciupdate(){
        tmmcilist=tmmcidao.myfindByHql("from TMeMerchandiseCInfo where merchandiseCid=? and merchandiseCName=?",tmmci.getMerchandiseCid(),tmmci.getMerchandiseCName());
        for(TMeMerchandiseCInfo t:tmmcilist){
            if(t.getMerchandiseCid().equals(tmmci.getMerchandiseCid())){
                success=false;
                message="商品类别编码已存在！";
                return SUCCESS;
            }
            if(t.getMerchandiseCName().equals(tmmci.getMerchandiseCName())){
                success=false;
                message="商品类别名称已存在！";
            }
        }
        boolean result=tmmcidao.update(tmmci);
        if(result==false){
            success=false;
            message="网络异常更新失败！";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功！";
        }
        return SUCCESS;
    }

    public List<TMeMerchandiseCInfo> getTmmcilist() {
        return tmmcilist;
    }

    public void setTmmcilist(List<TMeMerchandiseCInfo> tmmcilist) {
        this.tmmcilist = tmmcilist;
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
}
