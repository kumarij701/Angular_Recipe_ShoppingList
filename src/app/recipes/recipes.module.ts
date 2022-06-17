import { NgModule } from "@angular/core";
//import { CommonModule } from "@angular/common";
import {  ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../Shared/shared.module";
//import { CommonModule } from "@angular/common";

//FEATURE MODULE

@NgModule({
    declarations:[
       RecipesComponent,
       RecipeListComponent,
       RecipeDetailComponent,
       RecipeItemComponent,
       RecipeStartComponent,
       RecipeEditComponent
    ],
    imports:[RouterModule ,  ReactiveFormsModule, RecipesRoutingModule, SharedModule] //,
    //'CommonModule' - To handle *ngIf/*ngFor
    //we can use these components by importing the RecipesModule
    // exports:[
    //     RecipesComponent,
    //     RecipeListComponent,
    //     RecipeDetailComponent,
    //     RecipeItemComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent
    // ]
})

export class RecipesModule{

}