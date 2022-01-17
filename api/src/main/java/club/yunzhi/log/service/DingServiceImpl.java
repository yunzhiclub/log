package club.yunzhi.log.service;


import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.task.ApplicationContextUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;


import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.List;

@Service("DingServiceImpl")
public class DingServiceImpl implements DingService {

    //请求地址以及access_token
//    private static String webHook = "https://oapi.dingtalk.com/robot/send?access_token=8081de0fdfcda55f8d70c168d03e73728ef36abea63c3c10048cbd054913cfeb";

    @Override
    public String encode() throws Exception {
        Ding ding = getDing();
        String webHook = ding.getWebHook();
        String secret = ding.getSecret();

        //获取时间戳
        Long timestamp = System.currentTimeMillis();
        //把时间戳和密钥拼接成字符串，中间加入一个换行符
        String stringToSign = timestamp + "\n" + secret;
        //声明一个Mac对象，用来操作字符串
        Mac mac = Mac.getInstance("HmacSHA256");
        //初始化，设置Mac对象操作的字符串是UTF-8类型，加密方式是SHA256
        mac.init(new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256"));
        //把字符串转化成字节形式
        byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
        //新建一个Base64编码对象
        Base64.Encoder encoder = Base64.getEncoder();
        //把上面的字符串进行Base64加密后再进行URL编码
        String sign = URLEncoder.encode(new String(encoder.encodeToString(signData)),"UTF-8");
        System.out.println(timestamp);
        System.out.println(sign);
        String result = "&timestamp=" + timestamp + "&sign=" + sign;
        return result;
    };

    /* param: message 要发送的信息
    ** return: void 无返回值
    ** 作用：把传入的message发送给钉钉机器人
     */
    @Override
    public void dingRequest(String message){
        Ding ding = getDing();
        String webHook = ding.getWebHook();
        String secret = ding.getSecret();
        System.out.println(secret);
        System.out.println(webHook);
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        String url = null;
        try {
            url = webHook + this.encode();
        } catch (Exception e) {
            e.printStackTrace();
        }
        HttpPost httpPost = new HttpPost(url);
        //设置http的请求头，发送json字符串，编码UTF-8
        httpPost.setHeader("Content-Type", "application/json;charset=utf8");
        //生成json对象传入字符
        JSONObject result = new JSONObject();
        JSONObject text = new JSONObject();
        text.put("content", message);
        result.put("text", text);
        result.put("msgtype", "text");
        String jsonString = JSON.toJSONString(result);
        StringEntity entity = new StringEntity(jsonString, "UTF-8");
        //设置http请求的内容
        httpPost.setEntity(entity);
        // 响应模型
        CloseableHttpResponse response = null;
        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);
            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();

            System.out.println("响应状态为:" + response.getStatusLine());
            if (responseEntity != null) {
                System.out.println("响应内容长度为:" + responseEntity.getContentLength());
                System.out.println("响应内容为:" + EntityUtils.toString(responseEntity));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

    @Override
    public Ding setDing (Ding ding) {
        DingRepository dingRepository= (DingRepository) ApplicationContextUtil.getBean("DingRepository");

        List<Ding> dings = (List<Ding>) dingRepository.findAll();

        if (dings.size() != 0) {
            Ding ding1 = dings.get(0);
            ding1.setWebHook(ding.getWebHook());
            ding1.setSecret(ding.getSecret());
            return dingRepository.save(ding1);
        } else {
            Ding ding1 = new Ding();
            ding1.setWebHook(ding.getWebHook());
            ding1.setSecret(ding.getSecret());
            return dingRepository.save(ding1);
        }
    }

    @Override
    public Ding getDing () {
        DingRepository dingRepository= (DingRepository) ApplicationContextUtil.getBean("DingRepository");

        List<Ding> dings = (List<Ding>) dingRepository.findAll();
        if (dings.size() == 0) {
            return new Ding();
        } else {
            return dings.get(0);
        }
    }
}
