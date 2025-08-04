import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Country } from './countries';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries!: MatTableDataSource<Country>;
  displayedColumns: string[] = ['id', 'name', 'iso2', 'iso3', 'totCities']
  public defaultPageSize = 10;
  public defaultPageIndex = 0;
  public defaultSortColumn: string = "name";
  public defaultSortDirection: 'asc' | 'desc' = 'asc';
  public defaultFilterColumn: string = 'name';
  public filterQuery?: string;
  destroySubject = new Subject();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.loadData();
  }
  ngOnDestroy(){
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  onFilterTextChaged(filterText: string){
    if(!this.filterTextChanged.observed){
      this.filterTextChanged.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroySubject)).subscribe({
        next: (text) => {
          this.loadData(text);
        }
      })
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(filterQuery?: string) {
    let pageEvent = new PageEvent();
    pageEvent.pageSize = this.defaultPageSize;
    pageEvent.pageIndex = this.defaultPageIndex;
    this.filterQuery = filterQuery;
    this.getData(pageEvent);
  }

  getData(pageEvent: PageEvent) {
    let sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    let sortOrder = this.sort ? this.sort.direction : this.defaultSortDirection;
    let filterQuery = this.filterQuery ? this.filterQuery : null;
    let filterColumn = this.filterQuery ? this.defaultFilterColumn : null;

    this.countriesService.getData(pageEvent.pageIndex, pageEvent.pageSize, sortColumn, sortOrder, filterColumn, filterQuery).pipe(takeUntil(this.destroySubject)).subscribe({
      next: (response) => {
        this.countries = new MatTableDataSource(response.data);
        this.paginator.length = response.totalCount;
        this.paginator.pageIndex = response.pageIndex;
        this.paginator.pageSize = response.pageSize;
      },
      error: (errorResponse) => {

      }
    });
  }
}
