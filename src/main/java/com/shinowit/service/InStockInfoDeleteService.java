package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * Created by SC on 2014/11/20.
 */
@Service
public class InStockInfoDeleteService {

    @Resource
    private BaseDAO<TMeInStockInfo> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> indetadao;

    @Transactional
    public boolean del(String inStockInfo) {
        boolean result = false;
        int i = indetadao.executeHQL("delete from TMeInStockDetailsInfo where inStockInfo.billCode=?", inStockInfo);
        if (i >= 0) {
            instockdao.executeHQL("delete from TMeInStockInfo where billCode=?", inStockInfo);
            result = true;
        }
        return result;
    }
}
