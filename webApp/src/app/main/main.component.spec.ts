import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/primeng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DepartmentService } from '../service/department.service';
import { Renderer2 } from '@angular/core';
import { ShareModule } from '../share/share.module';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent, LoginComponent],
            imports: [
                RouterTestingModule,
                FormsModule,
                ScrollPanelModule,
                HttpClientTestingModule,
                // 有
                SweetAlert2Module.forRoot({
                    buttonsStyling: false,
                    customClass: 'modal-content',
                    confirmButtonClass: 'btn ui-button-success',
                    cancelButtonClass: 'btn ',
                }),
                ShareModule,
            ],
            providers: [DepartmentService, Renderer2],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
