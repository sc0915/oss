package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.model.TAuAuthorization;
import com.shinowit.model.TAuPower;
import com.shinowit.model.TAuRoleInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by SC on 2014/12/8.
 */
@Service
public class RoleInfoInsertService {

    @Resource
    private BaseDAO<TAuRoleInfo> roleInfoDAO;

    @Resource
    private BaseDAO<TAuAuthorization> authorizationDAO;

    @Transactional
    public boolean roleinsertservice(TAuRoleInfo roleInfo,List<TAuPower> powerList){
        boolean result=false;
        Object obj=roleInfoDAO.insert(roleInfo);
        if(obj!=null){
            for(TAuPower t:powerList){
                TAuAuthorization authorization=new TAuAuthorization();
                authorization.setRoleInfo(roleInfo);
                authorization.setPower(t);
                authorization.setIsEnabled(true);
                authorizationDAO.insert(authorization);
            }
            result=true;
        }
        return result;
    }
}
