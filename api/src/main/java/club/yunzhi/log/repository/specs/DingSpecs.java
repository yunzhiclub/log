package club.yunzhi.log.repository.specs;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import org.springframework.data.jpa.domain.Specification;

/**
 * 钉钉查询
 */
public class DingSpecs {
  public static Specification<Ding> isStart(Boolean startStatus) {
    if (startStatus == null) {
      return Specification.where(null);
    }
    return (Specification<Ding>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("connectionStatus").as(Boolean.class),  startStatus);
  }

  public static Specification<Ding> isConnectStatus(Boolean status) {
    if (status == null) {
      return Specification.where(null);
    }
    return (Specification<Ding>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("connectStatus").as(Boolean.class),  status);
  }

  public static Specification<Ding> isClientId(Long clientId) {
    if (null == clientId) {
      return Specification.where(null);
    }
    return (Specification<Ding>) (root, criteriaQuery, criteriaBuilder) ->
        criteriaBuilder.equal(root.get("client").get("id").as(Long.class), clientId);
  }

  public static Specification<Ding> containingName(String name) {
    if (name != null) {
      return (Specification<Ding>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
    } else {
      return Specification.where(null);
    }
  }
}
