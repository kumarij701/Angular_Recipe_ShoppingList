import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LEADING_TRIVIA_CHARS } from "@angular/compiler/src/render3/view/template";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.action';

// export interface AuthResponseData{
//   idToken : string,
//   email: string,
//   refreshToken: string,
//   expiresIn: string,
//   localId: string,
//   registered? : boolean,
//   displayName? : string,
// }

@Injectable({providedIn: 'root'})
export class AuthService{
  private tokenExpirationTimer:any;
//user = new Subject<User>();
 //user = new BehaviorSubject<User>(null); //Initializing it with null

    constructor(private http: HttpClient, private router :Router, private store:Store<fromApp.AppState>){}

    // SignUp(email:string, password:string)
    // {
    //   //AIzaSyBvTyh6IY7Zw7RuwKDmZSdj71jOHJb9Hs8
    //    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
    //     { email:email,
    //     password:password,
    //     returnSecureToken:true
    //     }).pipe(catchError(this.handleError), tap(resData=>{
    //       this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    //     }));
    // }
     
    // autoLogin(){
    //   const userData : {
    //     email :string;
    //     id: string;
    //     _token : string;
    //     _tokenExpirationDate: string;
    //   }  =  JSON.parse(localStorage.getItem('userData')); //To convert it into javascript
    //    if(!userData){
    //      return;
    //    }

    //   const loadedUser = new User(userData.email, userData.id, userData._token , new Date(userData._tokenExpirationDate));
      
    //   if(loadedUser.token){
    //    // this.user.next(loadedUser);
    //    this.store.dispatch(new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token :loadedUser.token , expirationDate: new Date(userData._tokenExpirationDate)}));
    //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //already in millisecond
    //     //console.log(expirationDuration);
    //     this.autoLogout(expirationDuration); //we have to calculate the remaining time and then pass it
    //   }
    // }


    
    // logout(){
    //   //this.user.next(null);
    //   //this.store.dispatch(new AuthActions.Logout());
    //   // this.router.navigate(['/auth']);
    //   localStorage.removeItem('userData');

    //   if(this.tokenExpirationTimer){
    //     clearTimeout(this.tokenExpirationTimer);
    //   }
    //   this.tokenExpirationTimer = null;
    // }


    // login(email:string, password:string)
    // {
    //   //AIzaSyBvTyh6IY7Zw7RuwKDmZSdj71jOHJb9Hs8
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
    //     { email:email,
    //         password:password,
    //         returnSecureToken:true
    //         }).pipe(catchError(this.handleError), tap(resData=>{
    //           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    //         }));
    // }


    // Can also create an action for this autoLogout

    SetLogoutTimer(expirationDuration :number){   //autoLogout(expirationDuration :number){
      console.log(expirationDuration);           
     this.tokenExpirationTimer =  setTimeout(()=>{ 
       //this.logout();
       this.store.dispatch(new AuthActions.Logout());
      }, expirationDuration)
    }

    ClearLogoutTimer()
    {
      if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null; 
      }
    }

// private handleAuthentication(email:string, userId:string, token:string, expiresIn:number)
// {
//   const expirationDate= new Date(new Date().getTime()+ +expiresIn * 1000); //(current time+ +resData.expiresIn('+' sign because we have to convert it to number), * 1000(multiplying it by 1000 to convert it in millisecond))
//   const user = new User(email, userId, token, expirationDate);

//   //this.user.next(user);
//   this.store.dispatch(new AuthActions.AuthenticateSuccess({email:email, userId: userId, token :token , expirationDate: new Date(expirationDate)}));
//   localStorage.setItem('userData' , JSON.stringify(user)); //javascript object converted to text
//   this.autoLogout(expiresIn * 1000);
  
// }    

// private handleError(errorRes : HttpErrorResponse)
// {
//   let errormessage ='An unknown error occurred!';  

//   if(!errorRes.error || !errorRes.error.error){
//         return throwError(errormessage);
        
//   }

//  switch(errorRes.error.error.message){
//    case 'EMAIL_EXISTS':
//      errormessage ='this email already exists!!!';
//      break;
//    case 'EMAIL_NOT_FOUND':
//      errormessage ='Thia Email does not exist!';
//      break;
//     case 'INVALID_PASSWORD':
//       errormessage ='This Password is Incorrect.';
//       break; 
//    }
//    return throwError(errormessage);
//   }

}