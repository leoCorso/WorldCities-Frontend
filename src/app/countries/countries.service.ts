import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from '../base.service';
import { Country } from './countries';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CountriesService extends BaseService<Country> {

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  override getData(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string, filterColumn: string | null, filterQuery: string | null): Observable<ApiResult<Country>> {
    let url = this.getUrl("api/Countries");
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);
    if(filterColumn && filterQuery){
      params = params.set('filterColumn', filterColumn);
      params = params.set('filterQuery', filterQuery!);
    }
    return this.httpClient.get<ApiResult<Country>>(url, {params});
  }
  override get(id: number): Observable<Country> {
    let url = this.getUrl(`api/Countries/${encodeURIComponent(id)}`);
    return this.httpClient.get<Country>(url);
  }
  override put(item: Country): Observable<Country> {
    let url = this.getUrl(`api/Countries/${item.id}`);
    return this.httpClient.put<Country>(url, item);
  }
  override post(item: Country): Observable<Country> {
    let url = this.getUrl(`api/Countries`);
    return this.httpClient.post<Country>(url, item);
  }
  isDupeFiled(fieldName: string, fieldValue: string, countryId: number): Observable<boolean>{
    let url = this.getUrl("api/Countries/IsDupeField");
    let params = new HttpParams()
      .set("fieldName", fieldName)
      .set('fieldValue', fieldValue)
      .set('countryId', countryId.toString());
    
    return this.httpClient.get<boolean>(url, {params});
  }
}
