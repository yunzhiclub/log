package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.service.ClientService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Client> page(final Pageable pageable) {
        return this.clientService.page(pageable);
    }
}
