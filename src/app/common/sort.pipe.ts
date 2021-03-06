import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'order',pure: false })
export class OrderByPipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {
    return records.sort((a, b) => {
      if(a[args.property] < b[args.property]){
        return -1 * args.direction;
      } else if( a[args.property] > b[args.property]){
        return 1 * args.direction;
      } else {
        return 0;
      }
    });
  }
 }
