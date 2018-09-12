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
  arrUpdateTranslates: any = [];
  filePath: string;

  constructor(
    private xlfTranslatorService: XlfTranslatorService,
  ) {
    this.fs = (window as any).fs;
  }

  ngOnInit() {

  }

  updateFile(): void {
    this.getUpdatefromFile();
  }

  getUpdatefromFile(): void {
    const elem = document.getElementById('input');
    elem.click();
    elem.onchange = () => {
      const selectedFile: any = document.getElementById('input');
      const file = selectedFile.files[0];
      this.parseDataToObjectUpdate(file.path)
    }
  }

  parseDataToObjectUpdate(path){
    const parser = new xml2js.Parser();
    fs.readFile(path, (err, data) => {
      parser.parseString(data, (err, result) => {
        this.arrUpdateTranslates = result.xliff.file[0]['body'][0]['trans-unit'];
        _.each(this.arrUpdateTranslates, (item) => {
          if (!item.target) {
            item.target = [
              {
                $: { spate: 'translated' },
                _: ''
              }
            ];
          }
        });
        this.loadOldTranslate();
      });
    });
  }

  loadOldTranslate(){
    _.each(this.arrUpdateTranslates, (item) => {
      const data = _.find(this.arrTranslates, (it) => {
        return it.source[0] === item.source[0]
      });
      if(data){
        item.target = data.target;
      }
    });
    this.arrTranslates = this.arrUpdateTranslates;
    this.sendTranslateToEdit();
  }




  openFile(): void {
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

  getFile(path: string, send: boolean = true): void {
    const parser = new xml2js.Parser();
    fs.readFile(path, (err, data) => {
      parser.parseString(data, (err, result) => {
        this.arrTranslates = result.xliff.file[0]['body'][0]['trans-unit'];
        _.each(this.arrTranslates, (item) => {
          if (!item.target) {
            item.target = [
              {
                $: { spate: 'translated' },
                _: ''
              }
            ];
          }
        });
        console.log('Loaded');
        if(send){
          this.sendTranslateToEdit();
        }

      });
    });
  }

  sendTranslateToEdit(): void{
    this.xlfTranslatorService.sources.next(this.arrTranslates);
  }

  save(): void {
    this.xlfTranslatorService.saveData.next(this.filePath);
  }

}
