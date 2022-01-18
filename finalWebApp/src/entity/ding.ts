import {Client} from "./client";

/**
 * 机器人实体
 */

export class Ding {

  id: number;
  webHook: string;
  secret: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 客户端
   */
  client: Client;
  /**
   * 链接状态
   */
  connectionStatus?: boolean;

  /**
   * 启用，停用
   */
  start?: boolean

  constructor(param = {} as
    {
      id?: number,
      webHook?: string,
      secret?: string,
      name?: string,
      client?: Client,
      connectionStatus?: boolean,
      start?: boolean
    }) {
    this.id = param.id
    this.webHook = param.webHook;
    this.secret = param.secret;
    this.name = param.name;
    this.client = param.client;
    this.connectionStatus = param.connectionStatus;
    this.start = param.start;
  }
}
