package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/25.
 */
@Entity
@Table(name = "menu_system")
public class MenuSystem {
    private int menuId;
    private String menuSystemId;
    private String menuSystemImg;
    private String menuSystemUrl;
    private String menuSystemHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_system_id")
    public String getMenuSystemId() {
        return menuSystemId;
    }

    public void setMenuSystemId(String menuSystemId) {
        this.menuSystemId = menuSystemId;
    }

    @Basic
    @Column(name = "menu_system_img")
    public String getMenuSystemImg() {
        return menuSystemImg;
    }

    public void setMenuSystemImg(String menuSystemImg) {
        this.menuSystemImg = menuSystemImg;
    }

    @Basic
    @Column(name = "menu_system_url")
    public String getMenuSystemUrl() {
        return menuSystemUrl;
    }

    public void setMenuSystemUrl(String menuSystemUrl) {
        this.menuSystemUrl = menuSystemUrl;
    }

    @Basic
    @Column(name = "menu_system_hover")
    public String getMenuSystemHover() {
        return menuSystemHover;
    }

    public void setMenuSystemHover(String menuSystemHover) {
        this.menuSystemHover = menuSystemHover;
    }


}
