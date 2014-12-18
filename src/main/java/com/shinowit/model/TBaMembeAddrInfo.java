package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TBa_MembeAddrInfo")
public class TBaMembeAddrInfo {
    private int id;
    private String recMan;
    private String tel;
    private String recAddress;
    private String postCode;
    private Boolean isDefault;
    private TBaMemberInfo memberInfo;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
    @Column(name = "Tel")
    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
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
    @Column(name = "IsDefault")
    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }


    @ManyToOne
    @JoinColumn(name = "userName", referencedColumnName = "userName")
    public TBaMemberInfo getMemberInfo() {
        return memberInfo;
    }

    public void setMemberInfo(TBaMemberInfo memberInfo) {
        this.memberInfo = memberInfo;
    }
}
