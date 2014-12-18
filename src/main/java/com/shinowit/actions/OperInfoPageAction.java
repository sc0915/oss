package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuOperInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/11/17.
 */
public class OperInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfo> operdao;

    private TAuOperInfo oper;

    private List<TAuOperInfo> operlist;

    private String name;

    private int page;

    private int limit;

    private int sumcount;


    public String operpage(){
       String countsql="select count(*) from TAuOperInfo where 1=1";
       String pagesql="from TAuOperInfo where 1=1";
       List<Object> array=new ArrayList<Object>();
       if((name!=null)&&(name.trim().length()>0)){
           try {
               String str =new String(name.getBytes("ISO-8859-1"),"UTF-8");
           } catch (UnsupportedEncodingException e) {
               e.printStackTrace();
           }
           countsql=countsql+"and operName like ?";
           pagesql=pagesql+"and operName like ?";
           array.add("%"+name+"%");
       }
       sumcount=operdao.queryRecordCount(countsql,array.toArray());
       if((sumcount%limit==0)&&(sumcount/limit<page)){
           page=page-1;
       }
       operlist=operdao.queryForPage(pagesql,page,limit,array.toArray());
        return SUCCESS;
    }


    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
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
