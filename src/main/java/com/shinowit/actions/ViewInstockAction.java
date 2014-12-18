package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.ViewMerchandinstock;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/4.
 */
public class ViewInstockAction extends ActionSupport {

    @Resource
    private BaseDAO<ViewMerchandinstock> viewMerchandinstockDAO;

    private List<ViewMerchandinstock> viewMerchandinstockList;

    public String viewinstock(){
        viewMerchandinstockList=viewMerchandinstockDAO.listAll(ViewMerchandinstock.class);
        return SUCCESS;
    }

    public List<ViewMerchandinstock> getViewMerchandinstockList() {
        return viewMerchandinstockList;
    }

    public void setViewMerchandinstockList(List<ViewMerchandinstock> viewMerchandinstockList) {
        this.viewMerchandinstockList = viewMerchandinstockList;
    }
}
