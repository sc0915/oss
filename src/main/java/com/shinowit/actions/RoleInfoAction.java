package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuRoleInfo;
import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/6.
 */
public class RoleInfoAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuRoleInfo> roleInfoDAO;

    private List<TAuRoleInfo> roleInfoList;

    private int page;

    private int sumcount;

    private int limit;

    public String rolepage(){
        sumcount=roleInfoDAO.queryRecordCount("select count(*) from TAuRoleInfo ");
        if((sumcount%limit==0)&&(sumcount/limit<page)){
            page=page-1;
        }
        roleInfoList=roleInfoDAO.queryForPage("from TAuRoleInfo",page,limit);
        return SUCCESS;
    }

    public List<TAuRoleInfo> getRoleInfoList() {
        return roleInfoList;
    }

    public void setRoleInfoList(List<TAuRoleInfo> roleInfoList) {
        this.roleInfoList = roleInfoList;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSumcount() {
        return sumcount;
    }

    public void setSumcount(int sumcount) {
        this.sumcount = sumcount;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
