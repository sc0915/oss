package com.shinowit.model;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfo {
    private Integer id;
    private String outBillCode;
    private Timestamp outTime;
    private String handler;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private List<TMeOrderInfo> orderInfo;
    private List<TMeOutStockDetailsInfo> outStockDetailsInfos;
    private TAuOperInfo operUser;


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
    @Column(name = "OutBillCode")
    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }

    @Basic
    @Column(name = "OutTime")
    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public Timestamp getOutTime() {
        return outTime;
    }

    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandler() {
        return handler;
    }

    public void setHandler(String handler) {
        this.handler = handler;
    }

    @Basic
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
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


    @OneToMany(mappedBy = "stMeOutStockInfoByOutBillCode")
    public List<TMeOrderInfo> getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(List<TMeOrderInfo> orderInfo) {
        this.orderInfo = orderInfo;
    }

    @OneToMany(mappedBy = "outStockInfo")
    public List<TMeOutStockDetailsInfo> getOutStockDetailsInfos() {
        return outStockDetailsInfos;
    }

    public void setOutStockDetailsInfos(List<TMeOutStockDetailsInfo> outStockDetailsInfos) {
        this.outStockDetailsInfos = outStockDetailsInfos;
    }

    @ManyToOne
    @JoinColumn(name = "operID", referencedColumnName = "operID")
    public TAuOperInfo getOperUser() {
        return operUser;
    }

    public void setOperUser(TAuOperInfo operUser) {
        this.operUser = operUser;
    }

}
