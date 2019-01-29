import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ClientRoutingModule } from './client-routing.module';
import { ClientIndexComponent } from './index.component';
import { ClientAddComponent } from './add/add.component';

const COMPONENTS = [
    ClientIndexComponent];
const COMPONENTS_NOROUNT = [
    ClientAddComponent,
];

@NgModule({
    imports: [
        SharedModule,
        ClientRoutingModule,
    ],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class ClientModule {
}
