import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { CitiesComponent } from './cities/cities.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CountriesComponent } from './countries/countries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CityEditComponent } from './cities/city-edit.component';
import { CountryEditComponent } from './countries/country-edit.component';
import { DevWebPageComponent } from './dev-web-page/dev-web-page.component';
import { LoginComponent } from './auth/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CitiesComponent,
    CountriesComponent,
    CityEditComponent,
    CountryEditComponent,
    DevWebPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
