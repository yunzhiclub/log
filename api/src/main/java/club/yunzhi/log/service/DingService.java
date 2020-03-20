package club.yunzhi.log.service;

/**
 * @author LYX
 * 钉钉推送
 */
public interface DingService {
    String encode() throws Exception;
    void dingRequest(String message);
}
