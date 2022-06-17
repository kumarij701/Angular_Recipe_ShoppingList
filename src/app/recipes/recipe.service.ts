import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './Recipe';
import { Ingredient } from '../Shared/Ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../store/app.reducer';

//WE CAN DELETE THIS recipeService


@Injectable()
export class RecipeService{
   //recipeSelected = new EventEmitter<Recipe>();
   //recipeSelected = new Subject<Recipe>();
   recipesChanged = new Subject<Recipe[]>();
   
   constructor(private shoppinglistservice : ShoppingListService, private store :Store<fromAuth.AppState>){} //Store<{shoppingList : {ingredients : Ingredient[] } }> //fromShoppingList.AppState>

  //  private recipes : Recipe[] = [new Recipe('Pasta', 'This is a picture of pasta',
  //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE7TAwVdnyr5547HrgAZkIUxzPKJeTg7-vvQ&usqp=CAU',[ new Ingredient('pasta', 1), new Ingredient('sauce', 10)]),
  //  new Recipe('Popsicle', 'This is a picture of icecream',
  //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmh65b_V-NHh4Yd8vRIiZW5HlDhxVSPX1LEA&usqp=CAU',[new Ingredient('stick', 5), new Ingredient('ice', 2)])
  // ];

  private recipes: Recipe[] = [];

  getRecipe(){
      //this way we only send the copy of recipe array
      return this.recipes.slice();
  }

  getrecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients :Ingredient[]){
    //this.shoppinglistservice.addIngredientsFromRecipeService(ingredients);
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe)
  {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());  //Sending a new copies of recipes
  }
 
  updateRecipe(index:number, newRecipe: Recipe)
  {
    this.recipes[index]= newRecipe;
    this.recipesChanged.next(this.recipes.slice()); 
  }
  deleteRecipe(index : number)
  {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice()); 
  }
  setRecipe(recipes : Recipe[])
  {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); 
  }
}