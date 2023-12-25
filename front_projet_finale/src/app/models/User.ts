export class User{
    constructor(
                public id?: any,
                public nom?: string,
                public prenom?: string,
                public email?: string,
                public password?: string,
                public role?: string,
                public unlocked?:boolean

               
              
               
                ){
  
    }
  }

  export interface LoginUser{
    email:string;
    password:string;
}
export interface CurrentUser{
    id:number;
    prenom:string;
    nom:string;
    email:string;
    role:string;
    password: string;
    unlocked:boolean;
    

}