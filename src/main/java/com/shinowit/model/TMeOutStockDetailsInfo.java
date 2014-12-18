package com.shinowit.model;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_OutStockDetailsInfo")
public class TMeOutStockDetailsInfo {
    private Integer id;
    private Integer num;
    private BigDecimal price;
    private BigDecimal stockPrice;
    private TMeMerchandiseInfo merchandiseInfo;
    private TMeOutStockInfo outStockInfo;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    @Basic
    @Column(name = "stock_price")
    public BigDecimal getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
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
    @JoinColumn(name = "outBillCode", referencedColumnName = "outBillCode")
    public TMeOutStockInfo getOutStockInfo() {
        return outStockInfo;
    }

    public void setOutStockInfo(TMeOutStockInfo outStockInfo) {
        this.outStockInfo = outStockInfo;
    }

}
