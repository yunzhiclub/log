import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCenterComponent } from './personal-center.component';
import {TestModule} from '../test/test.module';
import {User} from '../norm/entity/user';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';

describe('PersonalCenterComponent', () => {
  let component: PersonalCenterComponent;
  let fixture: ComponentFixture<PersonalCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCenterComponent ],
      imports: [
        TestModule
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit', () => {
    const userService = TestBed.get(UserService) as UserService;
    console.log(userService);
    const mockReturnUser = new User({id: null, username: null, name: null, email: null});
    spyOn(userService, 'me').and.returnValue(of(mockReturnUser));

    component.ngOnInit();
    expect(component.user).toBe(mockReturnUser);
  });
});
