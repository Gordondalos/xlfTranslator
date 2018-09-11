import { Component, OnInit } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';

const fs = require("fs");
const xml2js = require('xml2js');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fs: any;
  arrTranslates: any = [];

  constructor(
    private xlfTranslatorService: XlfTranslatorService,
  ) {
    this.fs = (window as any).fs;
  }

  ngOnInit() {

  }

  openFile() {
    const elem = document.getElementById('input');
    elem.click();
    elem.onchange = () => {
      const selectedFile: any = document.getElementById('input');
      const file = selectedFile.files[0];
      if (file) {
        this.getFile(file.path);
      }

    }
  }

  getFile(path: string) {
    const parser = new xml2js.Parser();
    fs.readFile(path, (err, data) => {
      parser.parseString(data, (err, result) => {
        console.dir(result);
        this.arrTranslates = result.xliff.file[0]['body'][0]['trans-unit'];
        console.log('Done');
        this.xlfTranslatorService.sources.next(this.arrTranslates);
      });
    });
  }

  save(){
    this.xlfTranslatorService.saveData.next();
  }

}
