import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { ListComponent } from './components/list/list.component';
import { AddEditDiaryModalComponent } from './components/add-edit-diary-modal/add-edit-diary-modal.component';
import { RemoveWarningModalComponent } from './components/remove-warning-modal/remove-warning-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMessageComponent } from './components/input-message/input-message.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Trash, Pen } from 'ng-bootstrap-icons/icons';

const icons = {
    Trash,
    Pen
};

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        ListComponent,
        AddEditDiaryModalComponent,
        RemoveWarningModalComponent,
        InputMessageComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ReactiveFormsModule,
        BootstrapIconsModule.pick(icons)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
