import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { HeaderComponent } from './header/header.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterwayHighlightDirective } from './basic-highlight/betterway-highlight.directive';
import { UnlessDirective } from './basic-highlight/unless.directive';
//import { DropdownDirective } from './Shared/dropdown.directive';
//import { ShoppingListService } from './shopping-list/shopping-list.service';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RecipeService } from './recipes/recipe.service';
import { ShortenPipe } from './shorten.pipe';
//import { AuthComponent } from './auth/auth.component';
//import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
//import { AuthInterceptorService } from './auth/auth-interceptor.service';
//import { AlertComponent } from './Shared/alert/alert.component';
//import { PlaceholderDirective } from './Shared/placeholder/placeholder.directive';
//import { RecipesModule } from './recipes/recipes.module';
//import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './Shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
//import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';
//import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
//import { AuthModule } from './auth/auth.module';
import { StoreRouterConnectingModule} from '@ngrx/router-store';
import { RecipeEffects } from './recipes/store/recipe.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    HeaderComponent,
    BasicHighlightDirective,
    BetterwayHighlightDirective,
    UnlessDirective,
    ShortenPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    //ReactiveFormsModule,
    //FormsModule,
    HttpClientModule,
   // RecipesModule, (remove this from here when implementing Lazy Loading)
   // ShoppingListModule,  (remove this from here when implementing Lazy Loading)
    SharedModule, 
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer), //forRoot({shoppingList : ShoppingListReducer , auth : authReducer})
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule
    //AuthModule,  (remove this from here when implementing Lazy Loading)
  ],
  //providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
