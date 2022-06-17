import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit , OnDestroy {
 id:number;
 editMode=false;
recipeForm : FormGroup;

private StoreSub : Subscription;

constructor(private route:ActivatedRoute, private recipeservice :RecipeService, private router :Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
       this.id= +params['id'];
       this.editMode = params['id'] != null;
       console.log(this.editMode);
       this.initForm();
      }
    );
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onDeleteAllIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  //to initialize our form
  private initForm()
  {
    let recipename= '';
    let recipeurl='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      //const recipe = this.recipeservice.getrecipe(this.id);
      this.StoreSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
      recipename= recipe.name;
      recipeurl= recipe.imagePath;
      recipeDescription= recipe.description;
      if(recipe['ingredients'])
      {
        for(let ingre of recipe.ingredients)
        {
           recipeIngredients.push(
             new FormGroup({
               'name': new FormControl(ingre.name, Validators.required),
               'amount': new FormControl(ingre.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
             })
           );
        }
    }
  })
  }
  
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagePath' :new FormControl(recipeurl, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }


onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name' : new FormControl(null, Validators.required ),
      'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  );
}

get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}

  onSubmit()
  {
    //console.log(this.recipeForm);
    // const newRecipe= new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients'])
    if(this.editMode)
    {
      //this.recipeservice.updateRecipe(this.id, this.recipeForm.value);//newRecipe);
      this.store.dispatch(new RecipesActions.UpdateRecipes({index:this.id, newRecipe:this.recipeForm.value}));
    }
    else{
     // this.recipeservice.addRecipe(this.recipeForm.value);
     this.store.dispatch(new RecipesActions.AddRecipes(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel()
  {
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  ngOnDestroy(){
    if(this.StoreSub)
    {
      this.StoreSub.unsubscribe();
    }
  }

}
