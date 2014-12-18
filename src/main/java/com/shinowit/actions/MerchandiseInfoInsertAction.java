package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.md5.GB2Alpha;
import com.shinowit.model.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/14.
 */
public class MerchandiseInfoInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> tmmidao;

    private TMeMerchandiseInfo tmminfo;

    private boolean success;

    private String message;


    public String tmmiinsert(){
        GB2Alpha gba=new GB2Alpha();
        tmminfo.setMerchandiseAb(gba.String2Alpha(tmminfo.getMerchandiseName()));
        Object obj=tmmidao.insert(tmminfo);
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


    public TMeMerchandiseInfo getTmminfo() {
        return tmminfo;
    }

    public void setTmminfo(TMeMerchandiseInfo tmminfo) {
        this.tmminfo = tmminfo;
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
