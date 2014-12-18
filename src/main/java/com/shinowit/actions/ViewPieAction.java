package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.ViewPie;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/3.
 */
public class ViewPieAction extends ActionSupport {

    @Resource
    private BaseDAO<ViewPie> viewPieDAO;

    private List<ViewPie> viewPieList;

    public String viewpie(){
        viewPieList=viewPieDAO.listAll(ViewPie.class);
        return SUCCESS;
    }

    public List<ViewPie> getViewPieList() {
        return viewPieList;
    }

    public void setViewPieList(List<ViewPie> viewPieList) {
        this.viewPieList = viewPieList;
    }
}
