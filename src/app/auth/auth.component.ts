import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    constructor(private authService:AuthService,private router:Router){}
    isLoginMode=true;
    isLoading=false
    error:string=null
    onSwitch()
    {
        this.isLoginMode=!this.isLoginMode
    }
    onSubmit(Form:NgForm){
        this.isLoading=true
        const email=Form.value.email
        const password=Form.value.password
        if(!Form.valid){
            return
        }
        if(this.isLoginMode){
            this.authService.login(email,password).subscribe(res=>{
                console.log(res)
                this.isLoading=false
                this.router.navigate(['/recipes'])
            },errorMessage=>{
                console.log(errorMessage)
                this.error=errorMessage
                this.isLoading=false

            }
            )

        }else{
            this.authService.signUp(email,password).subscribe(res=>{
                console.log(res)
                this.isLoading=false
                this.router.navigate['/recipes']
            },errorMessage=>{
                console.log(errorMessage)
                this.error=errorMessage
                this.isLoading=false
            }
            )
        }
       
        Form.reset()

    }
    onHandleError(){
        this.error=null;
    }
}