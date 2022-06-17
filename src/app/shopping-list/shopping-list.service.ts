import { Ingredient } from '../Shared/Ingredient';
import {EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService{
//ingredientsChanged = new EventEmitter<Ingredient[]>();
ingredientsChanged = new Subject<Ingredient[]>();
startedEditing= new Subject<number>();

private ingredients :Ingredient[] =[
  new Ingredient('Apple',5),
  new Ingredient('Banana',10)
];

getIngredients(){
    return this.ingredients.slice();
}

getIngredient(index:number)
{
  return this.ingredients[index];
}

addIngredient(ingredient :Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    //this.ingredientsChanged.emit(this.ingredients.slice());

}

addIngredientsFromRecipeService(ingredients:Ingredient[]){
  // for(let i of ingredients){   Bad practice as it will emit a lot of events
  //   this.addIngredient(i);
  // }
  this.ingredients.push(...ingredients);   //we can use spread operator which is a good practice
  this.ingredientsChanged.next(this.ingredients.slice());
  //this.ingredientsChanged.emit(this.ingredients.slice());
}

updateIngredient(index: number, newIngredient :Ingredient)
{
  this.ingredients[index]= newIngredient;
  this.ingredientsChanged.next(this.ingredients.slice());
}

deleteIngredient(index: number)
{
  this.ingredients.splice(index, 1);
  this.ingredientsChanged.next(this.ingredients.slice());
}

}