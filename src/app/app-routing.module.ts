import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { AuthGuard } from './auth/auth.guard';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeResolverService } from './recipes/recipe-resolver.service';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'' , redirectTo:'/recipes',pathMatch:'full' }, //this is for when we start our application
  // { path:'recipes', component: RecipesComponent, canActivate:[AuthGuard], children: [
  //   {path:'' , component: RecipeStartComponent},
  //   {path:'new', component:RecipeEditComponent}, //this should come before the dynamic "id" for it to work
  //   {path:':id', component:RecipeDetailComponent, resolve :[RecipeResolverService]},
  //   {path:':id/edit', component:RecipeEditComponent , resolve: [RecipeResolverService]}
  // ]},
  {path:'recipes' , loadChildren : ()=> import('./recipes/recipes.module').then(x=>x.RecipesModule)},
  
   {path:'shopping-list', loadChildren : ()=> import('./shopping-list/shopping-list.module').then(x=>x.ShoppingListModule)},
   {path:'auth' , loadChildren : ()=> import('./auth/auth.module').then(x=>x.AuthModule)}
  // {path:'auth', component:AuthComponent}
];

@NgModule({
  //'forRoot'- only used once
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
