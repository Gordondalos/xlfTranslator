import { Component, OnInit } from '@angular/core';
import { XlfTranslatorService } from '../services/xlf-translator.service';
import * as _ from 'lodash';

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
  filePath: string;

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
      this.filePath = file.path;
      if (file) {
        this.getFile(file.path);
      }

    }
  }

  getFile(path: string) {
    const parser = new xml2js.Parser();
    fs.readFile(path, (err, data) => {
      parser.parseString(data, (err, result) => {
        this.arrTranslates = result.xliff.file[0]['body'][0]['trans-unit'];
        _.each(this.arrTranslates, (item) => {
          if(!item.target){
            item.target = [
              {
                $: {spate: 'translated'},
                edit: ['true'],
                _:''
              }
            ];
          }
        });
        console.log(this.arrTranslates);
        console.log('Done');
        this.xlfTranslatorService.sources.next(this.arrTranslates);
      });
    });
  }

  save(){
    this.xlfTranslatorService.saveData.next(this.filePath);
  }

}
