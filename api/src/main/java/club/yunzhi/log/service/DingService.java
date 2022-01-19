package club.yunzhi.log.service;

import club.yunzhi.log.entity.Ding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author LYX
 * 钉钉推送
 */
public interface DingService {
  String encode(String secret) throws Exception;

  void dingRequest(Ding ding, String message);

  Ding save(Ding ding);

  List<Ding> getAllStartDing();

  Page<Ding> findAll(String name, Boolean connectStatus, Long clientId, Pageable pageable);

  Ding update(Long id, Ding ding);
}
