import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../Shared/data-storage.service";
import { Recipe } from "./Recipe";
import { RecipeService } from "./recipe.service";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeAction from '../recipes/store/recipe.actions'; 
import { Store } from '@ngrx/store';
import { Actions , ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from "rxjs";

@Injectable({providedIn: 'root'})
export  class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private datastorageservice : DataStorageService, private recipeservice : RecipeService , private store : Store<fromApp.AppState>, private actions$ :Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        //const recipes = this.recipeservice.getRecipe();
    return this.store.select('recipes').pipe( take(1) ,
        map(recipeState => {
            return recipeState.recipes;
        }),
        switchMap(recipes => {
          
        if(recipes.length === 0)
        {
           //return this.datastorageservice.fetchRecipe();
         this.store.dispatch(new RecipeAction.FetchRecipes());
         return this.actions$.pipe(ofType(RecipeAction.SET_RECIPES), take(1));
        }
        else{
            return of(recipes);
        }
        })
        );
        
        //return recipes;

        
        //resolve will subscribe to it automatically once data is there
    }

}