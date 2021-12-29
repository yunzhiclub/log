/**
 * 用户
 */
export class User {
  id: number;
  name?: string;
  username: string;
  password: string;
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
