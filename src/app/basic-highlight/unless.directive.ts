import { Directive , Input, OnInit , TemplateRef , ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
//It is the opposite of *ngIf
export class UnlessDirective implements OnInit {
 //it is method which gets executed whenever property changes and it changes whenever it changes outside the directive
  @Input() set appunless(condition:boolean){
    if(!condition){
     //creates a view in view container
     this.vcRef.createEmbeddedView(this.templateRef);
    }else{
     this.vcRef.clear();
    }
 }
  //Injecting the Template and view
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
  ngOnInit():void{
    
  }
  /** In App.component.html
  //when onlyOdd will be 'false' it will show the div
  //<div *appunless="onlyOdd">
    <li 
    class="list-group-item"
    [ngClass]="{odd:even % 2 !==0}"
    [ngStyle]="{backgroundColor: even % 2 !==0 ? 'yellow' : 'transparent'}"
    *ngFor ="let even of evenNumbers">
    {{even}}
    </li>
    </div>
    </ul>
    
   * 
   */

}