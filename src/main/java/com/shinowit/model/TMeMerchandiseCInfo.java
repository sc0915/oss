package com.shinowit.model;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfo {
    private Integer id;
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;


    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",insertable = false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

}
