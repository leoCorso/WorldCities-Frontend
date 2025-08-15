import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { CityEditComponent } from './cities/city-edit.component';
import { CountryEditComponent } from './countries/country-edit.component';
import { DevWebPageComponent } from './dev-web-page/dev-web-page.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HubTestComponent } from './hub-test/hub-test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'cities',
    component: CitiesComponent,
    pathMatch: 'full'
  },
  {
    path: 'countries',
    component: CountriesComponent,
    pathMatch: 'full'
  },
  {
    path: 'city-edit/:id',
    component: CityEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'city',
    component: CityEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'country-edit/:id',
    component: CountryEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'country',
    component: CountryEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dev',
    component: DevWebPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'hub-test',
    component: HubTestComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
