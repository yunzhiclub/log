package club.yunzhi.log.task;

public interface DayLogTask {
    /**
     * 每晚实例化一个今日日志给客户端
     */
    void generateTodayDayLog();
}
