//creating User Data in this model

export class User{
    constructor(public email:string,
        public id:string,
        private _token:string,/*it is private because the token should not be retrievable(find) 
        when the user or you as a developer want to get access to the token*/
        private _tokenExpresionDate:Date){}
        
        get token(){//this f/n helps access to the token
            if(!this._tokenExpresionDate||new Date()>this._tokenExpresionDate)
            /*if _tokenExpresionDate does exist but it is smaller than the current timestamp,
             then we know that the token expired or token is past thats why return the null */
            {
                return null
            }

            return this._token;
        }

}