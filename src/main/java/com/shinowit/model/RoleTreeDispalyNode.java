package com.shinowit.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/12/1.
 */
public class RoleTreeDispalyNode {


    private RoleTreeDispalyNode parent;

    private List<RoleTreeDispalyNode> children=new ArrayList<RoleTreeDispalyNode>();

    private TAuPower power;

    public TAuPower getPower() {
        return power;
    }

    public void setPower(TAuPower power) {
        this.power = power;
    }

    public void addChild(RoleTreeDispalyNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public List<RoleTreeDispalyNode> getChildren() {
        return children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }

}
