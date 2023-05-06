import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@core/auth/services/auth.service';
import { PageContentComponent } from '@shared/components/page-content/page-content.component';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { SearchFilterComponent } from '@shared/components/search-filter/search-filter.component';
import { RouterModule } from '@angular/router';
import { UserService } from '@features/user/services/user.service';
import { User } from '@features/user/models/user.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SearchFilterComponent,
    PageTitleComponent,
    PageContentComponent,
    RouterModule,
    MatDialogModule,
    UserViewComponent,
    UserDeleteComponent,
    NgxMaskPipe
  ],
  providers:[
    provideNgxMask()
  ]
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: MatTableDataSource<User> | undefined;

  displayedColumns = ['name', 'identity', 'dateOfBirth', 'actions'];

  writePermission$ = this.authService.hasPermission$('write');

  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    private dialog: MatDialog
  ) {
    this.userService.getUsers()
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(users => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  ngAfterViewInit(): void {
    
  }

  viewUser(id: string){
    this.dialog.open(UserViewComponent,{
      data: { id: id },
    });
  }

  deleteUser(id: string){
    this.dialog.open(UserDeleteComponent,{
      data: { id: id },
    });
  }

  filterUsersByName(searchTerm: string) {
    if(!this.dataSource) return;

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };

    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }
}
