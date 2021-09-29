
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'dateCount'
})
export class DateCountPipe implements PipeTransform {
    transform(date: string){
        return moment(date).fromNow();
    }
}