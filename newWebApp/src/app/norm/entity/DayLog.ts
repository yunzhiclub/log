import {Client} from './Client';

export class DayLog {
    id: number;
    day: Date;
    errorCount: number;
    infoCount: number;
    warnCount: number;
    client: Client;
}
