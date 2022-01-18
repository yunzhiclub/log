
export class Ding {
  name: string;
  clientId: number;
  webHook: string;
  secret: string;
  state?: boolean;
  constructor(data = {} as {name: string,clientId: number,webHook: string, secret: string, state?:boolean}) {
    if (data) {
      this.name = data.name;
      this.clientId = data.clientId;
      this.webHook = data.webHook;
      this.secret = data.secret;
      this.state = data.state;
    }
  }
}
