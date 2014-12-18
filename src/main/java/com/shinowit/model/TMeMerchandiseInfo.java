package com.shinowit.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfo {
    private Integer id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
    private TMeMerchandiseCInfo merchandiseCInfo;
    private TMeProStatusInfo proStatusInfo;
    private TMeUnitInfo unitInfo;



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
    @GenericGenerator(name="system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator="system-uuid")
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @ManyToOne
    @JoinColumn(name = "merchandiseCID", referencedColumnName = "merchandiseCID")
    public TMeMerchandiseCInfo getMerchandiseCInfo() {
        return merchandiseCInfo;
    }

    public void setMerchandiseCInfo(TMeMerchandiseCInfo merchandiseCInfo) {
        this.merchandiseCInfo = merchandiseCInfo;
    }

    @ManyToOne
    @JoinColumn(name = "proStatusID", referencedColumnName = "proStatusID")
    public TMeProStatusInfo getProStatusInfo() {
        return proStatusInfo;
    }

    public void setProStatusInfo(TMeProStatusInfo proStatusInfo) {
        this.proStatusInfo = proStatusInfo;
    }

    @ManyToOne
    @JoinColumn(name = "unitID", referencedColumnName = "unitID")
    public TMeUnitInfo getUnitInfo() {
        return unitInfo;
    }

    public void setUnitInfo(TMeUnitInfo unitInfo) {
        this.unitInfo = unitInfo;
    }

}
