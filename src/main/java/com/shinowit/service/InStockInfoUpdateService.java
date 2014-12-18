package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeInStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/24.
 */
@Service
public class InStockInfoUpdateService {

    @Resource
    private BaseDAO<TMeInStockInfo> instockinfoDAO;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> instockdetailsDAO;

    @Transactional
    public boolean stockupdate(TMeInStockInfo inStockInfo, List<TMeInStockDetailsInfo> inStockDetailsInfoList){
        boolean result=false;
        try {
            boolean i=instockinfoDAO.update(inStockInfo);
            if(i==true){
                for(TMeInStockDetailsInfo t:inStockDetailsInfoList){
                    instockdetailsDAO.update(t);
                }
            }
            result=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
