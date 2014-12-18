package com.shinowit.service;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/16.
 */
@Service
public class InStockInfoInsertService{

    @Resource
    private BaseDAO<TMeInStockInfo> tmisidao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> tmisdidao;


    @Transactional
    public boolean instock(TMeInStockInfo instockinfo,List<TMeInStockDetailsInfo> instockdeta_list){
        boolean result=false;
            Object obj = tmisidao.insert(instockinfo);
            if(obj==null){
                result = false;
            }else{
                for(TMeInStockDetailsInfo in:instockdeta_list){
                    in.setInStockInfo(instockinfo);
                    tmisdidao.insert(in);
                }
                result= true;
            }
        return result;
    }
}
