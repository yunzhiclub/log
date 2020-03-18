export class User {
    id: number;
    username: string;
    email: string;
    name: string;

  constructor(data?: { id?: number, name?: string; username?: string; email?: string }) {
    if (!data) {
      return;
    }
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : '';
    this.username = data.name ? data.username : '';
    this.email = data.name ? data.email : '';


  }
}
