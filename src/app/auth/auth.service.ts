import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResult } from './login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus$ = this._authStatus.asObservable();

  constructor(protected httpClient: HttpClient) { }

  public tokenkey: string = "token";

  isAuthenticated(): boolean {
    return this.getToken() != null
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenkey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
    var url = environment.baseUrl + "api/Account/Login";
    return this.httpClient.post<LoginResult>(url, item).pipe(tap(loginResult => {
      if(loginResult.success && loginResult.token){
        localStorage.setItem(this.tokenkey, loginResult.token);
        this.setAuthStatus(true);
      }
    }));
  }
  init(): void {
    if(this.isAuthenticated()){
      this.setAuthStatus(true);
    }
  }
  private setAuthStatus(isAuthenticated: boolean){
    this._authStatus.next(isAuthenticated);
  }

  logout(): void{
    localStorage.removeItem(this.tokenkey);
    this.setAuthStatus(false);
  }

}
