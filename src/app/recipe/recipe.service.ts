import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

//recipeSelected=new EventEmitter<Recipe>();
recipeChanged=new Subject<Recipe[]>();
/*private recipes:Recipe[]=[
new Recipe('A Test Recipe','A simply test',
'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
[new Ingredient('meat',2),
new Ingredient('frenc frice',5)
]),

new Recipe('Big Fat Burger','What else You need to say',
'https://assets.website-files.com/5dc84df8c19d438b14053c00/5deb59a9e942e72eff3acad1_Mexi%2BVeg-p-500.jpeg',
[new Ingredient('buns',2),
new Ingredient('moglai',5)
])
];*/

private recipes:Recipe[]=[];

constructor(private slService:ShoppingListService){}
setRecipe(recipes:Recipe[]){
	this.recipes=recipes;
	this.recipeChanged.next(this.recipes.slice());
}
getRecipes()
{
	return this.recipes.slice();//here slice method used as array where the array element->
	//should keep sa befopre where it was there.
	//ex:-a[5]=[a,b,c,d,e]after use slice it keep [a,b,c,d,e]
}
getRecipe(index:number)
{
	return this.recipes[index];
}

addIngredientsToshoppingList(ingredients:Ingredient[]){ //use on recipe-detail.component.ts
	
	this.slService.addIngredients(ingredients);  //call from shoppinglistservice
}

addRecipe(recipe:Recipe){
	this.recipes.push(recipe);
	this.recipeChanged.next(this.recipes.slice());
}

updateRecipe(index:number,newRecipe:Recipe){
	this.recipes[index]=newRecipe;
	this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
	this.recipes.splice(index,1);
	this.recipeChanged.next(this.recipes.slice());
}
}