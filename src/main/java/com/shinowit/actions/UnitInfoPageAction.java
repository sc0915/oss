package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeUnitInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by SC on 2014/11/13.
 */
public class UnitInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeUnitInfo> uidao;

    private List<TMeUnitInfo> uilist;

    private TMeUnitInfo ui;

    private int page;

    private int limit;

    private int sumcount;

    private String name;

    public String uipage(){
        if((name!=null)&&(name.trim().length()>0)){
            try {
                setName(new String(name.getBytes("ISO-8859-1"),"UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sumcount=uidao.queryRecordCount("select count(*) from TMeUnitInfo where name like \'%"+name+"%\' ");
            if((sumcount%limit==0)&&(sumcount/limit<page)){
                page=page-1;
            }
            uilist=uidao.queryForPage("from TMeUnitInfo where name like \'%"+name+"%\' ",page,limit);
            return SUCCESS;
        }else{
            sumcount=uidao.queryRecordCount("select count(*) from TMeUnitInfo");
            if((sumcount%limit==0)&&(sumcount/limit<page)){
                page=page-1;
            }
            uilist=uidao.queryForPage("from TMeUnitInfo",page,limit);
            return SUCCESS;
        }
    }

    public List<TMeUnitInfo> getUilist() {
        return uilist;
    }

    public void setUilist(List<TMeUnitInfo> uilist) {
        this.uilist = uilist;
    }

    public TMeUnitInfo getUi() {
        return ui;
    }

    public void setUi(TMeUnitInfo ui) {
        this.ui = ui;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getSumcount() {
        return sumcount;
    }

    public void setSumcount(int sumcount) {
        this.sumcount = sumcount;
    }
}
