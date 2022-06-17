export class User{
  constructor(public email: string, public id: string, private _token : string, private _tokenExpirationDate:Date){}

  get token(){
      //Getter is a special type of property which will run code when we try to access the property
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null;               //new Date()= current time
    }
    return this._token;
    }
}