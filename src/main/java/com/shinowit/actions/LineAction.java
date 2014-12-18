package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.dao.LineDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeOutStockDetailsInfo;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by SC on 2014/12/6.
 */
public class LineAction extends ActionSupport {

    @Resource
    private LineDAO lineDAO;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> tMeInStockDetailsInfoDAO;

    private List<Map<String,Object>> list;

//    private List<TMeInStockDetailsInfo> list;

    private Date intime;

    public String pie(){
        list=lineDAO.querypie(intime);
        return SUCCESS;
    }
//    public String pie(){
//        list=tMeInStockDetailsInfoDAO.myfindByHql("from TMeInStockDetailsInfo where inStockInfo.inTime=?",intime);
//        return SUCCESS;
//    }

    public Date getIntime() {
        return intime;
    }

    public void setIntime(Date intime) {
        this.intime = intime;
    }

    public List<Map<String, Object>> getList() {
        return list;
    }

    public void setList(List<Map<String, Object>> list) {
        this.list = list;
    }


//    public List<TMeInStockDetailsInfo> getList() {
//        return list;
//    }
//
//    public void setList(List<TMeInStockDetailsInfo> list) {
//        this.list = list;
//    }
}
