package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/21.
 */
@Entity
@Table(name = "menu_data")
public class MenuData {
    private int menuId;
    private String menuDataId;
    private String menuDataImg;
    private String menuDataUrl;
    private String menuDataHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_data_id")
    public String getMenuDataId() {
        return menuDataId;
    }

    public void setMenuDataId(String menuDataId) {
        this.menuDataId = menuDataId;
    }

    @Basic
    @Column(name = "menu_data_img")
    public String getMenuDataImg() {
        return menuDataImg;
    }

    public void setMenuDataImg(String menuDataImg) {
        this.menuDataImg = menuDataImg;
    }

    @Basic
    @Column(name = "menu_data_url")
    public String getMenuDataUrl() {
        return menuDataUrl;
    }

    public void setMenuDataUrl(String menuDataUrl) {
        this.menuDataUrl = menuDataUrl;
    }

    @Basic
    @Column(name = "menu_data_hover")
    public String getMenuDataHover() {
        return menuDataHover;
    }

    public void setMenuDataHover(String menuDataHover) {
        this.menuDataHover = menuDataHover;
    }


}
