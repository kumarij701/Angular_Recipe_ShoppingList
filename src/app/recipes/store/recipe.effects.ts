import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, Effect, EffectsModule, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import * as RecipesActions from './recipe.actions'; 
import { Recipe } from '../Recipe';
import { Injectable } from '@angular/core';
import { createEffects } from '@ngrx/effects/src/effects_module';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeEffects {
    
    @Effect()
    fetchRecipes = createEffect(() => 
    this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
     switchMap(() =>  { 
         return this.http.get<Recipe[]>('https://ng-course-recipe-book-321dc-default-rtdb.firebaseio.com/'+'recipes.json',
     ); }),
     map(
        recipes =>{   //Both are Different map
            return recipes.map( recipe =>{  //we have to do this to prevent errors if ingredient is empty while creating the Recipe
           return{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
               }
           );
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    ));

    //Effect
storeRecipes = createEffect(() => this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),                      //allows you to merge a value from another Observable into this observable stream here 
    switchMap(([actionData, recipesState]) => {                    //it's an array //'actionData is from ofType' and 'recipesState is from withLatestFrom()'
         return this.http.put('https://ng-course-recipe-book-321dc-default-rtdb.firebaseio.com/'+'recipes.json', recipesState.recipes);
        // .subscribe(
        //     response =>{
        //         console.log(response);
            //}
        //);
    })), 
    {dispatch: false});


       constructor(private actions$ :Actions, private http:HttpClient, private store :Store<fromApp.AppState>){}
}