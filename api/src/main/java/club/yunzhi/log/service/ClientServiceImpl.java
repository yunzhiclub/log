package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.enums.LogLevelEnum;
import club.yunzhi.log.repository.ClientRepository;
import com.mengyunzhi.core.service.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.Calendar;
import java.util.List;

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
    @Transactional(propagation = Propagation.REQUIRES_NEW)
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

    @Override
    @Async
    public void update(List<Log> logs) {
        if (logs.size() > 0) {
            int infoCount = 0;
            int warnCount = 0;
            int errorCount = 0;
            for (Log log: logs) {
                if (log.getLevelCode().equals(LogLevelEnum.INFO.getValue())) {
                    infoCount++;
                } else if (log.getLevelCode().equals(LogLevelEnum.WARN.getValue())) {
                    warnCount++;
                } else if (log.getLevelCode().equals(LogLevelEnum.ERROR.getValue())) {
                   errorCount++;
                }
            }

            Client client1 = clientRepository.findById(logs.get(0).getClient().getId()).get();
            client1.setLastSendTime(new Time(Calendar.getInstance().getTimeInMillis()));
            client1.getTodayLog().addErrorCount(errorCount);
            client1.getTodayLog().addWarnCount(warnCount);
            client1.getTodayLog().addInfoCount(infoCount);
            clientRepository.save(client1);
        }
    }
}
