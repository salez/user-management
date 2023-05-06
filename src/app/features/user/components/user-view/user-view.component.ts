import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from '@features/user/services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    UserEditComponent,
    MatCardModule
  ]
})
export class UserViewComponent {
  id = inject(MAT_DIALOG_DATA).id;
  user = this.userService.getUserById(this.id);

  constructor(
    private userService: UserService
  ) { 

  }
}
