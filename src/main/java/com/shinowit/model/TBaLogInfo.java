package com.shinowit.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by SC on 2014/11/14.
 */
@Entity
@Table(name = "TBa_LogInfo")
public class TBaLogInfo {
    private int id;
    private Timestamp logTime;
    private String ip;
    private String content;
    private TAuPower power;
    private TAuOperInfo operUser;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LogTime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    @Basic
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "Content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne
    @JoinColumn(name = "menuID", referencedColumnName = "menuID")
    public TAuPower getPower() {
        return power;
    }

    public void setPower(TAuPower power) {
        this.power = power;
    }

    @ManyToOne
    @JoinColumn(name = "operID", referencedColumnName = "operID")
    public TAuOperInfo getOperUser() {
        return operUser;
    }

    public void setOperUser(TAuOperInfo operUser) {
        this.operUser = operUser;
    }
}
