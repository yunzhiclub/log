export class Ding {

  webHook: string;
  secret: string;

  constructor(param?: {webHook: string, secret: string}) {
    if (!param) {
      this.webHook = param.webHook ? param.webHook : null;
      this.secret = param.secret ? param.secret : null;
    }
  }
}
