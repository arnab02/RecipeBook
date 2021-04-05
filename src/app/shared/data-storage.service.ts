import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import {Recipe} from '../recipe/recipe.model';
import {map,tap, take, exhaustMap} from 'rxjs/operators'


@Injectable({providedIn:'root'})//This decrator accepts meta data object for services
export class DataStorage{
    constructor(private http:HttpClient,private recipeService:RecipeService,){}

    storeRecipe(){
        const recipes=this.recipeService.getRecipes();
        this.http.put('https://angular-recipebook-2f31f.firebaseio.com/recipe.json',recipes)
        .subscribe(
            responseData=>{
                console.log(responseData);
            }
        )
    }

    Fetchrecipe(){
        return this.http.get<Recipe[]>('https://angular-recipebook-2f31f.firebaseio.com/recipe.json')
        .pipe(
         map(recipes=>{
            return recipes.map(recipe=>{
                return {
                    ...recipe, ingredients:recipe.ingredients?recipe.ingredients:[]
                }
            })
        }),
        tap(recipes=>{
            this.recipeService.setRecipe(recipes)
        })
        ) 
    }

}