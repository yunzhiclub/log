import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { SystemComponent } from './system/system.component';
import { ClientComponent } from './client/client.component';
import { LogFrontComponent } from './log-front/log-front.component';
import { LogBackgroundComponent } from './log-background/log-background.component';

const COMPONENTS = [
    DashboardComponent,
    // passport pages
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent,
    // single pages
    CallbackComponent,
    UserLockComponent,
    SystemComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
        ClientComponent,
        LogFrontComponent,
        LogBackgroundComponent,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {
}
