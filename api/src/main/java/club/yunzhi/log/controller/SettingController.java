package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.service.DingService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("setting")
public class SettingController {
  private final static Logger logger = LoggerFactory.getLogger(SettingController.class);
  @Autowired
  DingService dingService;

  @GetMapping("page")
  @JsonView(GetAllJsonView.class)
  public Page<Ding> getAll(@RequestParam(required = false) String name,
                           @RequestParam(required = false) Boolean connectStatus,
                           @RequestParam(required = false) Long clientId,
                           Pageable pageable) {
    return this.dingService.findAll(
        name,
        connectStatus,
        clientId,
        pageable);
  }

  @PostMapping()
  @JsonView(SaveJsonView.class)
  public Ding save(@RequestBody Ding ding) {
    return dingService.save(ding);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Ding update(@PathVariable Long id, @RequestBody Ding ding) {
    return this.dingService.update(id, ding);
  }


  public class GetAllJsonView implements Ding.base, Ding.ClientJsonView {
  }

  public class UpdateJsonView implements Ding.base, Ding.ClientJsonView {
  }

  public class SaveJsonView implements Ding.base, Ding.ClientJsonView {
  }
}
