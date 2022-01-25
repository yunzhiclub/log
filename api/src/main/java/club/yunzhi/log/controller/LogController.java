package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Log;
import club.yunzhi.log.service.LogService;
import club.yunzhi.log.utils.PageImpl;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author panjie
 */
@RestController
@RequestMapping("log")
@Api(value = "LogController 日志控制")
public class  LogController {
    private final static Logger logger = LoggerFactory.getLogger(LogController.class);
    private final LogService logService;        // 日志服务

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    /**
     * 批量保存
     *
     * @param logs 日志
     */
    @PostMapping("batchSave")
    public void batchSave(@RequestBody List<Log> logs) {
        logService.save(logs);
    }

    @GetMapping("page")
    @JsonView(page.class)
    public Page<Log> page(@RequestParam(required = false) String clientId,
                          @RequestParam(required = false) String message,
                          @RequestParam(required = false) String level,
                          Pageable pageable) {
        logger.info(message+""+level);
        Long _clientId = null;
        if (clientId != null && !clientId.equals("null")) {
            _clientId = Long.parseLong(clientId);
        }
        return new PageImpl(logService.page(_clientId, level, message, pageable));
    }

    private interface page extends PageImpl.base, Log.base, Log.client {
    }
}
