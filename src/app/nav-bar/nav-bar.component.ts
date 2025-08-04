import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
export class NavBarComponent {
  constructor(private httpClient: HttpClient){

  }

  ngOnInit(){
  }
}
