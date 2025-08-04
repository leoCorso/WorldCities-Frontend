import { Component, OnDestroy, OnInit } from '@angular/core';
import { City } from './cities';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public cities!: MatTableDataSource<City>;
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon', 'country'];
  public defaultPageIndex = 0;
  public defaultPageSize = 10;
  public defaultSortColumn = "name";
  public defaultSortOrder: 'asc' | 'desc' = 'asc';
  public defaultFilterColumn: string = 'name';
  public filterQuery?: string;
  filterTextChanged: Subject<string> = new Subject<string>();
  destroySubject = new Subject();

  constructor(private citiesService: CitiesService){}

  ngOnInit(){
    this.loadData();
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  onFilterTextChanged(text: string){
    if(!this.filterTextChanged.observed){
      // If we're not observing the subject we set our observer
      this.filterTextChanged.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroySubject)).subscribe({
        next: (text) => {
          this.loadData(text);
        }
      })
    }
    // Emit the value via the subject
    this.filterTextChanged.next(text);
  }

  loadData(filterQuery?: string){
    var pageEvent = new PageEvent();
    pageEvent.pageSize = this.defaultPageSize;
    pageEvent.pageIndex = this.defaultPageIndex;
    this.filterQuery = filterQuery;
    this.getData(pageEvent);
  }

  getData(pageEvent: PageEvent){
    let sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    let sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    let filterColumn = this.filterQuery ? this.defaultFilterColumn : null;
    let filterQuery = this.filterQuery ? this.filterQuery : null;

    this.citiesService.getData(pageEvent.pageIndex, pageEvent.pageSize, sortColumn, sortOrder, filterColumn, filterQuery).pipe(takeUntil(this.destroySubject)).subscribe({
      next: (response) => {
        this.paginator.length = response.totalCount;
        this.paginator.pageIndex = response.pageIndex;
        this.paginator.pageSize = response.pageSize;

        this.cities = new MatTableDataSource<City>(response.data);
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    })
  }

}
