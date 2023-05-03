import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';

export const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'login', loadComponent: () => import('./features/login/login.component').then(component => component.LoginComponent) },
  {path: 'users', component: UserComponent, loadChildren: () => import('./features/user/user.route').then(route => route.USER_ROUTES) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
