import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResult } from './login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      if(loginResult.sucess && loginResult.token){
        localStorage.setItem(this.tokenkey, loginResult.token);
      }
    }));
  }
}
