package com.shinowit.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_ProStatusInfo")
public class TMeProStatusInfo {
    private Integer proStatusId;
    private String proStatusName;
    private Boolean status;
    private String remark;
    private List<TMeMerchandiseInfo> merchandiseInfo;


    @Id
    @Column(name = "ProStatusID")
    public Integer getProStatusId() {
        return proStatusId;
    }

    public void setProStatusId(Integer proStatusId) {
        this.proStatusId = proStatusId;
    }

    @Basic
    @Column(name = "ProStatusName")
    public String getProStatusName() {
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
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


    @OneToMany(mappedBy = "proStatusInfo")
    public List<TMeMerchandiseInfo> getMerchandiseInfo() {
        return merchandiseInfo;
    }

    public void setMerchandiseInfo(List<TMeMerchandiseInfo> merchandiseInfo) {
        this.merchandiseInfo = merchandiseInfo;
    }
}
