import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlaceholder]'  //so we can put it as attribute
})
export class PlaceholderDirective{
     constructor(public viewContainerRef : ViewContainerRef){}


}