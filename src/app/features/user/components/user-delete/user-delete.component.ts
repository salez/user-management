import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '@features/user/services/user.service';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDeleteComponent {
  id = inject(MAT_DIALOG_DATA).id;

  constructor(
    private userService: UserService
  ) { }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe();
  }

}
