import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authservice : AuthService, private router :Router, private store : Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> 
    {
       return this.store.select('auth').pipe(take(1),
       map(authState =>{
           return authState.user;
       }), map(user =>{  //to unsubscribe after taking the value once //return this.authservice.user.pipe(take(1), map(user =>{ 
           const isAuth = !!user;
           if(isAuth)
           {
               return true;
           }

           return this.router.createUrlTree(['/auth']);
        }));
    //   tap(isAuth =>{
    //         if(!isAuth)
    //         {
    //             this.router.navigate(['/auth']);
    //         }
    //    }))
    }
}