package com.shinowit.model;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfo {
    private Integer id;
    private String billCode;
    private Byte inType;
    private Timestamp inTime;
    private String handler;
    private BigDecimal totalMoney;
    private String remark;
    private List<TMeInStockDetailsInfo> detaInfo;
    private TAuOperInfo operUser;
    private TBaSupplierInfo supplierInfo;


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
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public Timestamp getInTime() {
        return inTime;
    }

    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
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


    @OneToMany(mappedBy = "inStockInfo")
    public List<TMeInStockDetailsInfo> getDetaInfo() {
        return detaInfo;
    }

    public void setDetaInfo(List<TMeInStockDetailsInfo> detaInfo) {
        this.detaInfo = detaInfo;
    }


    @ManyToOne
    @JoinColumn(name = "operID", referencedColumnName = "operID")
    public TAuOperInfo getOperUser() {
        return operUser;
    }

    public void setOperUser(TAuOperInfo operUser) {
        this.operUser = operUser;
    }

    @ManyToOne
    @JoinColumn(name = "supplierID", referencedColumnName = "supplierID")
    public TBaSupplierInfo getSupplierInfo() {
        return supplierInfo;
    }

    public void setSupplierInfo(TBaSupplierInfo supplierInfo) {
        this.supplierInfo = supplierInfo;
    }
//
//    @Transient
//    public String getInStockTime(){
//        java.text.SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String result=null;
//        if (null!=this.getInTime()){
//            Date d=new Date(this.inTime.getTime());
//            result=sdf.format(d);
//        }
//        return result;
//    }
}
