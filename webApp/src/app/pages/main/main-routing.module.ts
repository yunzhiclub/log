import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { AppComponent } from './app/app.component';

const routes: Routes = [
	{ path: 'main', component: MainComponent, children: [
		{path: 'app', component: AppComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class MainRouteModule { }