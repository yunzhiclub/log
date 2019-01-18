package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Log;
import club.yunzhi.log.entity.Client;
import club.yunzhi.log.service.LogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author panjie
 */
@RestController
@RequestMapping("log")
@Api(value = "LogController 日志控制")
public class LogController {

    private final LogService logService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping
    public void save(@RequestBody Log log, @ApiParam("此参数由asp进行注入") Client client) {
        logService.save(log, client);
    }
}
