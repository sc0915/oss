package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TMeOutStockDetailsInfo;
import com.shinowit.model.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/11/28.
 */
@Service
public class OutStockInfoUpdateService {

    @Resource
    private BaseDAO<TMeOutStockInfo> outStockInfoDAO;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outStockDetailsInfoDAO;

    @Transactional
    public boolean outstockupdate(TMeOutStockInfo outStockInfo,List<TMeOutStockDetailsInfo> outStockDetailsInfoList){
        boolean result=false;
        try{
            boolean i=outStockInfoDAO.update(outStockInfo);
            if(i==true){
                for(TMeOutStockDetailsInfo t:outStockDetailsInfoList){
                    outStockDetailsInfoDAO.update(t);
                }
            }
            result=true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
