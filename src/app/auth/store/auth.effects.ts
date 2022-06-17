import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions , createEffect, Effect, ofType } from '@ngrx/effects';   ///importing Actions from ngrx effects and not store
import { catchError, map, tap ,of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.action';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData{
    idToken : string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered? : boolean,
    displayName? : string,
  }

const HandleAuthentication = (expiresIn :number, email:string, localId: string, idtoken: string) =>
 {
    const expirationDate= new Date(new Date().getTime()+ expiresIn * 1000);
    const user = new User(email, localId , idtoken , expirationDate);
    localStorage.setItem('userData' , JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({email: email, userId: localId, token: idtoken, expirationDate: expirationDate, redirect : true});  // return of(new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate})); 
 };

const handleError = (errorRes :any) => {
    let errormessage ='An unknown error occurred!';  

                    if(!errorRes.error || !errorRes.error.error){
                          return of(new AuthActions.AuthenticateFail(errormessage));    //return throwError(errormessage);
                          
                    }
                  
                   switch(errorRes.error.error.message){
                     case 'EMAIL_EXISTS':
                       errormessage ='this email already exists!!!';
                       break;
                     case 'EMAIL_NOT_FOUND':
                       errormessage ='Thia Email does not exist!';
                       break;
                      case 'INVALID_PASSWORD':
                        errormessage ='This Password is Incorrect.';
                        break; 
                     }
                     //return throwError(errormessage);
                        return of(new AuthActions.AuthenticateFail(errormessage));
};
//we organize the effects in classes
@Injectable()                              //beacuse we are injecting in constructor, that's why we need injectable
export class AuthEffects{


    @Effect()
    authSignup = createEffect(() => this.actions$.pipe(ofType(AuthActions.SIGNUP_START),
     switchMap((signupAction: AuthActions.SignupStart) => {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        { email:signupAction.Payload.email,
        password:signupAction.Payload.password,
        returnSecureToken:true
        }).pipe(   ///Adding the operator on inner Observable
          tap(resData => {
            this.authService.SetLogoutTimer(+resData.expiresIn * 1000);
          }), 
          map(                          // //we have to add non-error observable in map //map automatically wraps what we are returning into an observable //no need to use of()
                resData=>{
                //    const expirationDate= new Date(new Date().getTime()+ +resData.expiresIn * 1000);
                //     return new AuthActions.AuthenticateSuccess({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate});  // return of(new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate}));
                return HandleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken );
            }                     
            )
         ,catchError(errorRes => {                             //we have to add non-error observable in catchError
            return handleError(errorRes);     
        //     let errormessage ='An unknown error occurred!';  

        //     if(!errorRes.error || !errorRes.error.error){
        //           return of(new AuthActions.AuthenticateFail(errormessage));    //return throwError(errormessage);
                  
        //     }
          
        //    switch(errorRes.error.error.message){
        //      case 'EMAIL_EXISTS':
        //        errormessage ='this email already exists!!!';
        //        break;
        //      case 'EMAIL_NOT_FOUND':
        //        errormessage ='Thia Email does not exist!';
        //        break;
        //       case 'INVALID_PASSWORD':
        //         errormessage ='This Password is Incorrect.';
        //         break; 
        //      }
        //      //return throwError(errormessage);
        //         return of(new AuthActions.AuthenticateFail(errormessage));                 //for creating new observable(of())
            }                  
     ));

     })
    )); 

    @Effect()   
    authLogin = createEffect(
        () => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),  //can also add multiple actions , if we want to run same code for multiple Actions
        switchMap((authData : AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
            { 
                email: authData.Payload.email,
                password: authData.Payload.password,
                returnSecureToken:true
                }).pipe(   ///Adding the operator on inner Observable
                  tap(resData => {
                    this.authService.SetLogoutTimer(+resData.expiresIn * 1000);
                  }), 
                    map(                          // //we have to add non-error observable in map //map automatically wraps what we are returning into an observable //no need to use of()
                        resData=>{
                        //    const expirationDate= new Date(new Date().getTime()+ +resData.expiresIn * 1000);
                        //     return new AuthActions.AuthenticateSuccess({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate});  // return of(new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate}));
                        return HandleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken );
                    }                     
                    )
                 ,catchError(errorRes => {  
                     return handleError(errorRes);                           //we have to add non-error observable in catchError
                //     let errormessage ='An unknown error occurred!';  

                //     if(!errorRes.error || !errorRes.error.error){
                //           return of(new AuthActions.AuthenticateFail(errormessage));    //return throwError(errormessage);
                          
                //     }
                  
                //    switch(errorRes.error.error.message){
                //      case 'EMAIL_EXISTS':
                //        errormessage ='this email already exists!!!';
                //        break;
                //      case 'EMAIL_NOT_FOUND':
                //        errormessage ='Thia Email does not exist!';
                //        break;
                //       case 'INVALID_PASSWORD':
                //         errormessage ='This Password is Incorrect.';
                //         break; 
                //      }
                //      //return throwError(errormessage);
                //         return of(new AuthActions.AuthenticateFail(errormessage));                 //for creating new observable(of())
                    }                  
                ));
        })   //creates new observable by taking another observables data
        )
        );

authRedirect = createEffect(() => this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS ),  //, AuthActions.LOGOUT
 tap((authSuccessAction : AuthActions.AuthenticateSuccess) =>{
   if(authSuccessAction.payload.redirect){
          this.router.navigate(['/']);
   }
      })
      ),
      {dispatch :false }   // when not dispatching any action
      );


autoLogin = createEffect(() => this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
map(() => {
     const userData : {
        email :string;
        id: string;
        _token : string;
        _tokenExpirationDate: string;
      }  =  JSON.parse(localStorage.getItem('userData')); //To convert it into javascript
       if(!userData){
         return { type: 'DUMMY'};
       }

      const loadedUser = new User(userData.email, userData.id, userData._token , new Date(userData._tokenExpirationDate));
      
      if(loadedUser.token){
       // this.user.next(loadedUser);
       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //already in millisecond
       this.authService.SetLogoutTimer(expirationDuration);
       return new AuthActions.AuthenticateSuccess({email: loadedUser.email ,userId: loadedUser.id, token :loadedUser.token , expirationDate: new Date(userData._tokenExpirationDate) ,redirect: false});
       //// const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //already in millisecond
        //console.log(expirationDuration);
        ////this.autoLogout(expirationDuration); //we have to calculate the remaining time and then pass it
      }
      return { type: 'DUMMY'};
})));      

authLogout = createEffect(() => this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(()=>{
  this.authService.ClearLogoutTimer();
  localStorage.removeItem('userData');
  this.router.navigate(['/auth']);
})),  {dispatch: false}

);

    constructor(private actions$ : Actions, private http: HttpClient, private router : Router, private authService: AuthService)  //convention is to write it with dollar at the end in action in Effects
    {}  
}