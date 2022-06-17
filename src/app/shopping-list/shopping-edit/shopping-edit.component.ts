import { Component, ElementRef, EventEmitter, OnDestroy, OnInit ,Output,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../Shared/Ingredient';
import { ShoppingListService } from '../shopping-list.service'
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromAuth from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm : NgForm;
   //@ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subscription:Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingredient;
  
  constructor(private shoppingservice : ShoppingListService, private store : Store<fromAuth.AppState>) { }  //Store<{shoppingList : {ingredients : Ingredient[] } }> //Store<fromShoppingList.AppState>)

  ngOnInit(): void {

    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
     if(stateData.editedIngredientIndex > -1) {
      this.editMode=true;
      this.editedItem = stateData.editedIngredient;
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });

     } else {
       this.editMode =false;
     }

    });

  //   this.subscription = this.shoppingservice.startedEditing.subscribe(
  //     (index:number) => {
  //       this.editedItemIndex = index;
  //       this.editMode=true;
  //       this.editedItem = this.shoppingservice.getIngredient(index);
  //       this.slForm.setValue({
  //         name: this.editedItem.name,
  //         amount: this.editedItem.amount
  //       })
  //     }
  //   );
   }

  onSubmit(form : NgForm){
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    //const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      //this.shoppingservice.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    }
    else
    {
      //this.shoppingservice.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient( newIngredient) ); //creating an object of the class  in Actions
    }
    this.editMode=false;
    
    //this.ingredientAdded.emit(newIngredient);
  }
  onDelete()
  {
    //this.shoppingservice.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient( this.editedItemIndex));
    this.onClear();
  }
   onClear(){
     this.slForm.reset();
     this.editMode=false;
     this.store.dispatch(new ShoppingListActions.StopEdit());
   }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
