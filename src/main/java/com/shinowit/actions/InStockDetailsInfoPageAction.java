package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/20.
 */
public class InStockDetailsInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> indetadao;

    private List<TMeInStockDetailsInfo> indetalist;

    private String code;

    public String indetapage(){
        indetalist=indetadao.myfindByHql("from TMeInStockDetailsInfo where inStockInfo.billCode=?",code);
        return SUCCESS;
    }

    public List<TMeInStockDetailsInfo> getIndetalist() {
        return indetalist;
    }

    public void setIndetalist(List<TMeInStockDetailsInfo> indetalist) {
        this.indetalist = indetalist;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
