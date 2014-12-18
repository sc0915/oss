package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeMerchandiseInfo;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/11/14.
 */
public class MerchandiseInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> tmmidao;

    private List<TMeMerchandiseInfo> tmmilist;

    private int limit;

    private int page;

    private int sumcount;

    private String gysname;

    private String num;


    public String tmmipage(){

        String sqlpage= " from TMeMerchandiseInfo where 1=1 ";
        String sqlcount=" select count(*) from TMeMerchandiseInfo where 1=1 ";

        List<Object> array=new ArrayList<Object>();
        if((gysname!=null)&&(gysname.trim().length()>0)){
            try {
                byte b[]=gysname.getBytes("ISO-8859-1");
                gysname=new String(b,"UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            sqlpage=sqlpage+" and merchandiseName like ? ";
            sqlcount=sqlcount+" and merchandiseName like ? ";
            array.add("%"+gysname+"%");
        }
        if((num!=null)&&(num.trim().length()>0)){
            sqlpage=sqlpage+"and merchandiseAb like ?";
            sqlcount=sqlcount+"and merchandiseAb like ?";
            array.add("%"+num+"%");
        }
            sumcount=tmmidao.queryRecordCount(sqlcount,array.toArray());
            if((sumcount%limit==0)&&(sumcount/limit<page)){
                page=page-1;
            }
            tmmilist=tmmidao.queryForPage(sqlpage,page,limit,array.toArray());
            return SUCCESS;
    }


    public List<TMeMerchandiseInfo> getTmmilist() {
        return tmmilist;
    }

    public void setTmmilist(List<TMeMerchandiseInfo> tmmilist) {
        this.tmmilist = tmmilist;
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

    public String getGysname() {
        return gysname;
    }

    public void setGysname(String gysname) {
        this.gysname = gysname;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }
}
