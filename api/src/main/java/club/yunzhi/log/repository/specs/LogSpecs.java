package club.yunzhi.log.repository.specs;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import org.springframework.data.jpa.domain.Specification;

public class LogSpecs {
    public static Specification<Log> belongToClient(Client client) {
        if (null == client || null == client.getId()) {
            return Specification.where(null);
        }
        return (Specification<Log>) (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("client").get("id").as(Long.class), client.getId());
    }

    public static Specification<Log> containingMessage(String message) {
        if (message == null || message.equals("null") || message.equals("")) {
            return Specification.where(null);
        } else {
            return (Specification<Log>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("message").as(String.class), String.format("%%%s%%", message));
        }
    }

    public static Specification<Log> isLevel(Byte level) {
        if (level == null) {
            return Specification.where(null);
        }
        return (Specification<Log>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("levelCode").as(Byte.class),  level);
    }
}
