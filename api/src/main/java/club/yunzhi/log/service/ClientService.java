package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

/**
 * @author panjie
 * 客户端
 */
public interface ClientService {
  Client getOneSavedClient();

  Client getOneUnsavedClient();

  List<Client> getAllStartClient();

  Page<Client> page(String name, Pageable pageable);

  /**
   * 新增客户端
   *
   * @param client
   * @return
   */
  Client save(Client client);

  void update(List<Log> logs);

  /**
   * 更新一个客户端
   *
   * @param id
   * @param client
   */
  Client update(Long id, Client client);

  /**
   * 根据ID获取客户端
   *
   * @param id
   * @return
   */
  Client findById(Long id);

  /**
   * 删除一个客户端
   *
   * @param id
   */
  void deleteById(Long id);

  /**
   * 停用或启用客户端
   * @param id
   */
  void startOrEnd(Long id);

  boolean existByToken(String token);

  static String encodeToken(String token) {
    if (token.length() > 3) {
      String first = token.substring(0, 3);
      String result = first + "***";
      return result;
    } else {
      return token;
    }
  }

  void clean(Long clientId, Timestamp timestamp);
}
