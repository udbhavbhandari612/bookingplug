import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { convertIntoMeridianTime } from 'src/app/helpers/datetime-helper';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-to-airport',
  templateUrl: './to-airport.component.html',
  styleUrls: ['./to-airport.component.scss']
})
export class ToAirportComponent implements OnInit {
  @ViewChild('start') startEl: ElementRef;

  start: google.maps.places.PlaceResult;
  destination: google.maps.places.PlaceResult;

  formGroup: FormGroup = new FormGroup({
    start: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });

  minDate: Date = new Date();
  airports: any;

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAirports()
  }

  ngAfterViewInit(): void {
    this.initLocationAutocomplete();
  }

  getAllAirports() {
    this.backend.getAirports().toPromise()
      .then(res => this.airports = res)
      .catch(err => alert(err.error))
  }

  initLocationAutocomplete() {
    const start = new google.maps.places.Autocomplete(this.startEl.nativeElement, {
      componentRestrictions: { country: 'US' },
      types: ['establishment', 'geocode']
    })

    start.addListener('place_changed', () => {
      const place = start.getPlace();
      this.start = place;
    })

  }


  submit() {
    if (this.formGroup.invalid) {
      alert('Please fill all the fields properly')
      return
    }
    if (!this.start) {
      alert('Please select a valid start point')
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
      start: this.start.place_id,
      destination: this.formGroup.get('destination').value,
      date: this.formGroup.get('date').value,
      time: convertIntoMeridianTime(this.formGroup.get('time').value),
      rideType: 'to-airport'
    }

    this.backend.getRides(data).toPromise()
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('/checkout', { state: { data: { ...res } } })
      })
      .catch(err => alert(err.error))

  }

}
