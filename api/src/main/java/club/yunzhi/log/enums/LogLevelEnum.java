package club.yunzhi.log.enums;

/**
 * 日志等级
 */
public enum LogLevelEnum {
    TRACE("TRACE", (byte) 0),
    DEBUG("DEBUG", (byte) 1),
    INFO("INFO", (byte) 2),
    WARN("WARN", (byte) 3),
    ERROR("ERROR", (byte) 4);
    private String description;
    private Byte value;

    LogLevelEnum(String description, Byte code) {
        this.description = description;
        this.value = code;
    }

    public String getDescription() {
        return description;
    }

    public Byte getValue() {
        return value;
    }
}
