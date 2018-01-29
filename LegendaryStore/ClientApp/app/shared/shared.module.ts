import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner.component';
import { TreeMenuComponent, TreeMenuItemComponent } from './tree-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SpinnerComponent,
        TreeMenuItemComponent,
        TreeMenuComponent
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        SpinnerComponent,
        TreeMenuItemComponent,
        TreeMenuComponent
    ],
})
export class SharedModule {
    
}
