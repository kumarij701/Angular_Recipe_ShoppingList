import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
   selector:'[appHighlight]'
   //when using no need to add square brackets with attribute
})

export class BasicHighlightDirective implements OnInit{

  constructor(private elementRef:ElementRef){
  }
    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor ='green';
    }
    // add this Directive in app.module.ts
    //Not a better way as this is not a good practice to access elements directly

}