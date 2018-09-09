import { Component, OnInit } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  arrTranslates: Array<any> = [];

  constructor(
    private xlfTranslatorService: XlfTranslatorService,) {
  }

  ngOnInit() {
    this.xlfTranslatorService.sources
      .subscribe((arrTranslates) => {
        _.each(arrTranslates, (item, index) => {
          this.arrTranslates.push(item);
        });
        console.log(this.arrTranslates);
       console.log(window);


      })
  }

}
