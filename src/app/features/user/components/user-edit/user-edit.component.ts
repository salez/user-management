import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { User } from '@features/user/models/user.model';
import { UserService } from '@features/user/services/user.service';
import { PageContentComponent } from '@shared/components/page-content/page-content.component';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  },
};

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule,
    PageTitleComponent,
    PageContentComponent,
    NgxMaskDirective,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers:[
    provideNgxMask(),
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ]
})
export class UserEditComponent implements OnInit {
  @Input() id?: string;
  protected isEditing = false;

  readonly MARITAL_STATUS = [
    'Solteiro(a)',
    'Casado(a)'
  ];

  readonly CITIES = [
    {name: 'Sao Paulo', abbreviation: 'SP'},
    {name: 'Rio de Janeiro', abbreviation: 'RJ'},
  ];

  readonly STATES = [
    {name: 'Sao Paulo', abbreviation: 'SP'},
    {name: 'Rio de Janeiro', abbreviation: 'RJ'},
  ];

  private fb = inject(FormBuilder);
  
  userForm = this.fb.group({
    name: ['', Validators.required],
    identity: ['', Validators.required],
    profession: ['', Validators.required],
    dateOfBirth: new FormControl<Date | null>(null, [Validators.required]),
    maritalStatus: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });

  constructor(
    private userService: UserService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    if (this.id) {
      this.isEditing = true;

      this.fillFormWithUser(this.id);
    }
  }

  fillFormWithUser(id: string){
    this.userService.getUserById(id).subscribe((user) => {
      this.userForm.patchValue(user); 
    });
  }

  onSubmit(): void {
    let createOrUpdate$;

    if(this.isEditing){
      createOrUpdate$ = this.userService.updateUser(this.id, this.userForm.value as User);
    }else{
      createOrUpdate$ = this.userService.createUser(this.userForm.value as User);
    }

    createOrUpdate$.subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
