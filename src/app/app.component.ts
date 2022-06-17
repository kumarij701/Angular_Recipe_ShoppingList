import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';
import { isPlatformBrowser } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations :[
    trigger('divState', [
      state('normal', style({
        'background-color' : 'red',
        transform : 'translateX(0)'     //so that it will not move left/right
      })),
      state('highlighted', style({
        backgroundColor :'blue',
        transform : 'translateX(100px)' // move it 100px to the right
      })),
      transition('normal <=> highlighted', animate(300)),  //if we want same Timing
      //transition('highlighted => normal', animate(800))
    ]),
    //To apply changes while Transitioning
    trigger('wildState', [
      state('normal', style({
        'background-color' : 'red',
        transform : 'translateX(0) scale(1)'     //so that it will not move left/right
      })), 
      state('highlighted', style({    
        backgroundColor :'blue',
        transform : 'translateX(100px) scale(1)' // move it 100px to the right
      })),
      state('shrunken', style({    
        backgroundColor :'orange',
        transform : 'translateX(0px) scale(0.5)' // move it 100px to the right
      })),
      //transition('normal <=> highlighted', animate(300)),  //if we want same Timing
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [ 
        style ({
          'background-color' : 'purple'
      }),
      animate(1000, style({
        borderRadius : '50px'
      })),
      animate(500)
    ])       //ms   //'*'WildCardCharacter for any State //can also give styling during Animation
    ])
  ]
})
export class AppComponent implements OnInit {
constructor(private authservice : AuthService, private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId){}  //not declaring the type for PlatformId , injecting the HardCoded value from PLATFORM_ID
 //PLATFORM_ID is globally provided by Angular                
  ngOnInit(){
    //this.authservice.autoLogin();
    if(isPlatformBrowser(this.platformId))
    {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    
  }
  state = 'normal';     
  wildState = 'normal';       //It should be same what we have declared in @Component Decorator
  list = ['Milk', 'Sugar', 'Bread'];
  
  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state ='normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState ='normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event){
   console.log(event);
  }

  animationEnded(event){
  console.log(event);
  }
  //title = 'first';
  //loadSelected:string ='recipe';
  //isSelect:boolean =true;

  //onSelectingHeader(selected:string){
    //this.loadSelected = selected;
    // if(selected === 'recipe')
    // {
    //   this.isSelect=true;
    // }
    // else{
    //   this.isSelect=false;
    // }
    
  //}
}
  

