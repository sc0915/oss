package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/25.
 */
@Entity
@Table(name = "menu_sell")
public class MenuSell {
    private int menuId;
    private String menuSellId;
    private String menuSellImg;
    private String menuSellUrl;
    private String menuSellHover;

    @Id
    @Column(name = "menu_id")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "menu_sell_id")
    public String getMenuSellId() {
        return menuSellId;
    }

    public void setMenuSellId(String menuSellId) {
        this.menuSellId = menuSellId;
    }

    @Basic
    @Column(name = "menu_sell_img")
    public String getMenuSellImg() {
        return menuSellImg;
    }

    public void setMenuSellImg(String menuSellImg) {
        this.menuSellImg = menuSellImg;
    }

    @Basic
    @Column(name = "menu_sell_url")
    public String getMenuSellUrl() {
        return menuSellUrl;
    }

    public void setMenuSellUrl(String menuSellUrl) {
        this.menuSellUrl = menuSellUrl;
    }

    @Basic
    @Column(name = "menu_sell_hover")
    public String getMenuSellHover() {
        return menuSellHover;
    }

    public void setMenuSellHover(String menuSellHover) {
        this.menuSellHover = menuSellHover;
    }


}
