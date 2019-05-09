import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './main/main.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ShareModule } from './share/share.module';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ShareModule,
        MainModule,
        LandingPageModule,
    ],
    providers: [
        { provide: 'DEFAULT_SIZE_CONFIG', useValue: 5 },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
