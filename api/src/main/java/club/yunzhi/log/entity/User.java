package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.annotations.ApiModelProperty;
import net.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;

/**
 * @author panjie
 * 用户
 */
@Entity
public class User implements Serializable {
    /**
     * 密码加密
     */
    private static PasswordEncoder passwordEncoder;

    private static final long serialVersionUID = 6903403699983360575L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name = "";

    @Column(nullable = false, unique = true)
    private String username;

    private  String password = "yunzhi";

    @Transient
    private String token = "";

    private String email = "";

    @ApiModelProperty("钉钉")
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonView(DingJsonView.class)
    private Ding ding;

    @Transient
    private Calendar time = Calendar.getInstance();

    public static PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    public static void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        User.passwordEncoder = passwordEncoder;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public Calendar getTime() {
        return this.time;
    }

    public void setTime(final Calendar time) {
        this.time = time;
    }

    public String getPassword() {
        return this.password;
    }

    public interface DingJsonView {
    }

    public void setPassword(String password){
        if (User.passwordEncoder == null) {
            throw new RuntimeException("未设置User实体的passwordEncoder，请调用set方法设置");
        }
        this.password = User.passwordEncoder.encode(password);
    }

    public void setDing(Ding ding) {
        this.ding = ding;
    }

    public Ding getDing() {
        return ding;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}
