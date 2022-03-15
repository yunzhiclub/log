package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;

/**
 * 由于同类中调用事务注解的方法会造成事务注解失效
 * 于是把事务方法提到一个该类中
 * 由外部调用该事务方法
 */
public interface TransactionalService {
  /**
   * 设置客户端的lastSendTime
   * 操作时加上悲观锁
   * @param clientId 客户端id
   * @return
   */
  Client setClientLastSendTimeWithPessimisticLock(Long clientId);

  /**
   * 设置客户端的已提醒字段和在线情况
   * 操作时加上悲观锁
   * @param clientId 客户端id
   * @param state 在线状态
   * @param remind 是否已提醒离线
   */
  Client setClientStateAndRemindWithPessimisticLock(Long clientId, Boolean state, Boolean remind);
}
