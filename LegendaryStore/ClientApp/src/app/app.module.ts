import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, appComponents } from './app.routing';

import { UserService } from './user.service';

import { SharedModule } from './shared/shared.module';
import { ErrorsModule } from './errors/errors.module';
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
        ErrorsModule,
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
