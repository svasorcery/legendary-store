import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, appComponents } from './app.routing';

@NgModule({
    imports: [
        CommonModule,
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
