import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './common/form/form.component';
import { HourlyComponent } from './common/form/hourly/hourly.component';
import { FromAirportComponent } from './common/form/from-airport/from-airport.component';
import { ToAirportComponent } from './common/form/to-airport/to-airport.component';
import { DoorToDoorComponent } from './common/form/door-to-door/door-to-door.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    HourlyComponent,
    FromAirportComponent,
    ToAirportComponent,
    DoorToDoorComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
