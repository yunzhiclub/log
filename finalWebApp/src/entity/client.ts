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
   * token长度只能为32位
   */
  token: string;
  /**
   * 访问地址
   */
  url = 'http://';
  /**
   * 最后一次发送日志的时间
   */
  lastSendTime: number;
  /**
   * 最近一次系统启动时间
   */
  lastStartTime: number;
  /**
   * 当日 日志
   */
  todayLog: DayLog;

  /**
   * @param state 状态
   */
  state: boolean;

  /**
   * 启用，停用
   */
  start: boolean

  constructor(param?: {id?: number; name: string; token?: string; url?:string; lastSendTime?: number; lastStartTime?: number; todayLog?: DayLog; state?: boolean; start?: boolean}) {

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
    this.state = param.state ? param.state : false;
    this.start = param.start ? param.start : false;
  }
}
