package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockInfo;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by SC on 2014/11/20.
 */
public class InStockPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockInfo> instockdao;

    private List<TMeInStockInfo> instocklist;

    private int page;

    private int limit;

    private int sumcount;

    public String instockpage(){
        sumcount=instockdao.queryRecordCount("select count(*) from TMeInStockInfo");
        if((sumcount%limit==0)&&(sumcount/limit<page)){
            page=page-1;
        }
        instocklist=instockdao.queryForPage("from TMeInStockInfo order by inTime desc",page,limit);
        return SUCCESS;
    }

    public List<TMeInStockInfo> getInstocklist() {
        return instocklist;
    }

    public void setInstocklist(List<TMeInStockInfo> instocklist) {
        this.instocklist = instocklist;
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
