export class User {
    id: number;
    username: string;
    name: string;
    role: number;

  constructor(data?: { id?: number, name?: string; username?: string; role?: number}) {
    if (!data) {
      return;
    }
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : '';
    this.username = data.name ? data.username : '';
    this.role = data.role ? data.role : null;
  }
}
