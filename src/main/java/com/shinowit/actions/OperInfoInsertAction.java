package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/29.
 */
public class OperInfoInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfo> operInfoDAO;

    private List<TAuOperInfo> operInfoList;

    private TAuOperInfo operInfo;

    private boolean state;

    private boolean success;

    private String message;

    public String operinsert(){
        operInfoList=operInfoDAO.myfindByHql("from TAuOperInfo where operId=? and operName=?",operInfo.getOperId(),operInfo.getOperName());
        if(operInfoList.size()>0){
            state=false;
            success=true;
            message="操作员编码或操作员名称已存在！";
            return SUCCESS;
        }
        Object obj=operInfoDAO.insert(operInfo);
        if(obj!=null){
            state=true;
            success=true;
            message="添加成功！";
            return SUCCESS;
        }else{
            state=false;
            success=true;
            message="添加失败！";
            return SUCCESS;
        }
    }

    public TAuOperInfo getOperInfo() {
        return operInfo;
    }

    public void setOperInfo(TAuOperInfo operInfo) {
        this.operInfo = operInfo;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
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

    public List<TAuOperInfo> getOperInfoList() {
        return operInfoList;
    }

    public void setOperInfoList(List<TAuOperInfo> operInfoList) {
        this.operInfoList = operInfoList;
    }
}
