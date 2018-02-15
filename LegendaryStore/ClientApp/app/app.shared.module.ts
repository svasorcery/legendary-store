import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, appComponents } from './app.routing';

import { UserService } from './user.service';

import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';

@NgModule({
    imports: [
        SharedModule,
        HttpModule,
        FormsModule,
        StoreModule,
        AppRoutingModule
    ],
    providers: [
        UserService
    ],
    declarations: [
        ...appComponents
    ]
})
export class AppModuleShared {
    
}
