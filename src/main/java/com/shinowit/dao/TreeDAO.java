package com.shinowit.dao;

import com.shinowit.model.TAuPower;
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
public class TreeDAO {

    @Resource
    private SessionFactory sessionFactory;


    private void querySubModule(TreeNode parentNode,String userId){
        Session session=sessionFactory.openSession();
        String sql=" select distinct d.* from TAu_OperInfo a inner join TAu_RoleInfo b on a.RoleID=b.RoleID " +
                " inner join TAu_Authorization c on b.RoleID=c.RoleID " +
                " inner join TAu_Power d on c.MenuID=d.MenuID where d.SortID =? and a.OperID=?  ";
        Query query=session.createSQLQuery(sql).addEntity(TAuPower.class);
        query.setParameter(0,parentNode.getPower().getMenuId());
        query.setParameter(1,userId);
        List<TAuPower> moduleList=query.list();
        session.close();

        for (TAuPower t:moduleList){
            TreeNode tree=new TreeNode();
            tree.setPower(t);
            parentNode.addChild(tree);
            querySubModule(tree,userId);
        }
    }




    @Transactional
    public TreeNode queryPower(String userId){
        TreeNode result=new TreeNode();
        Session session=sessionFactory.openSession();
        String sql=" select distinct d.* from TAu_OperInfo a inner join TAu_RoleInfo b on a.RoleID=b.RoleID " +
                " inner join TAu_Authorization c on b.RoleID=c.RoleID " +
                " inner join TAu_Power d on c.MenuID=d.MenuID where a.OperID=? and d.SortID ='0' ";
        Query query=session.createSQLQuery(sql).addEntity(TAuPower.class);
        query.setParameter(0,userId);

        List<TAuPower> powerList=query.list();
        session.close();

        for(TAuPower t:powerList){
            TreeNode node=new TreeNode();
            node.setPower(t);
            result.addChild(node);
            querySubModule(node,userId);
        }
        return result;
    }

}
