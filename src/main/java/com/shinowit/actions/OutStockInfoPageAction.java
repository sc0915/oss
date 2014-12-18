package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/28.
 */
public class OutStockInfoPageAction extends ActionSupport{

    @Resource
    private BaseDAO<TMeOutStockInfo> outStockInfoDAO;

    private List<TMeOutStockInfo> outStockInfoList;

    private int page;

    private int limit;

    private int sumcount;

    public String outstockpage(){
        sumcount=outStockInfoDAO.queryRecordCount("select count(*) from TMeOutStockInfo");
        if((sumcount%limit==0)&&(sumcount/limit<page)){
            page=page-1;
        }
        outStockInfoList=outStockInfoDAO.queryForPage("from TMeOutStockInfo order by outTime desc ",page,limit);
        return SUCCESS;
    }

    public List<TMeOutStockInfo> getOutStockInfoList() {
        return outStockInfoList;
    }

    public void setOutStockInfoList(List<TMeOutStockInfo> outStockInfoList) {
        this.outStockInfoList = outStockInfoList;
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
