/*http://localhost:4200/recipes/2- int the url if I write this then it should return the error 
so how to solve this ? recipe resolver is the solution */



import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorage,private recipeService:RecipeService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipe=this.recipeService.getRecipes()
        
            if(recipe.length==0){
                return this.dataStorageService.Fetchrecipe()
            }
            else{
                return recipe
            }
        
        

    }

}