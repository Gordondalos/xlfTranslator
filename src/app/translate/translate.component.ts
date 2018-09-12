import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';

const js2xmlparser = require("js2xmlparser");
const fs = require("fs");

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TranslateComponent implements OnInit {
  show = false;

  arrTranslates: any = [];
  dataToSave: string;

  constructor(
    private ngzone: NgZone,
    private xlfTranslatorService: XlfTranslatorService,) {
    this.xlfTranslatorService.saveData.subscribe((path) => {
      this.save(path);
    })
  }

  ngOnInit() {
    this.xlfTranslatorService.sources
      .subscribe((arrTranslates) => {
        console.log('-->', this.arrTranslates);
        this.show = true;
        this.ngzone.run(() => {
          this.arrTranslates = arrTranslates;
        });
      })
  }

  change(res) {
    this.writeChanges();
  }

  save(path) {
    if(!this.dataToSave){
      this.writeChanges();
    }
    fs.writeFileSync(path, this.dataToSave);
  }


  writeChanges() {
    const result = js2xmlparser.parse("trans-unit", this.arrTranslates, { attributeString: '$' });
    const a = result.replace(/<_>/g, '').replace(/<\/_>/g, '').replace(/\r|\n/g, '');
    const b = a.substr(34, a.length);
    const c = b.substring(0, b.length - 13);
    this.dataToSave = `<?xml version='1.0' encoding='utf-8'?><xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2"><file source-language="ru" datatype="plaintext" original="ng2.template"><body>${c}</body></file></xliff>`;

  }

}
