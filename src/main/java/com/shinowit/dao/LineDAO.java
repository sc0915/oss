package com.shinowit.dao;

import com.shinowit.model.TMeInStockDetailsInfo;
import com.shinowit.model.TMeOutStockDetailsInfo;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Types;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * Created by SC on 2014/12/6.
 */
@Service
public class LineDAO {

    @Resource
    private JdbcTemplate jt;

    public List<Map<String,Object>> querypie(Date intime){
        String sql="select b.*,c.MerchandiseName from TMe_InStockDetailsInfo b inner join TMe_InStockInfo a " +
                " on a.BillCode=b.BillCode inner join TMe_MerchandiseInfo c " +
                " on b.MerchandiseID=c.MerchandiseID  where a.InTime=? ";
        List<Map<String,Object>> list=jt.queryForList(sql,new Object[]{intime},new int[]{Types.TIMESTAMP});
        return list;
    }
}
