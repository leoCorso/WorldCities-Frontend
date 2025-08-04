import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CityEditComponent } from "./city-edit.component"
import { CitiesService } from "./cities.service";
import { City } from "./cities";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Country } from "../countries/countries";
import { ApiResult } from "../base.service";
import { ReactiveFormsModule } from "@angular/forms";

describe('CityEdit', () => {
    let fixture: ComponentFixture<CityEditComponent>;
    let component: CityEditComponent;
    let cityService = jasmine.createSpyObj<CitiesService>('CityService', ['get', 'getCountries']);
    cityService.get.and.returnValue(
        of<City>(<City>{
            name: "TestCity1",
            id: 1, lat: 1, lon: 1,
            countryId: 1, countryName: 'TestCountry1'
        })
    )
    cityService.getCountries.and.returnValue(
        of<ApiResult<Country>>(<ApiResult<Country>>{
            data: [
                <Country>{
                    id: 1, 
                    name: 'TestCountry1',
                    iso2: 'T1',
                    iso3: 'Tes'
                }
            ],
            pageIndex: 0,
            totalCount: 1,
            totalPages: 1
        })
    )
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, AngularMaterialModule, BrowserAnimationsModule, ReactiveFormsModule],
            declarations: [CityEditComponent],
            providers: [
                {
                    provide: CitiesService,
                    useValue: cityService
                }
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CityEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should display the city name as the title', () => {
        let templateTitle = fixture.nativeElement.querySelector('h1');
        expect(templateTitle.textContent).toEqual(component.title);
    })

})