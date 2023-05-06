import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private http: HttpClient
  ) { }
  
  getRole(roleId: string) {
    return this.http.get<Role[]>(environment.apiUrl + '/roles', { params: { id: roleId } })
      .pipe(
        map((roles: Role[]) => roles[0])
      );
  }

  getRoles(){
    return this.http.get<Role[]>(environment.apiUrl + '/roles')
      .pipe(
        map((users: Role[]) => users[0])
      );
  }

}
