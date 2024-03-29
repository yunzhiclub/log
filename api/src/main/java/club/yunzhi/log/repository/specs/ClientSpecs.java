package club.yunzhi.log.repository.specs;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import org.springframework.data.jpa.domain.Specification;

/**
 * 客户端查询条件
 * @author haozelong
 */
public class ClientSpecs {
  public static Specification<Client> containingName(String name) {
    if (name != null) {
      return (Specification<Client>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
    } else {
      return Specification.where(null);
    }
  }

  public static Specification<Client> isStart(Boolean startStatus) {
    if (startStatus == null) {
      return Specification.where(null);
    }
    return (Specification<Client>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("start").as(Boolean.class),  startStatus);
  }
}
