import { NgModule } from '@angular/core';
import {AutoCompleteComponent} from './auto-complete.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AutoCompleteComponent]
})
export class AutocompleteModule { }
