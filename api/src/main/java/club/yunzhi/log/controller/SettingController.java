package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.service.DingService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("setting")
public class SettingController {
  private final static Logger logger = LoggerFactory.getLogger(SettingController.class);
  @Autowired
  DingService dingService;

  @Autowired
  DingRepository dingRepository;

  @GetMapping("page")
  @JsonView(GetAllJsonView.class)
  public Page<Ding> getAll(@RequestParam(required = false) String name,
                           @RequestParam(required = false) Boolean connectionStatus,
                           @RequestParam(required = false) Long clientId,
                           final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    Page<Ding> dings = this.dingService.findAll(
        name,
        connectionStatus,
        clientId,
        pageable);
    return dings;
  }

  @GetMapping("getAll")
  @JsonView(getAll.class)
  public List<Ding> getAll() {
    return (List<Ding>) this.dingRepository.findAll();
  }

  /**
   * 根据ID获取客户端
   *
   * @param id
   * @return
   */
  @GetMapping("{id}")
  @JsonView(get.class)
  public Ding getById(@PathVariable Long id) {
    return dingService.findById(id);
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

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable Long id) {
    this.dingService.deleteById(id);
  }

  public class GetAllJsonView implements Ding.base, Ding.ClientJsonView, Client.base {
  }

  public class UpdateJsonView implements Ding.base, Ding.ClientJsonView {
  }

  public class SaveJsonView implements Ding.base, Ding.ClientJsonView {

  }

  public class get implements Ding.base, Ding.ClientJsonView, Client.base {
  }

  private class getAll implements Ding.base, Ding.ClientJsonView, Client.base{
  }
}