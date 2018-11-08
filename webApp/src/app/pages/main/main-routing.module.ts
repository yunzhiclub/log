import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { AppComponent } from './app/app.component';
import { LogComponent } from './log/log.component';

// 定义路由
const routes: Routes = [
	{
		path: 'main', component: MainComponent, children: [
			{ path: 'app', component: AppComponent },
			{ path: 'log', component: LogComponent }
		]
	}
];

// 声明路由
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class MainRouteModule { }