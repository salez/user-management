import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(){
    this.userAuthenticated$.next(true);
  }

  logout(){
    this.userAuthenticated$.next(false);
  }
  
}
