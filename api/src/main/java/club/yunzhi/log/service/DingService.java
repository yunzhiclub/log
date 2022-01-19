package club.yunzhi.log.service;

import club.yunzhi.log.entity.Ding;

/**
 * @author LYX
 * 钉钉推送
 */
public interface DingService {
    String encode(String secret) throws Exception;
    void dingRequest(String message);
    Ding setDing(Ding ding);
    Ding getDing();
}
