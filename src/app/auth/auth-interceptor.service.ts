import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer';
 
//Interceptor to add token to all outgoing request
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>){}

    intercept(req :HttpRequest<any>, next: HttpHandler){ //takes 2 arguments
       return this.store.select('auth').pipe(take(1),
       map(authState => {
          return authState.user;
       }), exhaustMap(user =>{ // return this.authService.user.pipe(take(1), exhaustMap(user =>{
       //'auth' is from Appstate
        if(!user){
         return next.handle(req);
        }
        const modifiedreq = req.clone({params:new HttpParams().set('auth', user.token)}); //firebase only takes queryparams
        return next.handle(modifiedreq);
    })
        );
}
}