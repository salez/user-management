import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { UserService } from '@features/user/services/user.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatSnackBarModule,
    RouterModule
  ]
})
export class UserComponent {

  private readonly SNACKBAR_DURATION = 3000;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.setSnackbarMessages();
  }

  private setSnackbarMessages() {
    merge(
      this.userService.onCreate$,
      this.userService.onUpdate$,
      this.userService.onDelete$
    )
      .pipe(
        takeUntilDestroyed()
      ).subscribe((status) => {
        const msgStatus = 
          status === 'created' ? 'criado' : 
          status === 'deleted' ? 'excluído' : 
          'atualizado';

        this.snackBar.open(`Usuário ${ msgStatus } com sucesso!`, undefined, {
          duration: this.SNACKBAR_DURATION,
          panelClass: ['snackbar-success']
        });
      });
  }

}
