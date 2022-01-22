import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { ListComponent } from './components/list/list.component';
import { AddEditDiaryModalComponent } from './components/add-edit-diary-modal/add-edit-diary-modal.component';
import { RemoveWarningModalComponent } from './components/remove-warning-modal/remove-warning-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMessageComponent } from './components/input-message/input-message.component';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
