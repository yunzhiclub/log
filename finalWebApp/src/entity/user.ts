/**
 * 用户
 */
export class User {
  /**
   * 用户id
   */
  id: number;
  /**
   *用户姓名
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
  constructor(data = {} as {
    id: number,
    name?: string,
    username: string,
    password: string,
    email?: string
  }) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
  }
}
