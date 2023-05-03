import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserService } from '@features/user/services/user.service';
import { User } from '@features/user/models/user.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated$ = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.userAuthenticated$.pipe(
    map(user => !!user)
  );

  constructor(
    private userService: UserService
  ) { }

  fakeLoginWithInsecurePassValidation(authModel: LoginModel) {
    return this.userService.getUserByEmail(authModel.email)
      .pipe(
        map((user: User) => {
          if(user && user.password == authModel.password) {
            this.userAuthenticated$.next(user);
            return user;
          }
          this.userAuthenticated$.next(null);
          return null;
        })
      )
  };

  logout() {
    this.userAuthenticated$.next(null);
  }

}