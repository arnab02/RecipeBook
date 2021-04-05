import {Injectable} from '@angular/core'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators'
import {throwError, Subject, BehaviorSubject} from 'rxjs'
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:	string;
    refreshToken:string;
    expiresIn:string;
    localId	:string;

}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    /*user=new Subject<User>() /*this subject which we have to subscribe and we get the
     information when new data is emited*/
     user =new BehaviorSubject<User>(null)
     /*behavior subject also gives subscribers immediate access to the previously 
     emitted value even if they haven't subscribed at the point of time that value was emitted.*/

    constructor(private http:HttpClient,private router:Router){}

 //SENDING SIGNUP REQUEST

    signUp(email:string,password:string){
       return this.http.
       post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ7GGatZu7_4uUxXfPgnCKzbpoofEdMX0',
       {
        email:email,
        password:password,
        returnSecureToken:true
       } ).pipe(catchError(this.handlerror),tap(resData=>{
/*tap is an operator which is allows us to perform some action without changing the response.*/ 
           this.handleAukthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
       }))

    }

   

//SENDING LOGIN REQUEST

login(email:string,password:string){
    return this.http.
    post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ7GGatZu7_4uUxXfPgnCKzbpoofEdMX0',
    {
     email:email,
     password:password,
     returnSecureToken:true
    } ).pipe(catchError(this.handlerror),tap(resData=>{
        /*tap is an operator which is allows us to perform some action without changing the response.*/ 
         this.handleAukthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
     }))    

}

logOut(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    
}

private handleAukthentication(email:string,userId:string,token:string,expressIn:number){
    const expressionDate=new Date(new Date().getTime()+ + expressIn*1000)//this is wrapping the millisec
       const user=new User(email,userId,token,expressionDate)
       this.user.next(user)
}

//error handelling part
private handlerror(errorRes:HttpErrorResponse){
    let errorMessage='an Unknown Error Occured!'
        if(!errorRes.error||!errorRes.error.error){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='This Email Already Exists'
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage='The Email not Exists'
                break
            case 'INVALID_PASSWORD':
                errorMessage='The password is invalid or the user does not have a password.'
                break

        }
        return throwError(errorMessage)
}

}