import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../Shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeAction from '../recipes/store/recipe.actions'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
 collapsed = true;
 isAuthenticated =false;
private sub: Subscription;

  // @Output() featureSelected = new EventEmitter<string>();
  // constructor() { }

  // ngOnInit(): void {
  // }
  
  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  constructor(private datastorageservice: DataStorageService, private authService :AuthService, private store: Store<fromApp.AppState>) { }

   ngOnInit() {
      this.sub = this.store.select('auth').pipe(map(authState =>{
         return authState.user;
      })).subscribe(user =>{  //this.sub = this.authService.user.subscribe(user =>{
       this.isAuthenticated = !!user; //!user ? false : true ; 
      });
   }

   onLogOut(){
      //this.authService.logout();
      this.store.dispatch(new AuthActions.Logout());
   }

   onSaveData(){
      //this.datastorageservice.storeRecipes();
      this.store.dispatch(new RecipeAction.StoreRecipes());
   }

   onManageData(){
      //this.datastorageservice.fetchRecipe().subscribe();
       this.store.dispatch(new RecipeAction.FetchRecipes());
   }
   
   ngOnDestroy(){
     this.sub.unsubscribe();
   }

}
