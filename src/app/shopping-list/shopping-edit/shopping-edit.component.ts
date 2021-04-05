import { Component, OnInit,ElementRef,ViewChild, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subsCription:Subscription;
  editMode=false;
  editItemIndex:number;
  editedItem:Ingredient;
  @ViewChild('f') slForm:NgForm;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subsCription=this.slService.ingredientEdit
    .subscribe((index:number)=>{
      this.editItemIndex=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    });
  }

 // @ViewChild('nameInput') nameInputref:ElementRef;
 // @ViewChild('amountInput') amountInputref:ElementRef;


onAddItem(form:NgForm)
{
  const value=form.value;
	//const ingName=this.nameInputref.nativeElement.value;
	//const ingAmount=this.amountInputref.nativeElement.value;
  const newingredient=new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.slService.updateIngredient(this.editItemIndex,newingredient)
  }
  else{
    this.slService.addIngredient(newingredient);//call from shopping-list service
  }
  this.editMode=false;
  form.reset();
}


onClear(){
  this.slForm.reset();
  this.editMode=false;
}

onDelete(){
  this.slService.deleteIngredient(this.editItemIndex);
 this.onClear(); 
}
ngOnDestroy(): void{
  this.subsCription.unsubscribe();
}
}
