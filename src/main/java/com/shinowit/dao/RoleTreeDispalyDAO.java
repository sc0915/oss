package com.shinowit.dao;

import com.shinowit.model.RoleTreeDispalyNode;
import com.shinowit.model.TAuPower;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.Resource;
import java.util.List;


/**
 * Created by SC on 2014/11/30.
 */
@Service
public class RoleTreeDispalyDAO {

    @Resource
    private SessionFactory sessionFactory;


    private void querySubModule(RoleTreeDispalyNode parentNode,String roid){
        Session session=sessionFactory.openSession();
        String sql=" select distinct c.* from TAu_RoleInfo a inner join TAu_Authorization b " +
                " on a.RoleID=b.RoleID inner join TAu_Power c on b.MenuID=c.MenuID " +
                " where c.SortID=? and a.roleId=? ";
        Query query=session.createSQLQuery(sql).addEntity(TAuPower.class);
        query.setParameter(0,parentNode.getPower().getMenuId());
        query.setParameter(1,roid);
        List<TAuPower> moduleList=query.list();
        session.close();
        for (TAuPower t:moduleList){
            RoleTreeDispalyNode tree=new RoleTreeDispalyNode();
            tree.setPower(t);
            parentNode.addChild(tree);
            querySubModule(tree,roid);
        }
    }




    @Transactional
    public RoleTreeDispalyNode queryPower(String roid){
        RoleTreeDispalyNode result=new RoleTreeDispalyNode();
        Session session=sessionFactory.openSession();
        String sql=" select distinct c.* from TAu_RoleInfo a inner join TAu_Authorization b " +
                " on a.RoleID=b.RoleID inner join TAu_Power c on b.MenuID=c.MenuID " +
                " where a.roleId=?  and  c.SortID='0' ";
        Query query=session.createSQLQuery(sql).addEntity(TAuPower.class);
        query.setParameter(0,roid);
        List<TAuPower> powerList=query.list();
        session.close();

        for(TAuPower t:powerList){
            RoleTreeDispalyNode node=new RoleTreeDispalyNode();
            node.setPower(t);
            result.addChild(node);
            querySubModule(node,roid);
        }
        return result;
    }
}
