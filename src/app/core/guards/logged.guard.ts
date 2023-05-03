import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "@core/auth/services/auth.service";
import { map } from "rxjs";

export const canMatchLoggedIn: CanMatchFn =
  () => {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$.pipe(
      map(isLoggedIn => isLoggedIn || router.createUrlTree(['/login']))
    );
  };