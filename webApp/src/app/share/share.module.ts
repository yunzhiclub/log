import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppProfileComponent } from './app.profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppFooterComponent } from './footer.component';
import { AppBootstrapComponent } from './app.bootstrap.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { DropdownModule, RadioButtonModule, ScrollPanelModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';
import { AppMenuService } from './app.menu.service';

@NgModule({
    declarations: [
        AppProfileComponent,
        AppFooterComponent,
        AppBootstrapComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppSubMenuComponent,
    ],
    imports: [BrowserModule, FormsModule, ScrollPanelModule, RouterModule, DropdownModule, RadioButtonModule],
    exports: [
        AppProfileComponent,
        AppFooterComponent,
        AppBootstrapComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        DropdownModule,
    ],
})
export class ShareModule {
    static forRoot(menuService: AppMenuService): ModuleWithProviders {
        return {
            ngModule: ShareModule,
            providers: [{ provide: AppMenuService, useValue: menuService }],
        };
    }
}
