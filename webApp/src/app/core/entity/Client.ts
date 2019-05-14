export class Client {
    id: number;
    name: String;           // 名称
    token: String ;         // token
    url = 'http://';    // 访问地址
    lastSendTime: Date;     // 最后一次发送日志的时间
    lastStartTime: Date;    // 最近一次系统启动时间
    deployDate: Date;       // 项目上线时间
    infoCount: number;      // info 信息数
    warnCount: number;      // 警告信息数
    errorCount: number;     // 错误信息数
}
