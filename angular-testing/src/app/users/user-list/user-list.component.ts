import { Component } from '@angular/core';
import { IUser } from '../models/user.model';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
selectedUser: IUser | null = null;

  constructor(private _userService:UserService){}
  users$ = this._userService.getUsers();

  selectUser(user:IUser){
    setTimeout(()=>{
    this.selectedUser = user;
    })
  }
}
