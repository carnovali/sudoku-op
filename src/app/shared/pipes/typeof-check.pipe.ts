import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeofCheck',
})
export class TypeofCheckPipe implements PipeTransform {
  transform(value: any): any {
    return typeof value;
  }
}
