import {DayLog} from './day-log';

export class Client {
    id: number;
    name: string;           // 名称
    token: string ;         // token
    url = 'http://';        // 访问地址
    lastSendTime: Date;     // 最后一次发送日志的时间
    lastStartTime: Date;    // 最近一次系统启动时间
    todayLog: DayLog;      // 当日 日志
  // 构造函数——刘宇轩
  constructor(param?: { id?: number; name: string; token?: string; lastSendTime?: Date; lastStartTime?: Date; todayLog?: DayLog; }) {

    if (!param) {
      return;
    }

    this.id = param.id ? param.id : null;
    this.name = param.name ? param.name : '';
    this.token = param.token ? param.token : '';
    this.lastSendTime = param.lastSendTime ? param.lastSendTime : null;
    this.lastStartTime = param.lastStartTime ? param.lastStartTime : null;
    this.todayLog = param.todayLog ? param.todayLog : null;
  }
}
