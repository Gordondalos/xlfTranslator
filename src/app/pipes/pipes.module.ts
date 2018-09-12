import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByEmptyPipe } from './sort-by-empty/sort-by-empty.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortByEmptyPipe,
  ],
  exports: [
    SortByEmptyPipe,
  ]

})
export class PipesModule { }
