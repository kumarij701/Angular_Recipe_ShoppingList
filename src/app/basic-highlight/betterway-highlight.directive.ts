import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterwayHighlight]'
})
export class BetterwayHighlightDirective implements OnInit {
  //dynamically setting values from outside
  @Input() defaultColor: string='transparent';
  @Input() highlightColor: string='blue';
 @HostBinding('style.backgroundColor') backgroundColor:string; //=this.defaultColor;

  constructor(private elref:ElementRef,private renderer:Renderer2) { }
  ngOnInit(): void {
    this.backgroundColor=this.defaultColor;
    //this.renderer.setStyle(this.elref.nativeElement, 'background-color','blue');
  }
  // this is the preferred way of using directive using Renderer

  @HostListener('mouseenter') mouseOver(eventData:Event){
    //this.renderer.setStyle(this.elref.nativeElement, 'background-color','blue');
     this.backgroundColor=this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    //this.renderer.setStyle(this.elref.nativeElement, 'background-color','transparent');
    this.backgroundColor=this.defaultColor;
  }
  //HostBinding is easier to implement than using Renderer
}
