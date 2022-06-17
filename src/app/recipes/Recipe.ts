import { Ingredient } from "../Shared/Ingredient";

export class Recipe{
  public name: string;
  public description :string;
  public imagePath:string;
  public ingredients : Ingredient[];
   
  constructor(name:string, desc:string, iPath:string, ingredients :Ingredient[]){
    this.name=name;
    this.description=desc;
    this.imagePath=iPath;
    this.ingredients = ingredients;
  }
}