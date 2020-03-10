package club.yunzhi.log.service;

public interface YunzhiService <T>{
    T getOneUnsavedEntity();
    T getOneSavedEntity();
}
