import {DayLog} from './day-log';

/**
 * 客户端实体
 */
export class Client {
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * token
   */
  token: string;
  /**
   * 访问地址
   */
  url = 'http://';
  /**
   * 最后一次发送日志的时间
   */
  lastSendTime: Date;
  /**
   * 最近一次系统启动时间
   */
  lastStartTime: Date;
  /**
   * 当日 日志
   */
  todayLog: DayLog;

  constructor(param?: {id?: number; name: string; token?: string; url?:string; lastSendTime?: Date; lastStartTime?: Date; todayLog?: DayLog; }) {

    if (!param) {
      return;
    }

    this.id = param.id ? param.id : null;
    this.name = param.name ? param.name : '';
    this.token = param.token ? param.token : '';
    this.url = param.url ? param.url : '';
    this.lastSendTime = param.lastSendTime ? param.lastSendTime : null;
    this.lastStartTime = param.lastStartTime ? param.lastStartTime : null;
    this.todayLog = param.todayLog ? param.todayLog : null;
  }
}
