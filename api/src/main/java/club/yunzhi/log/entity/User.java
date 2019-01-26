package club.yunzhi.log.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;

/**
 * @author panjie
 * 用户
 */
@Entity
public class User implements Serializable {
    private static final long serialVersionUID = 6903403699983360575L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name = "";
    private final String password = "";

    @Transient
    private String token = "";

    private String email = "";

    @Transient
    private Calendar time = Calendar.getInstance();


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

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
}
