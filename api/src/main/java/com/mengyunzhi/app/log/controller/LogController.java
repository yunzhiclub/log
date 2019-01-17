package com.mengyunzhi.app.log.controller;

import com.mengyunzhi.app.log.entity.Log;
import com.mengyunzhi.app.log.service.LogService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author panjie
 */
@RestController
@RequestMapping("log")
@Api(value = "LogController 日志控制")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping
    public void save(@RequestBody Log log) {
        logService.save(log);
    }
}
