import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  
id:number;
editmode=false;
recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,
               private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    (param:Params)=>{
      this.id=+param['id'];
      this.editmode=param['id']!=null;
      console.log(this.editmode);
      this.initform();
    }
    )
  }
   

  private initform(){
    let recipeName='';
    let imagePath='';
    let Description='';
    let recipeIngredient=new FormArray([]);
    if(this.editmode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      imagePath=recipe.imagepath;
      Description=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required), 
      'imagepath':new FormControl(imagePath,Validators.required),
      'description':new FormControl(Description,Validators.required),
      'ingredients':recipeIngredient
    });
  }

  onSubmit(){
   
    if(this.editmode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
      else{
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.onCanceal();
  }

  onCanceal(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,
        [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
