import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, filter, map, merge, switchMap, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class SearchFilterComponent {
  @Input() placeholder = 'Pesquisar...';
  @Input() debounceTime = 1000;
  @Input() autoSearchMinLength = 4;

  @Output() search = new EventEmitter<string>();
  private forceSearch$ = new Subject<string>();

  searchForm = this.fb.group({
    search: ['']
  });

  constructor(
    private fb: FormBuilder
  ) {
    this.setAutoSearch();
  }

  private setAutoSearch() {
    const debounceOrCancelIfSearch$ = (searchTerm: string | null) =>
      timer(this.debounceTime).pipe(
        takeUntil(this.forceSearch$),
        map(() => searchTerm)
      );

    const autoSearch$ = this.searchForm.controls.search.valueChanges.pipe(
      switchMap(searchTerm => debounceOrCancelIfSearch$(searchTerm)),
      filter(searchTerm => (!!searchTerm && searchTerm.length >= this.autoSearchMinLength) || searchTerm === '')
    );

    merge(this.forceSearch$, autoSearch$).pipe(
      takeUntilDestroyed(),
      distinctUntilChanged()
    ).subscribe(() => this.emitValue());
  }

  protected forceSearch(){
    this.forceSearch$.next(this.searchForm.controls.search.value ?? '');
  }

  private emitValue() {
    this.search.emit(this.searchForm.controls.search.value ?? '');
  }
}
