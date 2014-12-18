package com.shinowit.dao;

import com.shinowit.model.TAuRoleInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Types;

/**
 * Created by SC on 2014/12/12.
 */
@Service
public class RoleDistableDAO {

    @Resource
    private JdbcTemplate jt;

    public boolean roledistable(TAuRoleInfo roleInfo){
        boolean result=false;
        String sql="update TAu_RoleInfo set State=? where RoleID=? ";
        int i=jt.update(sql,new Object[]{roleInfo.getState(),roleInfo.getRoleId()},new int[]{Types.BOOLEAN,Types.VARCHAR});
        if(i>0){
            result=true;
        }
        return result;
    }
}
