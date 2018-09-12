import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sortByEmpty'
})
export class SortByEmptyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value){
      return value;
    }
    const res = (_.sortBy(value, (item) =>  item.target[0]['_'])).reverse();
    console.log(res);
    return res;

  }

}
