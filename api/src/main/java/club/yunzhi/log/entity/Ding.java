package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 钉钉
 * @author hzl
 */
@Entity
public class Ding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(base.class)
    private Long id;

    private String webHook = "";

    private String secret = "";

    /**
     * 连接状态，默认为正常
     */
    private Short status = 0;

    private Client client;

    public Long getId() {
        return id;
    }

    public String getWebHook() {
        return webHook;
    }

    public void setWebHook(String webHook) {
        this.webHook = webHook;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public interface base {}
}
