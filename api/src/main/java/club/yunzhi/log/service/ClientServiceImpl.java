package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import com.mengyunzhi.core.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author panjie
 */
@Service
public class ClientServiceImpl implements ClientService {
    private final
    ClientRepository clientRepository;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public Client getOneSavedClient() {
        return clientRepository.save(this.getOneUnsavedClient());
    }

    @Override
    public Client getOneUnsavedClient() {
        Client client = new Client();
        client.setName("test");
        client.setToken(CommonService.getRandomStringByLength(40));
        return client;
    }

    public Page<Client> page(Pageable pageable) {
        return  clientRepository.findAll(pageable);
    }
    public Client save(Client client) {
        return clientRepository.save(client);
    }
}
