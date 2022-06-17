//import { Action } from "@ngrx/store";
import { Ingredient } from "../../Shared/Ingredient";
//import { ADD_INGREDIENT } from "./shopping-list.actions";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State{
  ingredients : Ingredient[];
  editedIngredient :Ingredient;
  editedIngredientIndex : number;
}

// export interface AppState{       //it's neccessary, since we will have a lot of states
//   shoppingList: State;
// }

//we are creating an object , this is not a type definition, that's why we have to give values
const initialState : State= {
  //JavascriptObject
  ingredients :[
    new Ingredient('Apple',5),
    new Ingredient('Banana',10)
  ],
  editedIngredient :null, //  Ingredient
  editedIngredientIndex : -1 //number
};

export function ShoppingListReducer(state: State = initialState ,action :ShoppingListActions.ShoppingListActions )  //giving the initial value //action: Action
{  //it will execute this function whenever a new action is Recieved
    //addingLogic
    //never touch the existing state, it's immutable
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT :
            return {...state,     //will return a new state, it's synchronous
                ingredients : [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS :
            return {...state,                     //always return state
                ingredients : [...state.ingredients, ...action.payload]
           };

        case ShoppingListActions.UPDATE_INGREDIENT:
          const ingredient = state.ingredients[state.editedIngredientIndex];
          const updatedIngredient = {
            ...ingredient , ...action.payload
          };

          const updatedIngredients =[...state.ingredients];
          updatedIngredients[state.editedIngredientIndex] = updatedIngredient; 
          return { ...state,
          ingredients : updatedIngredients,
          editedIngredientIndex : -1,
          editedIngredient : null
         };
        
        case ShoppingListActions.DELETE_INGREDIENT:


          return {...state,
          ingredients: state.ingredients.filter((ig, igIndex) => {
               return igIndex !== state.editedIngredientIndex;
          }),
          editedIngredientIndex : -1,
          editedIngredient : null 
        };     //filter gives us a copy of the array, it keeps value based on true/false
        
        case ShoppingListActions.START_EDIT:
         return {
           ...state, 
           editedIngredientIndex : action.payload,
           editedIngredient : {...state.ingredients[action.payload] }  //objects in Array are reference type that's why we have to copy
         };

        case ShoppingListActions.STOP_EDIT:  
        return {
                ...state,
                editedIngredient :null,
                editedIngredientIndex: -1
        };
        default :
          return state;
    }

}