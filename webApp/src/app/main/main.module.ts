import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {
    AutoCompleteModule,
    CheckboxModule,
    ContextMenuModule,
    EditorModule,
    FieldsetModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MegaMenuModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    RadioButtonModule,
    ScrollPanelModule,
    TreeTableModule,
} from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { httpInterceptorProviders } from '../interceptor/index-interceptor';
import { ShareModule } from '../share/share.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        MainComponent,
    ],
    imports: [
        CommonModule,
        TreeTableModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ButtonModule,
        ContextMenuModule,
        DialogModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        PaginatorModule,
        OverlayPanelModule,
        PanelMenuModule,
        ReactiveFormsModule,
        RadioButtonModule,
        ScrollPanelModule,
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'ui-button-success ui-button',
            cancelButtonClass: 'btn ',
        }),
        TableModule,
        DynamicFormsCoreModule,
        EditorModule,
        DynamicFormsPrimeNGUIModule,
        CheckboxModule,
        RadioButtonModule,
        PanelModule,
        FieldsetModule,
        ShareModule,
        MainRoutingModule,
        AutoCompleteModule,
    ],
    providers: [
        httpInterceptorProviders,
    ],
})
export class MainModule {
}
