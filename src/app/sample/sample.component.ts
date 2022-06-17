import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  //styleUrls: ['./sample.component.css']
  styles:[`
   .online{
     color:'white';
   }
  `]
})
export class SampleComponent implements OnInit {

  serverId:number =10;
  serverStatus: string ='offline'

  constructor() { 
    this.serverStatus = Math.random() > 0.5 ? 'online':'offline';
  }

  ngOnInit(): void {
  }

  getServerStatus(){
   return this.serverStatus;
  }

  getColor()
  {
    return this.serverStatus === 'online' ? 'red' :'green';
  }

/***8hobbies: string[] =[];
 /**let people : {
  name : string;
  age : number;
}; //={name:'shahb', age:19};

people: {
  name : string;
  age : number;
} = {
  name:'dsds',
  age:23
};
//union types
str: number | string | boolean | string[] = 'jsnjns';

 Animal : {
  name1: string;
} | undefined

add(a:any , b: any): any{
  return a+b;
}***/

}
