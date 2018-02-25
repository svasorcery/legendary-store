import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner.component';
import { AutoCompleteComponent } from './autocomplete.component';
import { TreeMenuComponent, TreeMenuItemComponent } from './tree-menu.component';
import { ModalComponent } from './modal.component';
import { RatingBarComponent, RatingStarComponent } from './rating-bar.component';

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
        TreeMenuComponent,
        ModalComponent,
        RatingBarComponent, RatingStarComponent
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        SpinnerComponent,
        AutoCompleteComponent,
        TreeMenuItemComponent,
        TreeMenuComponent,
        ModalComponent,
        RatingBarComponent
    ],
})
export class SharedModule {
    
}
