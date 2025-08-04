import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { of } from 'rxjs';

import { CitiesComponent } from './cities.component';
import { City } from './cities';
import { CitiesService } from './cities.service'; 
import { ApiResult } from '../base.service';

// Holds test suite
describe('CitiesComponent', () => {
    let component: CitiesComponent; // Component instance
    let fixture: ComponentFixture<CitiesComponent>; // Holds component instance, nativeElement and other properties of a complete component
    let cityService = jasmine.createSpyObj<CitiesService>('CityService', ['getData']);
    cityService.getData.and.returnValue(
        of<ApiResult<City>>(<ApiResult<City>>{
            data: [
                <City>{
                    name: 'TestCity1',
                    id: 1, lat: 1, lon: 1,
                    countryId: 1, countryName: "TestCountry1"
                },
                <City>{
                    name: "TestCity2",
                    id: 2, lat: 2, lon: 2,
                    countryId: 1, countryName: "TestCountry1"
                },
                <City>{
                    name: "TestCity3",
                    id: 3, lat: 3, lon: 3,
                    countryId: 1, countryName: "TestCountry1"
                }
            ],
            totalCount: 3,
            pageIndex: 0, 
            pageSize: 10
        })
    )
    // Before each test, we compile dependencies for the test
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // Declare and initialize required providers
            declarations: [CitiesComponent],
            imports: [BrowserAnimationsModule, AngularMaterialModule, RouterTestingModule],
            providers: [
                // Reference required providers
                {
                    provide: CitiesService,
                    useValue: cityService
                }
            ]
        }).compileComponents();
    });

    // Before each test, we initialize the component
    beforeEach(() => {
        fixture = TestBed.createComponent(CitiesComponent);
        component = fixture.componentInstance;
        // Configure component
        component.paginator = jasmine.createSpyObj("MatPaginator", ['length', 'pageIndex', 'pageSize']);
        fixture.detectChanges();0
    })

    // Test
    it("Should create cities component", () => {
        expect(component).toBeTruthy();
    });

    // Implement other tests
    it("should display a 'Cities' title", () => {
        let title = fixture.nativeElement.querySelector('h1');
        expect(title.textContent).toEqual('Cities');
    })

    it('should contain a table with a list of one or more cities', () => {
        let table = fixture.nativeElement.querySelector('table.mat-mdc-table');
        let tableRows = table.querySelectorAll('tr.mat-mdc-row');
        expect(tableRows.length).toBeGreaterThan(0);
    })
});