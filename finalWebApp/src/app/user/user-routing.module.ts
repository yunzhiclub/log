import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {NgModule} from '@angular/core';

const routs: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
