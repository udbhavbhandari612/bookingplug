import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAirportComponent } from './to-airport.component';

describe('ToAirportComponent', () => {
  let component: ToAirportComponent;
  let fixture: ComponentFixture<ToAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToAirportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
