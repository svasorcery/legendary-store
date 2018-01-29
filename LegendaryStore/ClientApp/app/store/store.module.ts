import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';

import { StoreRoutingModule, storeComponents } from './store.routing';


@NgModule({
    imports: [
        SharedModule,
        StoreRoutingModule
    ],
    declarations: [
        ...storeComponents
    ],
    providers: [

    ],
    exports: [
        ...storeComponents
    ],
})
export class StoreModule { 

}
