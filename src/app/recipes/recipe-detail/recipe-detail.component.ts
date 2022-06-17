import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 //@Input() recipe:Recipe;
 recipe:Recipe;
 id:number;
  constructor(private recipeservice :RecipeService, private route: ActivatedRoute, private router:Router, private store : Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }),
    switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.id;
      } );
    })
    ).subscribe(recipe => {
      this.recipe = recipe;
    })
    // this.route.params.subscribe(
    //   (params:Params) =>{
    //    this.id= +params['id'];
    //   // this.recipe=this.recipeservice.getrecipe(this.id);
    //   this.store.select('recipes').pipe(
    //     map(
    //       recipeState => {
    //         return recipeState.recipes.find((recipe, index) =>{
    //             return index === this.id;
    //         } );
    //       }
    //     )
    //   ).subscribe(recipe => {
    //     this.recipe = recipe;
    //   })
    //   }
    // );
  }

  onAddToShoppingList(){
     //this.recipeservice.addIngredientsToShoppingList(this.recipe.ingredients);
     this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo:this.route});
    this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    //this.recipeservice.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
    this.router.navigate(['/recipes']);
  }
}
