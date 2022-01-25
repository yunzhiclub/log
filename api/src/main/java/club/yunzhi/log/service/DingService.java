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

  static String encodeWebhookOrSecret(String webhook) {
    if (webhook.length() > 4) {
      String first = webhook.substring(0, 4);
      String result = first + "*****";
      return result;
    } else {
      return webhook;
    }
  }

  Ding findById(Long id);

  void deleteById(Long id);
}
