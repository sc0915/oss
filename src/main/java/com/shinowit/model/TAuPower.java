package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/12/1.
 */
@Entity
@Table(name = "TAu_Power")
public class TAuPower {
    private Integer id;
    private String menuId;
    private String text;
    private String url;
    private String sortId;
    private boolean leaf;
    private String urlId;

    @Basic
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    @Id
    @Column(name = "MenuID")
    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "MenuName")
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


    @Basic
    @Column(name = "URL")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    @Basic
    @Column(name = "SortID")
    public String getSortId() {
        return sortId;
    }

    public void setSortId(String sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }


    @Basic
    @Column(name = "url_id")
    public String getUrlId() {
        return urlId;
    }

    public void setUrlId(String urlId) {
        this.urlId = urlId;
    }
}
