import { Component, OnInit, NgZone } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  show = false;

  arrTranslates: any = [];

  constructor(
    private ngzone: NgZone,
    private xlfTranslatorService: XlfTranslatorService,) {
  }

  ngOnInit() {
    this.xlfTranslatorService.sources
      .subscribe((arrTranslates) => {
        console.log(this.arrTranslates);
        this.show = true;
        this.ngzone.run(() => {
          this.arrTranslates = arrTranslates
        });
      })
  }

}
