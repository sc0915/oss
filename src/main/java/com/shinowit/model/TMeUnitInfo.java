package com.shinowit.model;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_UnitInfo")
public class TMeUnitInfo {
    private Integer unitId;
    private String name;
    private Boolean status;
    private String remark;



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UnitID")
    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


}
