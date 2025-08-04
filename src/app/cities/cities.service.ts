import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from '../base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City } from './cities';
import { map, Observable } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Country } from '../countries/countries';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends BaseService<City>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  override getData(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<City>> {
    let url = this.getUrl("api/Cities");
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);

    if(filterColumn && filterQuery){
      params = params.set('filterColumn', filterColumn);
      params = params.set('filterQuery', filterQuery);
    }
    return this.httpClient.get<ApiResult<City>>(url, {params});
  }

  override get(id: number): Observable<City> {
    let url = this.getUrl(`api/Cities/` + id);
    return this.httpClient.get<City>(url);
  }
  override put(item: City): Observable<City> {
    let url = this.getUrl(`api/Cities/${encodeURIComponent(item.id)}`);
    return this.httpClient.put<City>(url, item);
  }
  override post(item: City): Observable<City> {
    let url = this.getUrl(`api/Cities`);
    return this.httpClient.post<City>(url, item);
  }
  isDupeCity(city: City): Observable<boolean>{
    let url = this.getUrl("api/Cities/IsDupeCity");
    return this.httpClient.post<boolean>(url, city)
  }
  getCountries(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, filterColumn: string | null, filterQuery: string | null){
    let url = this.getUrl("api/Countries");
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder)
    if(filterColumn && filterQuery){
      params.set('filterColumn', filterColumn);
      params.set("filterQuery", filterQuery)
    }
    return this.httpClient.get<ApiResult<Country>>(url, {params});
  }
}
