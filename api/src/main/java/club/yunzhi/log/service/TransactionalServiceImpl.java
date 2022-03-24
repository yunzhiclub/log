package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;

@Service
public class TransactionalServiceImpl implements TransactionalService {
  @Autowired
  private ClientRepository clientRepository;

  private final Logger logger = LoggerFactory.getLogger(TransactionalServiceImpl.class);

  @Override
  @Transactional(rollbackFor = Exception.class)
  public Client setClientLastSendTimeWithPessimisticLock(Long clientId) {
    // 查询时加上悲观锁
    // 本事务结束前，其他线程不能修改，需要等待
    Client client = clientRepository.findClientByIdWithPessimisticLock(clientId).get();
    client.setLastSendTime(new Timestamp(System.currentTimeMillis()));
    return clientRepository.save(client);
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public Client setClientStateAndRemindWithPessimisticLock(Long clientId, Boolean state, Boolean remind) {
    // 查询时加上悲观锁
    // 本事务结束前，其他线程不能修改，需要等待
    Client client = clientRepository.findClientByIdWithPessimisticLock(clientId).get();
    client.setRemind(remind);
    client.setState(state);
    return clientRepository.save(client);
  }


}
