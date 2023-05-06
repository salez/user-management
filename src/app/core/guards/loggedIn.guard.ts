import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "@core/auth/services/auth.service";
import { catchError, map, of } from "rxjs";

export const canMatchLoggedIn: CanMatchFn =
  () => {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$.pipe(
      map(isLoggedIn => isLoggedIn || router.createUrlTree(['/login'])),
      catchError(() => {
        return of(router.createUrlTree(['/login']));
      })
    );
  };