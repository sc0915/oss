package com.shinowit.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OrderInfo")
public class TMeOrderInfo {
    private Integer id;
    private String billCode;
    private String postBillCode;
    private Integer billStatus;
    private Timestamp orderTime;
    private String recMan;
    private String linkTel;
    private String recAddress;
    private String postCode;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderDetailsInfo> stMeOrderDetailsInfosByBillCode;
    private TAuOperInfo stAuOperInfoByOperId;
    private TBaDeliveryInfo stBaDeliveryInfoByDeliveryId;
    private TBaMemberInfo stBaMemberInfoByUserName;
    private TMeOutStockInfo stMeOutStockInfoByOutBillCode;


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
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "PostBillCode")
    public String getPostBillCode() {
        return postBillCode;
    }

    public void setPostBillCode(String postBillCode) {
        this.postBillCode = postBillCode;
    }



    @Basic
    @Column(name = "BillStatus")
    public Integer getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(Integer billStatus) {
        this.billStatus = billStatus;
    }

    @Basic
    @Column(name = "OrderTime")
    public Timestamp getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Timestamp orderTime) {
        this.orderTime = orderTime;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }



    @OneToMany(mappedBy = "orderInfo")
    public Collection<TMeOrderDetailsInfo> getStMeOrderDetailsInfosByBillCode() {
        return stMeOrderDetailsInfosByBillCode;
    }

    public void setStMeOrderDetailsInfosByBillCode(Collection<TMeOrderDetailsInfo> stMeOrderDetailsInfosByBillCode) {
        this.stMeOrderDetailsInfosByBillCode = stMeOrderDetailsInfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getStAuOperInfoByOperId() {
        return stAuOperInfoByOperId;
    }

    public void setStAuOperInfoByOperId(TAuOperInfo stAuOperInfoByOperId) {
        this.stAuOperInfoByOperId = stAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    public TBaDeliveryInfo getStBaDeliveryInfoByDeliveryId() {
        return stBaDeliveryInfoByDeliveryId;
    }

    public void setStBaDeliveryInfoByDeliveryId(TBaDeliveryInfo stBaDeliveryInfoByDeliveryId) {
        this.stBaDeliveryInfoByDeliveryId = stBaDeliveryInfoByDeliveryId;
    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfo getStBaMemberInfoByUserName() {
        return stBaMemberInfoByUserName;
    }

    public void setStBaMemberInfoByUserName(TBaMemberInfo stBaMemberInfoByUserName) {
        this.stBaMemberInfoByUserName = stBaMemberInfoByUserName;
    }

    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfo getStMeOutStockInfoByOutBillCode() {
        return stMeOutStockInfoByOutBillCode;
    }

    public void setStMeOutStockInfoByOutBillCode(TMeOutStockInfo stMeOutStockInfoByOutBillCode) {
        this.stMeOutStockInfoByOutBillCode = stMeOutStockInfoByOutBillCode;
    }
}
