package com.shinowit.dao;

import com.shinowit.model.RoleTreeNode;
import com.shinowit.model.TAuPower;
import com.shinowit.model.TAuRoleInfo;
import com.shinowit.model.TreeNode;
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
public class RoleTreeDAO {

    @Resource
    private SessionFactory sessionFactory;


    private void querySubModule(RoleTreeNode parentNode){
        Session session=sessionFactory.openSession();
        String hql="from TAuPower  where sortId =?";
        Query query=session.createQuery(hql);
        query.setParameter(0,parentNode.getPower().getMenuId());
        List<TAuPower> moduleList=query.list();
        session.close();
        for (TAuPower t:moduleList){
            RoleTreeNode tree=new RoleTreeNode();
            tree.setPower(t);
            parentNode.addChild(tree);
            querySubModule(tree);
        }
    }




    @Transactional
    public RoleTreeNode queryPower(){
        RoleTreeNode result=new RoleTreeNode();
        Session session=sessionFactory.openSession();
        String sql=" select distinct c.* from TAu_RoleInfo a inner join TAu_Authorization b " +
                " on a.RoleID=b.RoleID inner join TAu_Power c on b.MenuID=c.MenuID " +
                " where c.SortID='0' ";
        Query query=session.createSQLQuery(sql).addEntity(TAuPower.class);

        List<TAuPower> powerList=query.list();
        session.close();

        for(TAuPower t:powerList){
            RoleTreeNode node=new RoleTreeNode();
            node.setPower(t);
            result.addChild(node);
            querySubModule(node);
        }
        return result;
    }
}
