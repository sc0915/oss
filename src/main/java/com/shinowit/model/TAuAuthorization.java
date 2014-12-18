package com.shinowit.model;

import javax.persistence.*;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorization {
    private Integer id;
    private Boolean isEnabled;
    private TAuPower power;
    private TAuRoleInfo roleInfo;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    @Basic
    @Column(name = "IsEnabled")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }



    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuPower getPower() {
        return power;
    }

    public void setPower(TAuPower power) {
        this.power = power;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfo getRoleInfo() {
        return roleInfo;
    }

    public void setRoleInfo(TAuRoleInfo roleInfo) {
        this.roleInfo = roleInfo;
    }

}
