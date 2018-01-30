import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner.component';
import { AutoCompleteComponent } from './autocomplete.component';
import { TreeMenuComponent, TreeMenuItemComponent } from './tree-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        SpinnerComponent,
        AutoCompleteComponent,
        TreeMenuItemComponent,
        TreeMenuComponent
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        SpinnerComponent,
        AutoCompleteComponent,
        TreeMenuItemComponent,
        TreeMenuComponent
    ],
})
export class SharedModule {
    
}
