package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeOutStockDetailsInfo;
import com.shinowit.model.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/28.
 */
@Service
public class OutStockInfoDeleteService {

    @Resource
    private BaseDAO<TMeOutStockInfo> outStockDAO;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outStockDetailsDAO;

    @Transactional
    public boolean outstockdel(String outbillcode){
        boolean result=false;
        try {
            int i = outStockDetailsDAO.executeHQL("delete from TMeOutStockDetailsInfo where outStockInfo.outBillCode=?",outbillcode);
            if(i>=0){
                outStockDAO.executeHQL("delete from TMeOutStockInfo where outBillCode=?",outbillcode);
            }
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
