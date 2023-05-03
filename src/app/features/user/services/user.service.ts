import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() { }

  getUserByEmail(email: string) {
    return this.http.get<User>(environment.apiUrl + '/users', { params: { email } });
  }
}
