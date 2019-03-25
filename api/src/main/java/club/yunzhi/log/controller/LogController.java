package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Log;
import club.yunzhi.log.entity.Client;
import club.yunzhi.log.service.LogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author panjie
 */
@RestController
@RequestMapping("log")
@Api(value = "LogController 日志控制")
public class LogController {

    private final LogService logService;        // 日志服务

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    /**
     * 保存
     *
     * @param log    日志
     * @param client 客户端
     */
    @PostMapping
    public void save(@RequestBody Log log, @ApiParam("此参数由asp进行注入") Client client) {
        logService.save(log, client);
    }

    /**
     * 批量保存
     *
     * @param logs   日志
     * @param client 客户端
     */
    @PostMapping("batchSave")
    public void batchSave(@RequestBody List<Log> logs, @ApiParam("此参数由asp进行注入") Client client) {
        logService.save(logs, client);
    }
}
