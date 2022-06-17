import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/Recipe";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';

//WE CAN DELETE THIS ENTIRE data-storage FILE AS WE DON'T NEED IT NOW.

@Injectable({providedIn: 'root'})
export class DataStorageService{

constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store : Store<fromApp.AppState>) {}

storeRecipes(){
    const recipes = this.recipeService.getRecipe(); 

    //request will only get send if we subscribe to it. subscribe anywhere
    return this.http.put('https://ng-course-recipe-book-321dc-default-rtdb.firebaseio.com/'+'recipes.json',recipes).subscribe(
        response =>{
            console.log(response);
        }
    );
}

fetchRecipe(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-321dc-default-rtdb.firebaseio.com/'+'recipes.json',
        )
    .pipe( 
    map(
         recipes =>{   //Both are Different map
             return recipes.map( recipe =>{  //we have to do this to prevent errors if ingredient is empty while creating the Recipe
            return{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                }
            );
         }), tap(recipes =>{
            //this.recipeService.setRecipe(recipes);
            this.store.dispatch(new RecipesAction.SetRecipes(recipes));
         })
         );
    // return this.http.get<Recipe[]>('https://ng-course-recipe-book-321dc-default-rtdb.firebaseio.com/'+'recipes.json')
    // .pipe(
    //     map(
    //         recipes =>{   //Both are Different map
    //             return recipes.map( recipe =>{  //we have to do this to prevent errors if ingredient is empty while creating the Recipe
    //             return{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
    //         }
    //     );
    //  }), tap(recipes =>{
    //     this.recipeService.setRecipe(recipes);
    //  })
    // ).subscribe(
    //     recipes=>{
    //        // console.log(recipes);
    //        this.recipeService.setRecipe(recipes);
    //     }
    // );
    //)
}

}