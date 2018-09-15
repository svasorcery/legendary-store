import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {

}


export const appComponents = [
    AppComponent,
    NavMenuComponent,
    HomeComponent
];
