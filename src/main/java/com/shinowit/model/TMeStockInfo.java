package com.shinowit.model;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TMe_StockInfo")
public class TMeStockInfo {
    private Integer id;
    private BigDecimal avgPrice;
    private Integer num;
    private TMeMerchandiseInfo merchandiseInfo;


    @Id
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "AvgPrice")
    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }


    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
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
