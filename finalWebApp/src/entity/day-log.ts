import {Client} from './client';

export class DayLog {
  id: number;
  day: Date;
  errorCount: number;
  infoCount: number;
  warnCount: number;
  client: Client;

  constructor(param?: {id?: number; day?: Date; errorCount?: number; infoCount?: number; warnCount?: number; client?: Client}) {
    if (!param) {
      return;
    }
    this.id = param.id ? param.id : null;
    this.day = param.day ? param.day : null;
    this.errorCount = param.errorCount ? param.errorCount : -1;
    this.infoCount = param.infoCount ? param.infoCount : -1;
    this.warnCount = param.warnCount ? param.warnCount : -1;
    this.client = param.client ? param.client : null;
  }
}
