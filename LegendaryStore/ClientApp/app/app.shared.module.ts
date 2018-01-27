import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, appComponents } from './app.routing';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        HttpModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        ...appComponents
    ]
})
export class AppModuleShared {
    
}
