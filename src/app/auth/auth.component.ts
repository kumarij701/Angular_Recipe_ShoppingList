
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../Shared/alert/alert.component';
import { PlaceholderDirective } from '../Shared/placeholder/placeholder.directive';
import {  AuthService } from './auth.service'; //import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action'; 

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode=true;
  isLoading =false;
  error :string = null;
  @ViewChild(PlaceholderDirective, { static: false} ) alertHost: PlaceholderDirective; 
  
  private closesub :Subscription;
  private storeSub :Subscription;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode; //Reversing the value
  }

  constructor(private authservice: AuthService, private router :Router, private ComponentFactoryresolver : ComponentFactoryResolver, private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub =  this.store.select('auth').subscribe(authState =>{
         this.isLoading = authState.loading;
         this.error = authState.authError;
         if(this.error){
           this.showErrorAlert(this.error);
         }
    });
  }

  ngOnDestroy(){
    if(this.closesub){
    this.closesub.unsubscribe();
    }

    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  onSubmit(form :NgForm)
  {
    if(!form.valid)
    {
      return;
    }
    const email = form.value.email;
    const password= form.value.password;

    //let authObs: Observable<AuthResponseData>;

    //this.isLoading = true;
    if(this.isLoginMode)
    {
      //authObs =  this.authservice.login(email,password)
      this.store.dispatch(new AuthActions.LoginStart({email :email, password: password}));
    }
    else
    {
      //console.log(email + password);
      //authObs = this.authservice.SignUp(email, password);
      this.store.dispatch(new AuthActions.SignupStart({email :email, password: password}));
  }

 
  // authObs.subscribe(resData =>{
  //   console.log(resData);
  //   this.isLoading=false;
  //   this.router.navigate(['/recipes']);
  // }, errormessage =>{
  //   console.log(errormessage);
  //   this.error =errormessage;
  //   this.showErrorAlert(errormessage);
  //   this.isLoading=false;
  // });
   form.reset();
}

onHandleError(){
 //this.error =null;
 this.store.dispatch(new AuthActions.ClearError());
}

private showErrorAlert(message :string){   //doint it programatically
   //const alertcmp = new AlertComponent();   //valid TS code but not a valid angular code so this won't work
   //proper way to do this is below

  const alertCmpFactory =  this.ComponentFactoryresolver.resolveComponentFactory(AlertComponent); ///returns the factory not the component
  
  const hostViewContainerRef =this.alertHost.viewContainerRef;
  hostViewContainerRef.clear();

  const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

  componentRef.instance.message = message;
  this.closesub = componentRef.instance.close.subscribe(()=>{
   this.closesub.unsubscribe();
   hostViewContainerRef.clear();
  })
}

}
