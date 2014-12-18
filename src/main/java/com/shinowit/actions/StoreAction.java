package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/20.
 */
public class StoreAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfo> tMeMerchandiseInfoBaseDAO;

    private List<TMeMerchandiseInfo> tMeMerchandiseInfoList;

    @Resource
    private BaseDAO<TAuOperInfo> tAuOperInfoBaseDAO;

    private List<TAuOperInfo> tAuOperInfoList;

    @Resource
    private BaseDAO<TBaSupplierInfo> tBaSupplierInfoBaseDAO;

    private List<TBaSupplierInfo> tBaSupplierInfoList;

    @Resource
    private BaseDAO<TMeStockInfo> tMeStockInfoBaseDAO;

    private List<TMeStockInfo> tMeStockInfoList;

    @Resource
    private BaseDAO<TAuRoleInfo> roleInfoBaseDAO;

    private List<TAuRoleInfo> roleInfoList;

    public String tMeMerchandiseInfo(){
        tMeMerchandiseInfoList=tMeMerchandiseInfoBaseDAO.listAll(TMeMerchandiseInfo.class);
        return SUCCESS;
    }

    public String tAuOperInfo(){
        tAuOperInfoList=tAuOperInfoBaseDAO.listAll(TAuOperInfo.class);
        return SUCCESS;
    }

    public String tBaSupplierInfo(){
        tBaSupplierInfoList=tBaSupplierInfoBaseDAO.listAll(TBaSupplierInfo.class);
        return SUCCESS;
    }

    public String tMeStockInfo(){
        tMeStockInfoList=tMeStockInfoBaseDAO.listAll(TMeStockInfo.class);
        return SUCCESS;
    }


    public String operInfo(){
        roleInfoList=roleInfoBaseDAO.myfindByHql("from TAuRoleInfo where state=true");
        return SUCCESS;
    }







    public List<TAuRoleInfo> getRoleInfoList() {
        return roleInfoList;
    }

    public void setRoleInfoList(List<TAuRoleInfo> roleInfoList) {
        this.roleInfoList = roleInfoList;
    }

    public List<TMeStockInfo> gettMeStockInfoList() {
        return tMeStockInfoList;
    }

    public void settMeStockInfoList(List<TMeStockInfo> tMeStockInfoList) {
        this.tMeStockInfoList = tMeStockInfoList;
    }

    public List<TBaSupplierInfo> gettBaSupplierInfoList() {
        return tBaSupplierInfoList;
    }

    public void settBaSupplierInfoList(List<TBaSupplierInfo> tBaSupplierInfoList) {
        this.tBaSupplierInfoList = tBaSupplierInfoList;
    }

    public List<TMeMerchandiseInfo> gettMeMerchandiseInfoList() {
        return tMeMerchandiseInfoList;
    }

    public void settMeMerchandiseInfoList(List<TMeMerchandiseInfo> tMeMerchandiseInfoList) {
        this.tMeMerchandiseInfoList = tMeMerchandiseInfoList;
    }

    public List<TAuOperInfo> gettAuOperInfoList() {
        return tAuOperInfoList;
    }

    public void settAuOperInfoList(List<TAuOperInfo> tAuOperInfoList) {
        this.tAuOperInfoList = tAuOperInfoList;
    }
}
