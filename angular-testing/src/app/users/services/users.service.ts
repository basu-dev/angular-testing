import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";

export const    ROOT_URL = 'http://127.0.0.1:3000'

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http:HttpClient){    }


    getUsers(){
        return this.http.get<IUser[]>(ROOT_URL+'/users')
    }
}