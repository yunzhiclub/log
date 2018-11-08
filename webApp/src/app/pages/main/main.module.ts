import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRouteModule } from './main-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// 模块声明

@NgModule({
	// 该模块的组成的组件声明
	declarations: [
		MainComponent
	],
	// 该模块的依赖声明（在组件中，不需要声明依赖）
	imports: [
		CommonModule,
		MainRouteModule,
		NgZorroAntdModule
	]
})
export class MainModule { }
