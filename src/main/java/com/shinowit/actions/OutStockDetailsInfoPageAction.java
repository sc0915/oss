package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeOutStockDetailsInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/28.
 */
public class OutStockDetailsInfoPageAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outStockDetailsInfoDAO;

    private List<TMeOutStockDetailsInfo> outDetailsList;

    private String code;

    public String detapage(){
        outDetailsList=outStockDetailsInfoDAO.myfindByHql("from TMeOutStockDetailsInfo where outStockInfo.outBillCode=?",code);
        return SUCCESS;
    }

    public List<TMeOutStockDetailsInfo> getOutDetailsList() {
        return outDetailsList;
    }

    public void setOutDetailsList(List<TMeOutStockDetailsInfo> outDetailsList) {
        this.outDetailsList = outDetailsList;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
