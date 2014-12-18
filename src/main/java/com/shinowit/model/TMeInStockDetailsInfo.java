package com.shinowit.model;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfo {
    private Integer id;
    private Integer num;
    private BigDecimal price;
    private TMeInStockInfo inStockInfo;
    private TMeMerchandiseInfo merchandiseInfo;

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


    @ManyToOne
    @JoinColumn(name = "billCode", referencedColumnName = "billCode")
    public TMeInStockInfo getInStockInfo() {
        return inStockInfo;
    }

    public void setInStockInfo(TMeInStockInfo inStockInfo) {
        this.inStockInfo = inStockInfo;
    }


    @ManyToOne
    @JoinColumn(name = "merchandiseID", referencedColumnName = "merchandiseID")
    public TMeMerchandiseInfo getMerchandiseInfo() {
        return merchandiseInfo;
    }

    public void setMerchandiseInfo(TMeMerchandiseInfo merchandiseInfo) {
        this.merchandiseInfo = merchandiseInfo;
    }

}
