import { Component, Input, OnInit , Output , EventEmitter } from '@angular/core';
import { Recipe } from '../../Recipe';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Input() index:number;
  //@Output() recipeSelected =new EventEmitter<void>();
  constructor( private recipeservice : RecipeService) { }

  ngOnInit(): void {
  }
  // onSelected(){
  //   this.recipeservice.recipeSelected.emit(this.recipe);
  // }

}
