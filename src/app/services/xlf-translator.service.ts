import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class XlfTranslatorService {

  sources = new Subject();
  saveData = new Subject();

  constructor() { }
}
