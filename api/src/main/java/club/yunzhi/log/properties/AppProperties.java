package club.yunzhi.log.properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 获取application.yml中对应的配置信息
 *
 * @author panjie
 */
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
  private static final Logger logger = LoggerFactory.getLogger(AppProperties.class);

  private String username = "13920618851";

  private String password = "yunzhi";

  private Integer timeout;

  private String prefix;

  private String token = "yunzhi.club";

  /**
   * 短信.
   */
  private Map<String, String> sms;

  public void setSms(Map<String, String> sms) {
    this.sms = sms;
  }

  public Map<String, String> getSms() {
    return this.sms;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Integer getTimeout() {
    return this.timeout;
  }

  public void setTimeout(Integer timeout) {
    this.timeout = timeout;
  }

  public String getPrefix() {
    return this.prefix;
  }

  public void setPrefix(String prefix) {
    this.prefix = prefix;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}


