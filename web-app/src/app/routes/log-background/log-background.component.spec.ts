import { LogBackgroundComponent } from './log-background.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('后台日志管理', () => {
    let component: LogBackgroundComponent;
    let fixture: ComponentFixture<LogBackgroundComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LogBackgroundComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogBackgroundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
