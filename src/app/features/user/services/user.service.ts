import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject, map, of, startWith, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from '@core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _onCreate$ = new Subject<'created'>();
  private _onDelete$ = new Subject<'deleted'>();
  private _onUpdate$ = new Subject<'updated'>();

  onCreate$ = this._onCreate$.asObservable();
  onUpdate$ = this._onUpdate$.asObservable();
  onDelete$ = this._onDelete$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this._onDelete$.pipe(
      startWith(null),
      switchMap(() => this.http.get<User[]>(environment.apiUrl + '/users'))
    );
  }

  getUserById(id: string) {
    return this.http.get<User[]>(environment.apiUrl + '/users', { params: { id } })
      .pipe(
        map((users: User[]) => users[0])
      );
  } 

  getUserByEmail(email: string) {
    return this.http.get<User[]>(environment.apiUrl + '/users', { params: { email } })
      .pipe(
        map((users: User[]) => users[0])
      );
  }

  getUserByToken(userToken: string) {
    if (!userToken) {
      return EMPTY;
    }

    return this.http.get<User[]>(environment.apiUrl + '/users', { params: { accessToken: userToken } })
      .pipe(
        map((users: User[]) => users[0])
      );
  }

  createUser(value: Partial<User>) {
    return this.http.post<User>(environment.apiUrl + '/users', {
      ...value,
      accessToken: AuthService.createFakeAuthToken()
    }).pipe(
      tap(() => this._onCreate$.next('created'))
    );
  }

  updateUser(id: string | undefined, value: Partial<User>) {
    return this.http.patch<User>(environment.apiUrl + '/users/' + id, value).pipe(
      tap(() => this._onUpdate$.next('updated'))
    );
  }

  deleteUser(id: string) {
    return this.http.delete(environment.apiUrl + '/users/' + id).pipe(
      tap(() => this._onDelete$.next('deleted'))
    );
  }
}
