import {Client} from './client';

export class Log {
  id: number;
  level: string;
  levelCode: number;
  logger: string;
  context: string;
  thread: string;
  message: string;
  timestamp: number;
  client: Client;

  constructor(log: {
    id: number,
    level: string,
    levelCode: number,
    logger: string,
    context: string,
    thread: string,
    message: string,
    timestamp: number,
    client: Client
  }) {
    this.id = log.id ? log.id : null;
    this.level = log.level ? log.level : null;
    this.levelCode = log.levelCode ? log.levelCode : null;
    this.logger = log.logger ? log.logger : null;
    this.context = log.context ? log.context : null;
    this.thread = log.thread ? log.thread : null;
    this.message = log.message ? log.message : null;
    this.timestamp = log.timestamp ? log.timestamp : null;
    this.client = log.client ? log.client : new Client(null);
  }
}
