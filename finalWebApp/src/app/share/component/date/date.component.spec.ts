import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateComponent} from './date.component';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  template: `
    {{ formControl.value | json }}
    <yz-date [formControl]="formControl"></yz-date>`
})

class TestComponent implements OnInit {

  formControl = new FormControl(1632037062746);

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(value => console.log('value', value));
  }

}

describe('DateComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let dateComponent: DateComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, DateComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    dateComponent = fixture.debugElement.query(By.directive(DateComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('time', () => {
    expect(component).toBeTruthy();
    //2021-09-19
    dateComponent.writeValue(1632037062746);
    expect(dateComponent.formControl.value).toBe('2021-09-19');
    //2021-10-19
    dateComponent.writeValue(1634601600000);
    expect(dateComponent.formControl.value).toBe('2021-10-19');
    //null
    dateComponent.writeValue(null);
    expect(dateComponent.formControl.value).toBe(null);
    //undefined
    dateComponent.writeValue(undefined);
    expect(dateComponent.formControl.value).toBe(null);
  })
});
