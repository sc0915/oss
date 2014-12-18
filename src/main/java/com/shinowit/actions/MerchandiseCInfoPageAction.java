package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/11/12.
 */
public class MerchandiseCInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfo> tmmcidao;

    private List<TMeMerchandiseCInfo> tmmcilist;

    private TMeMerchandiseCInfo tmmci;

    private int limit;

    private int page;

    private int sumcount;

    private String name;


    public String tmmcipage(){
        String sqlpage= " from TMeMerchandiseCInfo where 1=1 ";
        String sqlcount=" select count(*) from TMeMerchandiseCInfo where 1=1 ";
        List<Object> array=new ArrayList<Object>();
        if((name!=null)&&(name.trim().length()>0)){
            try {
                byte b[]=name.getBytes("ISO-8859-1");
                name=new String(b,"UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            sqlpage=sqlpage+" and merchandiseCName like ? ";
            sqlcount=sqlcount+" and merchandiseCName like ? ";
            array.add("%"+name+"%");
        }
        sumcount=tmmcidao.queryRecordCount(sqlcount,array.toArray());
        if((sumcount%limit==0)&&(sumcount/limit<page)){
            page=page-1;
        }
        tmmcilist=tmmcidao.queryForPage(sqlpage,page,limit,array.toArray());
        return SUCCESS;
//        if((name!=null)&&(name.trim().length()>0)){
//            try {
//                byte b[]=name.getBytes("ISO-8859-1");
//                name=new String(b,"UTF-8");
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            sumcount=tmmcidao.queryRecordCount("select count(*) from TMeMerchandiseCInfo where merchandiseCName like \'%"+name+"%\' ");
//            if((sumcount%limit==0)&&(sumcount/limit<page)){
//                page=page-1;
//            }
//            tmmcilist=tmmcidao.queryForPage("from TMeMerchandiseCInfo where merchandiseCName like \'%"+name+"%\' ",page,limit);
//            return SUCCESS;
//        }else{
//            sumcount=tmmcidao.queryRecordCount("select count(*) from TMeMerchandiseCInfo");
//            if((sumcount%limit==0)&&(sumcount/limit<page)){
//                page=page-1;
//            }
//            tmmcilist=tmmcidao.queryForPage("from TMeMerchandiseCInfo",page,limit);
//            return SUCCESS;
//        }
    }

    public List<TMeMerchandiseCInfo> getTmmcilist() {
        return tmmcilist;
    }

    public void setTmmcilist(List<TMeMerchandiseCInfo> tmmcilist) {
        this.tmmcilist = tmmcilist;
    }

    public TMeMerchandiseCInfo getTmmci() {
        return tmmci;
    }

    public void setTmmci(TMeMerchandiseCInfo tmmci) {
        this.tmmci = tmmci;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
