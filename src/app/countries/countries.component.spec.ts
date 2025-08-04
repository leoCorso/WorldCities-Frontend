import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CountriesComponent } from "./countries.component"
import { RouterTestingModule } from "@angular/router/testing";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiResult } from "../base.service";
import { Country } from "./countries";
import { of } from "rxjs";
import { CountriesService } from "./countries.service";

describe('CountriesComponent', () => {
    let fixture: ComponentFixture<CountriesComponent>;
    let component: CountriesComponent;
    let countryService = jasmine.createSpyObj('CountriesService', ['getData']);
    countryService.getData.and.returnValue(
        of<ApiResult<Country>>(<ApiResult<Country>> {
            data: [
                <Country>{
                    name: 'TestCountry1',
                    id: 1, iso2: 'T1', iso3: 'TE1',
                    totCities: 1
                },
                <Country>{
                    name: 'TestCountry2',
                    id: 2, iso2: 'T2', iso3: 'TE2'
                }
            ],
            pageIndex: 0,
            totalCount: 2,
            pageSize: 10
        })
    )
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CountriesComponent],
            imports: [RouterTestingModule, AngularMaterialModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: CountriesService,
                    useValue: countryService
                }
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CountriesComponent);
        component = fixture.componentInstance;
        component.paginator = jasmine.createSpyObj('MatPaginator', ['pageIndex', 'pageSize', 'length']);
        fixture.detectChanges();
    })

    it('should create countries title', () => {
        let title = fixture.nativeElement.querySelector('h1');
        expect(title.textContent).toEqual('Countries');
    })

})