import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canMatchLoggedIn } from '@core/guards/loggedIn.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(component => component.LoginComponent) },
  {
    path: 'users', loadChildren: () => import('./features/user/user.route').then(route => route.USER_ROUTES),
    canMatch: [canMatchLoggedIn]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      bindToComponentInputs: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
