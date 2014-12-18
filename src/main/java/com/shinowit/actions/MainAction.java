package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/7.
 */
public class MainAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuMenuInfo> tmdao;

    @Resource
    private BaseDAO<MenuRestore> restoredao;

    @Resource
    private BaseDAO<MenuSell> selldao;

    @Resource
    private BaseDAO<MenuSystem> systemdao;

    @Resource
    private BaseDAO<MenuDrp> drpdao;

    @Resource
    private BaseDAO<MenuStore> storedao;

    @Resource
    private BaseDAO<MenuData> datadao;

    @Resource
    private BaseDAO<TMeInStockInfo> inStockInfoDAO;

    private List<TMeInStockInfo> inStockInfoList;

    private List<TAuMenuInfo> tmlist;

    private List<MenuRestore> restorelist;

    private List<MenuSell> selllist;

    private List<MenuSystem> systemlist;

    private List<MenuDrp> drplist;

    private List<MenuStore> storelist;

    private List<MenuData> datalist;


    public String execute(){
        return SUCCESS;
    }


    public String instock(){
        inStockInfoList=inStockInfoDAO.listAll(TMeInStockInfo.class);
        return SUCCESS;
    }

    public String menu(){
        tmlist=tmdao.listAll(TAuMenuInfo.class);
        return SUCCESS;
    }

    public String restore(){
        restorelist=restoredao.listAll(MenuRestore.class);
        return SUCCESS;
    }

    public String sell(){
        selllist=selldao.listAll(MenuSell.class);
        return  SUCCESS;
    }

    public String menusystem(){
        systemlist=systemdao.listAll(MenuSystem.class);
        return SUCCESS;
    }

    public String drp(){
        drplist=drpdao.listAll(MenuDrp.class);
        return SUCCESS;
    }

    public String store(){
        storelist=storedao.listAll(MenuStore.class);
        return SUCCESS;
    }

    public String menudata(){
        datalist=datadao.listAll(MenuData.class);
        return SUCCESS;
    }

    public List<TAuMenuInfo> getTmlist() {
        return tmlist;
    }

    public void setTmlist(List<TAuMenuInfo> tmlist) {
        this.tmlist = tmlist;
    }

    public List<MenuRestore> getRestorelist() {
        return restorelist;
    }

    public void setRestorelist(List<MenuRestore> restorelist) {
        this.restorelist = restorelist;
    }

    public List<MenuSell> getSelllist() {
        return selllist;
    }

    public void setSelllist(List<MenuSell> selllist) {
        this.selllist = selllist;
    }

    public List<MenuSystem> getSystemlist() {
        return systemlist;
    }

    public void setSystemlist(List<MenuSystem> systemlist) {
        this.systemlist = systemlist;
    }

    public List<MenuDrp> getDrplist() {
        return drplist;
    }

    public void setDrplist(List<MenuDrp> drplist) {
        this.drplist = drplist;
    }

    public List<MenuStore> getStorelist() {
        return storelist;
    }

    public void setStorelist(List<MenuStore> storelist) {
        this.storelist = storelist;
    }

    public List<MenuData> getDatalist() {
        return datalist;
    }

    public void setDatalist(List<MenuData> datalist) {
        this.datalist = datalist;
    }

    public List<TMeInStockInfo> getInStockInfoList() {
        return inStockInfoList;
    }

    public void setInStockInfoList(List<TMeInStockInfo> inStockInfoList) {
        this.inStockInfoList = inStockInfoList;
    }
}
