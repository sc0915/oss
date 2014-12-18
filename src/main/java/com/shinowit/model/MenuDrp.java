package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/25.
 */
@Entity
@Table(name = "menu_drp")
public class MenuDrp {
    private int menuId;
    private String menuDrpId;
    private String menuDrpImg;
    private String menuDrpUrl;
    private String menuDrpHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_drp_id")
    public String getMenuDrpId() {
        return menuDrpId;
    }

    public void setMenuDrpId(String menuDrpId) {
        this.menuDrpId = menuDrpId;
    }

    @Basic
    @Column(name = "menu_drp_img")
    public String getMenuDrpImg() {
        return menuDrpImg;
    }

    public void setMenuDrpImg(String menuDrpImg) {
        this.menuDrpImg = menuDrpImg;
    }

    @Basic
    @Column(name = "menu_drp_url")
    public String getMenuDrpUrl() {
        return menuDrpUrl;
    }

    public void setMenuDrpUrl(String menuDrpUrl) {
        this.menuDrpUrl = menuDrpUrl;
    }

    @Basic
    @Column(name = "menu_drp_hover")
    public String getMenuDrpHover() {
        return menuDrpHover;
    }

    public void setMenuDrpHover(String menuDrpHover) {
        this.menuDrpHover = menuDrpHover;
    }


}
