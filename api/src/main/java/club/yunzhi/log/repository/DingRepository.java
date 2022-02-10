package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 钉钉
 */
@Repository("DingRepository")
public interface DingRepository extends JpaRepository<Ding , Long>, JpaSpecificationExecutor {

  @Modifying
  @Transactional
  void deleteAllByClient(Client client);

  List<Ding> findAllByClientIdAndConnectionStatus(Number clientId,Boolean status);
}
