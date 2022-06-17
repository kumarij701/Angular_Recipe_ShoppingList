import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'  ,        //{{string | shorten}}
  pure: false   //To change the output whenever data changes(can lead to performance issues)
})
export class ShortenPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
    //to give first 10 characters
    //return value.substr(0 , 10);   
  }

}
