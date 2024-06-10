import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../../../backend/src/entity/IUser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://localhost:3000';
  #http = inject(HttpClient);

  getAllUsers(): Observable<IUser[]> {
    return this.#http.get<{ status:string,data:IUser[] }>(`${this.baseUrl}/users`)
    .pipe(
      map(response => response.data)
    )
  }
}
