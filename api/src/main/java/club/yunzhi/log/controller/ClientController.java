package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
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

/**
 * @author panjie
 */
@RestController
@RequestMapping("client")
@Api(value = "ClientController 客户端")
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(final ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public Client save(@RequestBody final Client client) {
        return this.clientService.save(client);
    }

    @GetMapping("page")
    @JsonView(page.class)
    public Page<Client> page(final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return new PageImpl(this.clientService.page(pageable));
    }

    private interface page extends Client.base, Client.todayLog, PageImpl.base{}
}
