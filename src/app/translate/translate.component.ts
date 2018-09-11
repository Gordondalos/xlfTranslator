import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';
const js2xmlparser = require("js2xmlparser");

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
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
          this.arrTranslates = arrTranslates;
        });
      })
  }

  change(res){
    console.log(this.arrTranslates);
    const result = js2xmlparser.parse("trans-unit", this.arrTranslates, {attributeString: '$'});
    const a = result.replace(/<_>/g, '').replace(/<\/_>/g, '');
    const b = a.substr(34, a.length);
    const c = b.substring(0, b.length - 13);
    const d = `<?xml version='1.0' encoding='utf-8'?><xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2"><file source-language="ru" datatype="plaintext" original="ng2.template"><body>${c}</body></file></xliff>`;
    console.log(d);
  }

}
