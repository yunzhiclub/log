/**
 * 用户
 * author: liMingAo
 */
import {Ding} from './ding';

export class User {
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户姓名
   */
  name?: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 邮箱
   */
  email?: string;

  /**
   * 每天8点向该钉钉推送所有状态为启用客户端的信息
   */
  ding?: Ding

  constructor(data = {} as {
    id: number,
    name?: string,
    username: string,
    password: string,
    email?: string,
    ding?: Ding
  }) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.ding = data.ding;
  }
}
