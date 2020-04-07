package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.service.DingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("setting")
public class SettingController {
    private final static Logger logger = LoggerFactory.getLogger(SettingController.class);
    @Autowired
    DingService dingService;

    @GetMapping("ding")
    public Ding getDing() {
        return dingService.getDing();
    }

    @PostMapping()
    public void updateDing(@RequestBody Ding ding) {
        dingService.setDing(ding);
    }

}
