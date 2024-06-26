import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IUser } from '../../../backend/src/entity/IUser';
import { UserTableComponent } from './user-table/user-table.component';
import { UsersService } from './users.service';
import { mergeMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserTableComponent, FormsModule],
  providers: [UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  newUserName: string = '';
  newUserAge: number = 0;

  allUsers: IUser[] = [];
  
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.allUsers = users;
          console.log(this.allUsers);
        }
      })
  }

  createNewUser() {
    console.log('Creating new user...')
    const userPayload = {
      name: this.newUserName,
      age: this.newUserAge,
    }

    this.usersService.createNewUser(userPayload)
    .pipe(
      mergeMap(() => this.usersService.getAllUsers()),
      tap((refreshedUsers) => this.allUsers = refreshedUsers)
    )
    .subscribe({
      next: (result) => {
        console.log(result)
      }
    })
  }
}
