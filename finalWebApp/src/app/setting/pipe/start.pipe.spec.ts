import { StartPipe } from './start.pipe';
import {DomSanitizer} from "@angular/platform-browser";

describe('StartPipe', () => {
  let domSanitizer: DomSanitizer;
  it('create an instance', () => {
    const pipe = new StartPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
