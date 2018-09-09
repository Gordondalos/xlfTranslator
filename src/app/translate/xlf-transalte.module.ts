import { NgModule } from '@angular/core';

import { TranslateComponent } from './translate.component';
import { CommonModule } from '@angular/common';

@NgModule({
 imports: [
   CommonModule,
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
