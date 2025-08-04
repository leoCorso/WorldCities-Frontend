import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from './countries';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { BaseFormComponent } from '../base-form.component';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent extends BaseFormComponent implements OnInit, OnDestroy {

  id?: number;
  country!: Country;
  title!: string;
  destroySubject = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private countriesService: CountriesService, private formBuilder: FormBuilder){
    super();
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required, this.isDupeField('name')],
      iso2: ['', [Validators.required, Validators.pattern(/^[a-zA-z]{2}$/)], this.isDupeField('iso2')],
      iso3: ['', [Validators.required,  Validators.pattern(/^[a-zA-z]{3}$/)], this.isDupeField('iso3')]
    });
    this.loadData();
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }
  loadData(){
    // Extract Id from url parameter if provided
    // If so, get country from backend
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = id ? +id : 0;

    if(this.id){
      // Edit mode
      this.countriesService.get(this.id).pipe(takeUntil(this.destroySubject)).subscribe({
        next: (response) => {
          this.country = response;
          this.form.patchValue(this.country);
          this.title = `Editing ${this.country.name}`;
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        }
      })
    }
    else{
      // New mode
      this.title = 'Creating new country'
    }
  }

  onSubmit(){
    let country = this.country ? this.country : <Country>{};
    country.name = this.form.get('name')?.value;
    country.iso2 = this.form.get('iso2')?.value;
    country.iso3 = this.form.get('iso3')?.value;

    if(this.id){
      // Put
      this.countriesService.put(country).pipe(takeUntil(this.destroySubject)).subscribe({
        next: (response) => {
          this.router.navigate(['/countries']);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        }
      })
    }
    else{
      // Post
      this.countriesService.post(country).pipe(takeUntil(this.destroySubject)).subscribe({
        next: (response) => {
          this.router.navigate(['/countries']);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
        }
      })
    }
  }

  isDupeField(fieldName: string): AsyncValidatorFn{
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      // Logic
      return this.countriesService.isDupeFiled(fieldName, control.value, this.id ? this.id : 0).pipe(map(response => {
        return response ? { isDupeField: true } : null;
      }))
    }
  }
}
