import { Component, OnInit , Output , EventEmitter, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
 // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[];
  subscription : Subscription;
  
  constructor(private recipeservice : RecipeService, private router:Router,private route:ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    //  this.subscription = this.recipeservice.recipesChanged.subscribe(
      this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe(
      (recipes: Recipe[]) => {
           this.recipes = recipes;
      }
    );
   // this.recipes = this.recipeservice.getRecipe();
  }

// onRecipeSelected(recipe:Recipe){
//    this.recipeWasSelected.emit(recipe);
// }
onNewRecipe()
{
   this.router.navigate(['new'],{relativeTo:this.route}) //we are already on the recipe list
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
