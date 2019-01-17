package com.mengyunzhi.app.log.entity;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

/**
 * @author panjie
 * 项目
 */
@Entity
@ApiModel(value = "Project", description = "项目")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    private String name;

    private String url;

    private Time lastSendTime;

    private Time lastStartTime;

    private Date deployDate;

    private Long infoCount;

    private Long warnCount;

    private Long errorCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Time getLastSendTime() {
        return lastSendTime;
    }

    public void setLastSendTime(Time lastSendTime) {
        this.lastSendTime = lastSendTime;
    }

    public Time getLastStartTime() {
        return lastStartTime;
    }

    public void setLastStartTime(Time lastStartTime) {
        this.lastStartTime = lastStartTime;
    }

    public Date getDeployDate() {
        return deployDate;
    }

    public void setDeployDate(Date deployDate) {
        this.deployDate = deployDate;
    }

    public Long getInfoCount() {
        return infoCount;
    }

    public void setInfoCount(Long infoCount) {
        this.infoCount = infoCount;
    }

    public Long getWarnCount() {
        return warnCount;
    }

    public void setWarnCount(Long warnCount) {
        this.warnCount = warnCount;
    }

    public Long getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Long errorCount) {
        this.errorCount = errorCount;
    }
}
