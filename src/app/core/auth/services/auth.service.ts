import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, of, ReplaySubject, shareReplay, switchMap, tap } from 'rxjs';
import { UserService } from '@features/user/services/user.service';
import { User } from '@features/user/models/user.model';
import { LoginData } from '../models/login-data.model';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated$ = new ReplaySubject<User | null>(1);

  permissions$ = this.userAuthenticated$.pipe(
    distinctUntilChanged(),
    switchMap(user => user ? this.permissionService.getRole(user.role) : of(null)),
    map(role => role?.permissions ?? []),
    shareReplay(1)
  )

  isLoggedIn$ = this.userAuthenticated$.pipe(
    map(user => !!user)
  );

  constructor(
    private userService: UserService,
    private permissionService: PermissionService
  ) {
    this.checkIfUserIsAuthenticated();
  }

  private checkIfUserIsAuthenticated() {
    const userToken = this.getUserTokenFromStorage();
    if (!userToken){
      this.userAuthenticated$.next(null);
      return;
    }

    this.userService.getUserByToken(userToken)
      .subscribe({
        next: (user) => {
          this.userAuthenticated$.next(user);
        },
        error: () => {
          this.userAuthenticated$.next(null);
        }
      });
  }

  private saveUserTokenToStorage(token: string) {
    localStorage.setItem('userToken', token);
  }

  private getUserTokenFromStorage() {
    return localStorage.getItem('userToken');
  }

  hasPermission$(permission: string) {
    return this.permissions$.pipe(
      map(permissions => permissions.includes(permission)),
    );
  }

  getFakeAuthToken() {
    return this.getUserTokenFromStorage();
  }

  fakeLoginWithInsecurePassValidation(authModel: LoginData) {
    return this.userService.getUserByEmail(authModel.email)
      .pipe(
        map((user: User) => {
          if (user && user.password === authModel.password) {
            this.userAuthenticated$.next(user);
            this.saveUserTokenToStorage(user.accessToken);
            return user;
          }
          this.userAuthenticated$.next(null);
          return null;
        })
      )
  };

  logout() {
    this.userAuthenticated$.next(null);
    localStorage.removeItem('userToken');
  }

  static createFakeAuthToken() {
    const token = Math.random().toString(36).substring(2);
    return token;
  }

}