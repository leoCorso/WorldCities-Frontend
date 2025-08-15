import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubTestComponent } from './hub-test.component';

describe('HubTestComponent', () => {
  let component: HubTestComponent;
  let fixture: ComponentFixture<HubTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HubTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HubTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
