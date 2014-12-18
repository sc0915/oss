package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/25.
 */
@Entity
@Table(name = "menu_store")
public class MenuStore {
    private int menuId;
    private String menuStoreId;
    private String menuStoreImg;
    private String menuStoreUrl;
    private String menuStoreHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_store_id")
    public String getMenuStoreId() {
        return menuStoreId;
    }

    public void setMenuStoreId(String menuStoreId) {
        this.menuStoreId = menuStoreId;
    }

    @Basic
    @Column(name = "menu_store_img")
    public String getMenuStoreImg() {
        return menuStoreImg;
    }

    public void setMenuStoreImg(String menuStoreImg) {
        this.menuStoreImg = menuStoreImg;
    }

    @Basic
    @Column(name = "menu_store_url")
    public String getMenuStoreUrl() {
        return menuStoreUrl;
    }

    public void setMenuStoreUrl(String menuStoreUrl) {
        this.menuStoreUrl = menuStoreUrl;
    }

    @Basic
    @Column(name = "menu_store_hover")
    public String getMenuStoreHover() {
        return menuStoreHover;
    }

    public void setMenuStoreHover(String menuStoreHover) {
        this.menuStoreHover = menuStoreHover;
    }


}
