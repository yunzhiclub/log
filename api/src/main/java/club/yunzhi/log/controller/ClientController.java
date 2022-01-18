package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.service.ClientService;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import club.yunzhi.log.utils.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author panjie
 */
@RestController
@RequestMapping("client")
@Api(value = "ClientController 客户端")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @Autowired
  ClientRepository clientRepository;

  @Autowired
  public ClientController(final ClientService clientService) {
    this.clientService = clientService;
  }

  @PostMapping
  public void save(@RequestBody final Client client) {
    this.clientService.save(client);

  }

  @GetMapping("page")
  @JsonView(page.class)
  public Page<Client> page(
      @RequestParam(required = false) String name,
      final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    Page<Client> clients = new PageImpl(this.clientService.page(name, pageable));
    return clients;
  }

  @GetMapping("getAll")
  @JsonView(getAll.class)
  public List<Client> getAll() {
    List<Client> clients = (List<Client>) this.clientRepository.findAll();
    return clients;
  }

  @GetMapping("existByToken")
  public boolean existByToken(@RequestParam String token) {
    return this.clientService.existByToken(token);
  }

  /**
   * 根据ID获取客户端
   *
   * @param id
   * @return
   */
  @GetMapping("{id}")
  @JsonView(get.class)
  public Client getById(@PathVariable Long id) {
    return clientService.findById(id);
  }

  /**
   * 更新客户端
   *
   * @param id
   * @param client
   * @return
   */
  @PutMapping("{id}")
  @JsonView(update.class)
  public Client updateById(@PathVariable Long id, @RequestBody Client client) {
    return clientService.update(id, client);
  }

  /**
   * 删除客户端
   *
   * @param id
   */
  @DeleteMapping("{id}")
  public void deleteById(@PathVariable Long id) {
    clientService.deleteById(id);
  }

  private interface page extends Client.base, Client.todayLog, PageImpl.base {
  }

  ;

  private interface getAll extends Client.base {
  }

  ;

  private interface get extends Client.base, Client.todayLog, PageImpl.base {
  }

  private interface update extends Client.base, Client.todayLog, PageImpl.base {
  }
}
