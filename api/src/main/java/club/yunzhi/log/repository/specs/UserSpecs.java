package club.yunzhi.log.repository.specs;


import club.yunzhi.log.entity.User;
import org.springframework.data.jpa.domain.Specification;

/**
 * @author xiaoqiang
 */
public class UserSpecs {
    public static Specification<User> containingName(String username) {
        if (username != null) {
            return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("username").as(String.class), String.format("%%%s%%", username));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<User> containingEmail(String email) {
        if (email != null) {
            return (Specification<User>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("email").as(String.class), String.format("%%%s%%", email));
        } else {
            return Specification.where(null);
        }
    }

}
