package com.shinowit.model;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OrderDetailsInfo")
public class TMeOrderDetailsInfo {
    private int id;
    private Integer num;
    private BigDecimal price;
    private TMeMerchandiseInfo merchandiseInfo;
    private TMeOrderInfo orderInfo;
    private TMeUnitInfo unitInfo;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }


    @ManyToOne
    @JoinColumn(name = "merchandiseID", referencedColumnName = "merchandiseID")
    public TMeMerchandiseInfo getMerchandiseInfo() {
        return merchandiseInfo;
    }

    public void setMerchandiseInfo(TMeMerchandiseInfo merchandiseInfo) {
        this.merchandiseInfo = merchandiseInfo;
    }

    @ManyToOne
    @JoinColumn(name = "billCode", referencedColumnName = "billCode")
    public TMeOrderInfo getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(TMeOrderInfo orderInfo) {
        this.orderInfo = orderInfo;
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
