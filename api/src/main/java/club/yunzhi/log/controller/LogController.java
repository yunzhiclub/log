package club.yunzhi.log.controller;

import club.yunzhi.log.config.WebConfig;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.entity.Client;
import club.yunzhi.log.service.LogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
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
     * 批量保存
     *
     * @param logs   日志
     */
    @PostMapping("batchSave")
    public void batchSave(@RequestBody List<Log> logs) {
        logService.save(logs);
    }

    @GetMapping("page")
    public Page<Log> page(@PathVariable(required = false) Long clientId,
                          @PageableDefault(sort = "id", direction = Sort.Direction.DESC, size = 20) Pageable pageable) {
        return logService.page(clientId, pageable);
    }
}
