import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ConnectionService, ConnectionServiceOptions } from 'ng-connection-service';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'world-cities';
  public isOffline: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private connectionService: ConnectionService
  ) {
      const options: ConnectionServiceOptions = {
        enableHeartbeat: true,
        heartbeatUrl: environment.baseUrl + 'api/heartbeat',
        heartbeatInterval: 10000
      };
      this.isOffline = connectionService.monitor(options).pipe(map(state => {
        return !state.hasInternetAccess || !state.hasNetworkConnection 
      }));
  }
  ngOnInit(): void {
    this.authService.init();

  }
}
