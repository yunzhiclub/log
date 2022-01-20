package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.annotations.ApiModelProperty;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.hibernate.annotations.NotFound;

import javax.persistence.*;

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

    @JsonView(base.class)
    private String webHook = "";

    @JsonView(base.class)
    private String secret = "";

    private String name;

    /**
     * 连接状态，默认为正常
     */
    @JsonView(base.class)
    private Boolean connectionStatus = true;

    @ApiModelProperty("客户端")
    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonView(ClientJsonView.class)
    private Client client;

    /**
     * 启用状态，默认为启用
     */
    @JsonView(base.class)
    private Boolean start = true;

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

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Boolean getConnectionStatus() {
        return connectionStatus;
    }

    public void setConnectionStatus(Boolean connectionStatus) {
        this.connectionStatus = connectionStatus;
    }

    public Boolean getStart() {
        return start;
    }

    public void setStart(Boolean start) {
        this.start = start;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public interface base {}
    public interface ClientJsonView {}
}
