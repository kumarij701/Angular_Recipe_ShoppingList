import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

export const LOGIN_START ='[Auth] Login Start';  //for when we start sending our request
export const AUTHENTICATE_SUCCESS = '[Auth] Login';  //export const LOGIN = 'LOGIN';//These identifiers should be unique //To avoid clashes , we can use prefixing ,incase of bigger application
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL ='[Auth] Login Fail';
export const SIGNUP_START ='[Auth] SignUp Start';
//export const SIGNUP ='[Auth] SignUp';
//export const SIGNUP_FAIL ='[Auth] Signup Fail';
export const CLEAR_ERROR ='[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload :{email:string; userId: string; token : string; expirationDate: Date; redirect: boolean; }){} //payload Type is an object
}

export class Logout implements Action{
    readonly type = LOGOUT;

}

export class LoginStart implements Action{
    readonly type = LOGIN_START;
    constructor(public Payload : {email: string; password :string}){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string){}
}

export class SignupStart implements Action{
   readonly type =  SIGNUP_START;
   constructor(public Payload : {email: string; password :string}){}
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN;

   // constructor(public payload: {}){}
}

export type AuthActions = AuthenticateSuccess | Logout 
| LoginStart | AuthenticateFail | SignupStart | ClearError 
| AutoLogin;

