import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../Shared/Ingredient';
import { ShoppingListService } from './shopping-list.service';
//import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations : [
    trigger('list1', [
      state('in', style({
        opacity:1,                  //for initial state
        transform:'translateX(0)'
      })),
      transition('void => *', [      //transition from no state to any State
        style({
              opacity :0,
              transform :'translateX(-100px)'
        }),        
      animate(300)
    ]),
    transition('* => void', [
    animate(300, style({
      transform: 'translateX(100px)',
      opacity:0
    }))
  ])
  ]),
  trigger('list2', [
    state('in', style({
      opacity:1,                  //for initial state
      transform:'translateX(0)'
    })),
    transition('void => *', [
      animate(1000, keyframes([   //keyfame to control which state should take how much time within that 1000ms(1 sec)
         style({
           transform: 'translateX(-100px)',
           opacity : 0,
           offset :0
         }),
         style({
          transform: 'translateX(-50px)',
          opacity : 0.5,
          offset :0.3    //For 30% of total 1sec
        }),
        style({
          transform: 'translateX(-20px)',
          opacity : 1,
          offset :0.8
        }), 
        style({
          transform: 'translateX(0px)',
          opacity : 1,
          offset :1
        })
      ]))
    ]),
  transition('* => void', [
  group([
    animate(300, style({
      color :'red'
     })),
     animate(800, style({
       transform: 'translateX(100px)',
       opacity:0
     }))
  ])                      //To have multiple animate at once, we use group 
  // animate(300, style({
  //  color :'red'
  // })),
  // animate(100, style({
  //   transform: 'translateX(100px)',
  //   opacity:0
  // }))
])
]),
]
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  // ingredients:Ingredient[];
  ingredients = new Observable<{ ingredients: Ingredient[]; }>();
   private igChanges: Subscription;
  constructor(private shoppinglistservice : ShoppingListService,
    private store : Store<fromApp.AppState> //Store<{shoppingList : {ingredients : Ingredient[] } }>  //Store<fromShoppingList.AppState>
    ) { }

  ngOnInit(): void {
    //select method helps in selecting the slice of the state
    this.ingredients =  this.store.select('shoppingList');      //it is an Observable
    //this.store.select('shoppingList').subscribe();   we can also manually subscribe instead of using asynchronous
    // this.ingredients = this.shoppinglistservice.getIngredients();
    // this.igChanges = this.shoppinglistservice.ingredientsChanged.subscribe(
    //   (ingredient : Ingredient[]) => {
    //     this.ingredients = ingredient;
    //   }
    // );
  }
  
  onEditItem(index:number)
  {
    //this.shoppinglistservice.startedEditing.next(index);
    this.store.dispatch( new ShoppingListActions.StartEdit(index));
  }
  ngOnDestroy(){
    //this.igChanges.unsubscribe();
  }

}
