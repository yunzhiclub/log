import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavComponent } from './leftnav.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';

describe('LeftnavComponent', () => {
  let component: LeftnavComponent;
  let fixture: ComponentFixture<LeftnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftnavComponent ],
      imports: [CommonModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
