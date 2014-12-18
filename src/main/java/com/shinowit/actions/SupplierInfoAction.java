package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TBaSupplierInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/11.
 */
public class SupplierInfoAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfo> supplierdao;

    private List<TBaSupplierInfo> supplierlist;

    private int sumcount;

    private int page;

    private int limit;

    private String num;

    private String gysname;

    public String supplier(){
        if(((num!=null)&&(num.trim().length()>0))||((gysname!=null)&&(gysname.trim().length()>0))){
            try {
                byte b[]=gysname.getBytes("ISO-8859-1");
                gysname=new String(b,"UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            sumcount=supplierdao.queryRecordCount("select count(*) from TBaSupplierInfo where supplierId like \'%"+num+"%\' and supplierName like \'%"+gysname+"%\' ");
            if((sumcount%limit==0)&&(sumcount/limit<page)){
                page=page-1;
            }
            supplierlist=supplierdao.queryForPage("from TBaSupplierInfo where supplierId like \'%"+num+"%\' and supplierName like \'%"+gysname+"%\' ",page,limit);
            return SUCCESS;
        }else{
            sumcount=supplierdao.queryRecordCount("select count(*) from TBaSupplierInfo");
            if((sumcount%limit==0)&&(sumcount/limit<page)) {
                page=page-1;
            }
            supplierlist = supplierdao.queryForPage("from TBaSupplierInfo", page, limit);
            return SUCCESS;
        }
    }

    public List<TBaSupplierInfo> getSupplierlist() {
        return supplierlist;
    }

    public void setSupplierlist(List<TBaSupplierInfo> supplierlist) {
        this.supplierlist = supplierlist;
    }

    public int getSumcount() {
        return sumcount;
    }

    public void setSumcount(int sumcount) {
        this.sumcount = sumcount;
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

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getGysname() {
        return gysname;
    }

    public void setGysname(String gysname) {
        this.gysname = gysname;
    }
}
