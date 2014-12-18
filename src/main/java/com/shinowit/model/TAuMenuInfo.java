package com.shinowit.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TAu_MenuInfo")
public class TAuMenuInfo {
    private Integer id;
    private String menuId;
    private String menuName;
    private String url;
    private String imgurl;
    private String imgid;
    private String imgHoverUrl;

    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @GenericGenerator(name="system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator="system-uuid")
    @Column(name = "MenuID")
    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "MenuName")
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
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
    @Column(name = "imgurl")
    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }

    @Basic
    @Column(name = "imgid")
    public String getImgid() {
        return imgid;
    }

    public void setImgid(String imgid) {
        this.imgid = imgid;
    }

    @Basic
    @Column(name = "img_hover_url")
    public String getImgHoverUrl() {
        return imgHoverUrl;
    }

    public void setImgHoverUrl(String imgHoverUrl) {
        this.imgHoverUrl = imgHoverUrl;
    }

}
