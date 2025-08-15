import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Country } from './countries/countries';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HubTestService {

  private hubConnection!: signalR.HubConnection;
  private _result: Subject<Country> = new Subject<Country>();
  public result = this._result.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'api/test-hub', {withCredentials: true, accessTokenFactory: () => this.authService.getToken()!.replace('Bearer', '')})
      .build();
    console.log('Starting connection...');
    this.hubConnection
      .start()
      .then(() => console.log('Connection started.'))
      .catch((err) => console.error(err));
  }

  public addDataListeners(){
    this.hubConnection.on('Test', (msg) => {
      console.log('test received: ' + msg);
    });
  }

}
