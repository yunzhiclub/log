import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientIndexComponent } from './index.component';

const routes: Routes = [
    { path: '', component: ClientIndexComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {
}
