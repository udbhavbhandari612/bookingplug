import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromAirportComponent } from './from-airport.component';

describe('FromAirportComponent', () => {
  let component: FromAirportComponent;
  let fixture: ComponentFixture<FromAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromAirportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
