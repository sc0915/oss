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
public class RoleDeleteService {

    @Resource
    private BaseDAO<TAuRoleInfo> roleInfoDAO;

    @Resource
    private BaseDAO<TAuAuthorization> authorizationDAO;

    @Transactional
    public boolean roledelservice(String roleInfo){
        boolean result=false;
        int i = authorizationDAO.executeHQL("delete from TAuAuthorization where roleInfo.roleId=?",roleInfo);
        if(i>0){
            roleInfoDAO.executeHQL("delete from TAuRoleInfo where roleId=?",roleInfo);
            result=true;
        }
        return result;
    }
}
