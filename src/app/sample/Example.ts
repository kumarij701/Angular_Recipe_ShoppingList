import { getLocaleDirection } from "@angular/common";
import { type } from "os";
import { exhaustMap } from "rxjs";

//export class some{
 
let hobbies: string[] =[];
 /**let people : {
  name : string;
  age : number;
}; **/ //={name:'shahb', age:19};
 /**let people : {
     name : string;
     age : number;
    }; **/ //={name:'shahb', age:19};
 let pea!: examp;

let people: {
  name : string;
  age : number;
} = {
  name:'dsds',
  age:23
};
//union types
var str: number | string | boolean | string[] = 'jsnjns';

 let Animal : {
  name1: string;
} | undefined

type examp ={
 name2: string;
 age:number;
}

let cat: examp ;

function add(a:any , b: any): any{
  return a+b;
}

//Generics

function InsertAtBeginning<T>(array : T[], value :T)
{
   const newArray = [value, ...array];
   return newArray;
}
const demoArray =[1,2,3,4]
const updatedArray = InsertAtBeginning(demoArray, 5);
const stringArray =InsertAtBeginning(['a','b','c','d'], 'f');

class Student{
    /*firstName: string;
    lastName: string;
    age: number;
    course: string[];

    constructor(first:string, last: string, age: number, course: string[])
    {
        this.firstName= first;
        this.lastName= last;
        this.age= age;
        this.course=course;
    }*/
    //shorhand method of initializing Property
  
    constructor(public firstName:string, public lastName:string, public age:number, private course:string[]){}

    enroll(courseName :string){
        this.course.push(courseName);
    }
  
    //output ==> math, angular,react
    listCourses(){
        return this.course.slice();
    }
}

const student = new Student('j', 'K', 23, ['math']);
student.enroll('angular');
student.enroll('react');
//student.listCourses();  ==> math, angular,react

//Interfaces
 interface Human{
     name: string;
     age: number;

     greet :() => void;
}

     let max: Human;
     max ={
         name:'saasa',
         age:65,
         greet(){
             console.groupCollapsed("hello!");
         },
 }
 //interfaces can also be implemented by classes
 class Being implements Human{
     /*name: string;
     age:number;
     greet(){
         console.log("bye!");
     }
     constructor(name:string , age: number)
     {
         this.name =name;
         this.age= age;
     }*/
     constructor(public name:string, public age:number)
     {
     }
     greet(){
         console.log("byeeeeee!!!");
     }
 }
