import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import {HeadnavComponent} from './headnav/headnav.component';
import {TestModule} from './test/test.module';
import {RouterModule} from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TestModule
      ],
      declarations: [
        AppComponent, LeftnavComponent, HeadnavComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
