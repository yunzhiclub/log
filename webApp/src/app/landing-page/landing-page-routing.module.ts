import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
    {
        path: 'landingPage',
        component: LandingPageComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule {
}
