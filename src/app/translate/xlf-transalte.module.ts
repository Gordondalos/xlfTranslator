import { NgModule } from '@angular/core';

import { TranslateComponent } from './translate.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
 imports: [
   CommonModule,
   FormsModule,
 ],
 exports: [
   TranslateComponent,
 ],
 declarations: [
   TranslateComponent,
 ],
 providers: [],
})
export class XlfTranslateModule { }
