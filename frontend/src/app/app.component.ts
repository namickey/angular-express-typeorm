import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IUser } from '../../../backend/src/entity/IUser';
import { UserTableComponent } from './user-table/user-table.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTableComponent,],
  providers: [UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  allUsers: IUser[] = [];
  
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    //console.log('AppComponent.ngOnInit()');
    this.usersService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      console.log(this.allUsers);
    })
  }
}
