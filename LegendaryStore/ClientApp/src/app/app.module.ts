import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { AppComponent } from './app.component';
import { AppRoutingModule, appComponents, } from './app.routing';

import { UserService } from './user.service';

import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';

@NgModule({
    declarations: [
        ...appComponents
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        SharedModule,
        FormsModule,
        StoreModule,
        AppRoutingModule,
    ],
    providers: [
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { 
  
}
