import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { HubTestService } from '../hub-test.service';

@Component({
  selector: 'app-hub-test',
  templateUrl: './hub-test.component.html',
  styleUrl: './hub-test.component.scss'
})
export class HubTestComponent implements OnInit {
  
  constructor(private hubService: HubTestService){
  }

  ngOnInit(): void {
    this.hubService.startConnection();
    this.hubService.addDataListeners();  
  }
}
