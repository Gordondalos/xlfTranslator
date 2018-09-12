import { NgModule } from '@angular/core';

import { TranslateComponent } from './translate.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
 imports: [
   CommonModule,
   FormsModule,
   PipesModule,
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
