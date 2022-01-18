import { ConnectionStatusPipe } from './connection-status.pipe';
import {DomSanitizer} from "@angular/platform-browser";

describe('ConnectionStatusPipe', () => {
  let domSanitizer: DomSanitizer;

  it('create an instance', () => {
    const pipe = new ConnectionStatusPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
