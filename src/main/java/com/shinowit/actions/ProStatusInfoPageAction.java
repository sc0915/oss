package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;


/**
 * Created by SC on 2014/11/12.
 */
public class ProStatusInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeProStatusInfo> tmpsidao;

    private List<TMeProStatusInfo> tmpsilist;

    private TMeProStatusInfo tmpsi;

    private int page;

    private int limit;

    private int sumcount;

    private String name;


    public String tmpsipage() {
        if ((name != null) && (name.trim().length() > 0)) {
            try {
                byte b[] = name.getBytes("ISO-8859-1");
                name = new String(b, "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            sumcount = tmpsidao.queryRecordCount("select count(*) from TMeProStatusInfo where proStatusName like \'%"+name+"%\' ");
            if ((sumcount % limit == 0) && (sumcount / limit < page)) {
                page = page - 1;
            }
            tmpsilist = tmpsidao.queryForPage("from TMeProStatusInfo where proStatusName like \'%" + name + "%\'", page, limit);
                return SUCCESS;
        }else{
            sumcount = tmpsidao.queryRecordCount("select count(*) from TMeProStatusInfo");
            if ((sumcount % limit == 0) && (sumcount / limit < page)) {
                page = page - 1;
            }
            tmpsilist = tmpsidao.queryForPage("from TMeProStatusInfo ", page, limit);
            return SUCCESS;
    }
 }

    public List<TMeProStatusInfo> getTmpsilist() {
        return tmpsilist;
    }

    public void setTmpsilist(List<TMeProStatusInfo> tmpsilist) {
        this.tmpsilist = tmpsilist;
    }

    public TMeProStatusInfo getTmpsi() {
        return tmpsi;
    }

    public void setTmpsi(TMeProStatusInfo tmpsi) {
        this.tmpsi = tmpsi;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
