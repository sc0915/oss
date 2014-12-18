package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/12/3.
 */
@Entity
@Table(name = "view_pie")
public class ViewPie {
    private String merchandiseName;
    private int id;
    private int num;

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Id
    @Basic
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }


}
