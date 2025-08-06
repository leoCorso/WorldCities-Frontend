import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

interface Weather{
  date: Date,
  temperatursC: number,
  temperatureF: number,
  summary: string
};


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy{
  
  private destroySubject = new Subject<void>();
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){
    this.authService.authStatus$.pipe(takeUntil(this.destroySubject)).subscribe({
      next: (result) => {
        this.isLoggedIn = result;
      }
    })
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
