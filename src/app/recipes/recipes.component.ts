import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './Recipe';
import { RecipeService } from './recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
 //selectedRecipe :Recipe;
  //constructor(private recipeservice: RecipeService) { }
  constructor(private httpclient : HttpClient){}

  ngOnInit(): void {
    // this.recipeservice.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe
    // })
  }

}
