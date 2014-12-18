package com.shinowit.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfo {
    private Integer id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private List<TAuAuthorization> authorizationList;
    private List<TAuOperInfo> operInfoList;

    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",insertable = false,updatable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }


    @OneToMany(mappedBy = "roleInfo")
    public List<TAuAuthorization> getAuthorizationList() {
        return authorizationList;
    }

    public void setAuthorizationList(List<TAuAuthorization> authorizationList) {
        this.authorizationList = authorizationList;
    }

    @OneToMany(mappedBy = "roleInfo")
    public List<TAuOperInfo> getOperInfoList() {
        return operInfoList;
    }

    public void setOperInfoList(List<TAuOperInfo> operInfoList) {
        this.operInfoList = operInfoList;
    }






}
