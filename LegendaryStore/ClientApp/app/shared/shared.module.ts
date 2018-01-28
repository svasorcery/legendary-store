import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        SpinnerComponent
    ],
})
export class SharedModule {
    
}
