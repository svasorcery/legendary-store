import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './spinner.component';
import { ErrorComponent } from './error.component';
import { AutoCompleteComponent } from './autocomplete.component';
import { TreeMenuComponent, TreeMenuItemComponent } from './tree-menu.component';
import { RatingBarComponent, RatingStarComponent } from './rating-bar.component';
import { ModalComponent } from './modal.component';
import { PagerComponent } from './pager.component';
import { FileUploadComponent } from './file-upload.component';

import { SafePipe } from './safe.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        SpinnerComponent,
        ErrorComponent,
        AutoCompleteComponent,
        TreeMenuItemComponent,
        TreeMenuComponent,
        RatingBarComponent, RatingStarComponent,
        ModalComponent,
        PagerComponent,
        FileUploadComponent,

        SafePipe
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        SpinnerComponent,
        ErrorComponent,
        AutoCompleteComponent,
        TreeMenuItemComponent,
        TreeMenuComponent,
        RatingBarComponent,
        ModalComponent,
        PagerComponent,
        FileUploadComponent,

        SafePipe
    ],
})
export class SharedModule {

}
