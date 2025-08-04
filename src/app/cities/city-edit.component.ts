import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from './cities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Country } from '../countries/countries';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { BaseFormComponent } from '../base-form.component';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.scss'
})
export class CityEditComponent extends BaseFormComponent implements OnInit, OnDestroy {
  title?: string;
  city?: City;
  countries?: Observable<Country[]>;
  id?: number;
  activityLog: string = '';
  destroySubject = new Subject();

  constructor(private citiesService: CitiesService, private activatedRoute: ActivatedRoute, private router: Router){
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      lat: new FormControl("", [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      lon: new FormControl("", [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      countryId: new FormControl("", [Validators.required])
    }, null, this.isDupeCity());
    this.form.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe({
      next: () => {
        if(!this.form.dirty){
          this.log('Form has been loaded')
        }
        else{
          this.log('Form was updated by the user')
        }
      }
    })
    this.form.get("name")?.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe({
      next: () => {
        if(!this.form.dirty){
          this.log("Name form control initialized");
        }
        else{
          this.log("Name form control updated");
        }
      }
    })
    this.loadData();
  }
  ngOnDestroy(){
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  isDupeCity(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      var city = <City>{};
      city.id = (this.id) ? this.id : 0,
      city.name = this.form.get('name')?.value,
      city.lat = this.form.get('lat')?.value,
      city.lon = this.form.get('lon')?.value
      city.countryId = this.form.get('countryId')?.value;

      return this.citiesService.isDupeCity(city).pipe(map(response => {
        return (response ? {isDupeCity: true} : null);
      }))
    }
  }

  loadData(){
    this.loadCountries();
    var idParam = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idParam ? +idParam : 0;
    if(this.id){
      this.citiesService.get(this.id).pipe(takeUntil(this.destroySubject)).subscribe({
        next: (response) => {
          this.city = response;
          this.title = `Edit - ${this.city.name}`;
          this.form.patchValue(this.city);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        }
      })
    }
    else{
      this.title = "Create a new city";
    }
  }
  loadCountries(){
    this.countries = this.citiesService.getCountries(0, 9999, "name", "asc", null, null).pipe(map(x => x.data));
  }
  onSubmit(){
      var city = this.city ? this.city : <City>{};
      if(city){
        city.name = this.form.get('name')?.value,
        city.lat = this.form.get('lat')?.value,
        city.lon = this.form.get('lon')?.value;
        city.countryId = +this.form.get("countryId")?.value;
  
        if(this.id){
          this.citiesService.put(city).pipe(takeUntil(this.destroySubject)).subscribe({
            next: (response) => {
              console.log(`City ${city?.name} has been updated.`)
              this.router.navigate(['/cities'])
            },
            error: (error) => {
              console.error(error);
            }
          })
        }
        else{
          this.citiesService.post(city).pipe(takeUntil(this.destroySubject)).subscribe({
            next: (response) => {
              console.log(`City ${response.id} has been created.`)
              this.router.navigate(['/cities']);
            },
            error: (errorResponse) => {
              console.error(errorResponse);
            }
          })
        }
      }
  }
  log(str: string){
    this.activityLog += `${new Date().toLocaleString()}] ${str} <br/>`;
  }
}
