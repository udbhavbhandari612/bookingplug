import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { convertIntoMeridianTime } from 'src/app/helpers/datetime-helper';
import { BackendService } from 'src/app/services/backend.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-from-airport',
  templateUrl: './from-airport.component.html',
  styleUrls: ['./from-airport.component.scss']
})
export class FromAirportComponent implements OnInit {
  @ViewChild('start') startEl: ElementRef;
  @ViewChild('destination') destinationEl: ElementRef;

  destination: google.maps.places.PlaceResult;

  formGroup: FormGroup = new FormGroup({
    start: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });

  airports: any;

  minDate: Date = new Date();

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAirports();
  }

  getAllAirports() {
    this.backend.getAirports().toPromise()
      .then(res => this.airports = res)
      .catch(err => alert(err.error))
  }

  ngAfterViewInit(): void {
    this.initLocationAutocomplete();
  }

  initLocationAutocomplete() {

    const destination = new google.maps.places.Autocomplete(this.destinationEl.nativeElement, {
      componentRestrictions: { country: 'US' },
      types: ['establishment', 'geocode']
    })

    destination.addListener('place_changed', () => {
      const place = destination.getPlace();
      this.destination = place;
    })
  }

  submit() {
    if (this.formGroup.invalid) {
      alert('Please fill all the fields properly')
      return
    }
    if (!this.destination) {
      alert('Please select a valid destination')
      return
    }

    let bookhour = new Date(this.formGroup.get('date').value)
    bookhour.setHours(this.formGroup.get('time').value.split(':')[0])
    bookhour.setMinutes(this.formGroup.get('time').value.split(':')[1])

    let twohour = new Date();
    twohour.setHours(twohour.getHours() + 2);
    if (twohour >= bookhour) {
      alert('Cannot book ride for 2 hours from now')
      return
    }

    const data = {
      start: this.formGroup.get('start').value,
      destination: this.destination.place_id,
      date: this.formGroup.get('date').value,
      time: convertIntoMeridianTime(this.formGroup.get('time').value),
      rideType: 'from-airport'
    }

    this.backend.getRides(data).toPromise()
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('/checkout', { state: { data: { ...res } } })
      })
      .catch(err => alert(err.error))

  }
}
