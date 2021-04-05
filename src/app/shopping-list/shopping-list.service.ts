//import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService{	
  ingredientsChanged =new Subject<Ingredient[]>();
  ingredientEdit=new Subject<number>();
  private ingredients:Ingredient[]=[
  new Ingredient('apple',5),
  new Ingredient('Tomato',10)
  ];

  getIngredients(){
  return this.ingredients.slice();/*slice method return the selected elements in an array
  here slice() there are no argument in the parnthesis so arrray should be retun as it 
  before what was it*/
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }
  
  addIngredient(ingredient:Ingredient)//use on shopping-edit.component.ts
  {
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){//this function use on recipe.service.ts
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}