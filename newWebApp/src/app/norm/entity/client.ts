import {DayLog} from './day-log';

export class Client {
    id: number;
    name: string;           // 名称
    token: string ;         // token
    url = 'http://';        // 访问地址
    lastSendTime: Date;     // 最后一次发送日志的时间
    lastStartTime: Date;    // 最近一次系统启动时间
    todayLog: DayLog;       // 当日 日志

  constructor(name: string) {  // 增加构造函数，刘宇轩
    this.name = name;
  }
}
