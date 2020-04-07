package club.yunzhi.log.service;

import club.yunzhi.log.entity.Ding;

/**
 * @author LYX
 * 钉钉推送
 */
public interface DingService {
    //请求地址以及access_token
    static String webHook = "";
    //密钥
    static String secret = "";
    String encode() throws Exception;
    void dingRequest(String message);
    void setDing(Ding ding);
    Ding getDing();
}
