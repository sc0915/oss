package com.shinowit.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SC on 2014/12/1.
 */
public class TreeNode {


    private TreeNode parent;

    private List<TreeNode> children=new ArrayList<TreeNode>();

    private TAuPower power;

    public TAuPower getPower() {
        return power;
    }

    public void setPower(TAuPower power) {
        this.power = power;
    }

    public void addChild(TreeNode childNode){
        childNode.parent=this;
        children.add(childNode);
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }



    //    public String getText(){
//        if (null==this.power){
//            return null;
//        }
//        return this.power.getText();
//    }
//
//    public boolean isLeaf(){
//        if (null==this.power){
//            return false;
//        }
//        return this.power.isLeaf();
//    }
//
//    public Integer getId(){
//        if (null==this.power){
//            return null;
//        }
//        return this.power.getId();
//    }
}
