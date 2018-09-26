import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from './spinner.component';
import { ErrorComponent } from './error.component';
import { AutoCompleteComponent } from './autocomplete.component';
import { TreeMenuComponent, TreeMenuItemComponent } from './tree-menu.component';
import { ModalComponent } from './modal.component';
import { RatingBarComponent, RatingStarComponent } from './rating-bar.component';
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
        ModalComponent,
        RatingBarComponent, RatingStarComponent,
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
        ModalComponent,
        RatingBarComponent,
        FileUploadComponent,

        SafePipe
    ],
})
export class SharedModule {

}
