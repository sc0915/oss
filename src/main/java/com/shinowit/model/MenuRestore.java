package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/25.
 */
@Entity
@Table(name = "menu_restore")
public class MenuRestore {
    private int menuId;
    private String menuRestoreId;
    private String menuResotreImg;
    private String menuRestoreUrl;
    private String menuRestoreHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_restore_id")
    public String getMenuRestoreId() {
        return menuRestoreId;
    }

    public void setMenuRestoreId(String menuRestoreId) {
        this.menuRestoreId = menuRestoreId;
    }

    @Basic
    @Column(name = "menu_resotre_img")
    public String getMenuResotreImg() {
        return menuResotreImg;
    }

    public void setMenuResotreImg(String menuResotreImg) {
        this.menuResotreImg = menuResotreImg;
    }

    @Basic
    @Column(name = "menu_restore_url")
    public String getMenuRestoreUrl() {
        return menuRestoreUrl;
    }

    public void setMenuRestoreUrl(String menuRestoreUrl) {
        this.menuRestoreUrl = menuRestoreUrl;
    }

    @Basic
    @Column(name = "menu_restore_hover")
    public String getMenuRestoreHover() {
        return menuRestoreHover;
    }

    public void setMenuRestoreHover(String menuRestoreHover) {
        this.menuRestoreHover = menuRestoreHover;
    }


}
