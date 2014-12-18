package com.shinowit.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/12/1.
 */
public class RoleTreeNode {

    private boolean checked;

    private RoleTreeNode parent;

    private List<RoleTreeNode> children=new ArrayList<RoleTreeNode>();

    private TAuPower power;

    public TAuPower getPower() {
        return power;
    }

    public void setPower(TAuPower power) {
        this.power = power;
    }

    public void addChild(RoleTreeNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public List<RoleTreeNode> getChildren() {
        return children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }

    public boolean isChecked() {
        return checked==true;
    }


}
