package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeOrderDetailsInfo;
import com.shinowit.model.TMeOutStockDetailsInfo;
import com.shinowit.model.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/24.
 */
@Service
public class OutStockInfoInsertService {

    @Resource
    private BaseDAO<TMeOutStockInfo> outstockDAO;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outstockdetailsDAO;

    @Transactional
    public boolean outstock(TMeOutStockInfo outstockinfo,List<TMeOutStockDetailsInfo> outstocksetailslist){
        boolean result=false;
        try {
            String uuid=(String)outstockDAO.insert(outstockinfo);
            for(TMeOutStockDetailsInfo t:outstocksetailslist){
                t.setOutStockInfo(outstockinfo);
                outstockdetailsDAO.insert(t);
            }
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
