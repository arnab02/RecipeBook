import { NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { RecipeResolver } from './recipe/recipe-resolver.service';
import { AuthGuard } from './auth/auth.guard';

const appRoutes:Routes=[
    {
       path:'',redirectTo:'/recipes',pathMatch:'full'
    },
    
{
    path:'recipes', component:RecipeComponent,canActivate:[AuthGuard],
    children:[
        {
            path:'',component:RecipeStartComponent
        },
        {
            path:'new',component:RecipeEditComponent
        },
        {
            path:':id',component:RecipeDetailComponent,resolve:[RecipeResolver]
        },
        {
            path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolver]
        }
    ]
},
{
    path:'shopping',component:ShoppingListComponent
},
{
    path:'auth',component:AuthComponent
}

];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class appRoutingModule{

}