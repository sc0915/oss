package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeStockInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/11/24.
 */
public class StockInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeStockInfo> stockInfoDAO;

    private List<TMeStockInfo> tMestocksinfoList;

    private int page;

    private int limit;

    private int sumcount;

    private String name;



    private String uuid;

    public String tMestocksinfo(){
        tMestocksinfoList=stockInfoDAO.myfindByHql("from TMeStockInfo where merchandiseInfo.merchandiseId=?",uuid);
        return SUCCESS;
    }


    public String stockpage(){
        String countsql="select count(*) from TMeStockInfo where 1=1";
        String pagesql="from TMeStockInfo where 1=1";
        List<Object> array=new ArrayList<Object>();
        if((name!=null)&&(name.trim().length()>0)){
            try {
                String str = new String(name.getBytes("iso-8859-1"), "utf-8");
                setName(str);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            countsql=countsql+"and  merchandiseInfo.merchandiseName like ?";
            pagesql=pagesql+"and merchandiseInfo.merchandiseName like ?";
            array.add("%"+name+"%");
        }
        sumcount=stockInfoDAO.queryRecordCount(countsql,array.toArray());
        if((sumcount%limit==0)&&(sumcount/limit<page)){
            page=page-1;
        }
        tMestocksinfoList=stockInfoDAO.queryForPage(pagesql,page,limit,array.toArray());
        return SUCCESS;
    }


    public List<TMeStockInfo> gettMestocksinfoList() {
        return tMestocksinfoList;
    }

    public void settMestocksinfoList(List<TMeStockInfo> tMestocksinfoList) {
        this.tMestocksinfoList = tMestocksinfoList;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
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
