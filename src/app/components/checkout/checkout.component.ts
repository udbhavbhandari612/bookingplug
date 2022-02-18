import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper, MatStepperNext } from '@angular/material/stepper';
import { BackendService } from 'src/app/services/backend.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { months, years } from '../../helpers/datetime-helper';
import { formatNumber } from '@angular/common';

declare var Accept: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  data: any;
  stepperOrientation: any = 'horizontal'
  selectedVehicle: any;
  payload: any;
  months: any = months();
  years: any = years(10);
  booking: any;
  paying: boolean = false;
  vehicleForm: FormGroup = new FormGroup({
    vehicle: new FormControl('', [Validators.required])
  });
  contactForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]),
    instructions: new FormControl(''),
  });
  paymentForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    month: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
    year: new FormControl('', [Validators.required, Validators.min(new Date().getFullYear())]),
    cardCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
  });

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private backend: BackendService) { }

  ngOnInit(): void {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.data = history.state.data
    if (!history.state.data) {
      alert('No data passed')
      this.router.navigateByUrl('/')
    }

  }

  async makePayment() {
    if (this.paymentForm.invalid) {
      alert('Please fill card details correctly')
      return
    }
    this.paying = true;
    Accept.dispatchData({
      authData: {
        clientKey: environment.authorizenet_client_id,
        apiLoginID: environment.authorizenet_api_login_id,
      },
      cardData: { ...this.paymentForm.value }
    }, (res) => {
      this.payload = {
        ..._.omit(this.data, ['vehicles']),
        opaqueData: res.opaqueData,
        vehicle_details: _.omit(this.vehicleForm.get('vehicle').value, ['photos']),
        contact_details: {
          ...this.contactForm.value,
          card_number: this.paymentForm.get('cardNumber').value,
          exp: this.paymentForm.get('month').value + this.paymentForm.get('year').value.toString().slice(-2)
        },

      }

      if (res.messages.resultCode === 'Ok') {
        this.backend.createBooking(this.payload).toPromise().then(res => {
          console.log(res)
          this.booking = res
          this.paymentForm.patchValue({ status: true })
          this.stepper.next()
        })
          .catch(err => {
            alert(err.error)
            console.log(err)
          }).finally(() => this.paying = false)
      }
      else {
        alert(res.messages.message[0].text)
        this.paying = false
      }
    })

  }

  toggleVehicle(vehicle) {
    if (this.selectedVehicle?.name === vehicle.name) {
      this.selectedVehicle = null;
      this.vehicleForm.patchValue({ vehicle: null })
    }
    else {
      this.selectedVehicle = { ...vehicle }
      this.vehicleForm.patchValue({ vehicle: this.selectedVehicle })

    }

  }

  assignChildSeats(e) {
    this.selectedVehicle.child_seats = e.value || 0;

  }

  generateChildSeats(n) {
    return new Array(n).fill(0);

  }

  toggleExtras(ele: HTMLDivElement, arrow: HTMLElement) {
    if (ele.classList.contains('extras-active')) {
      ele.classList.remove('extras-active')
      arrow.style.transform = 'rotate(0deg)'
    }
    else {
      ele.classList.add('extras-active')
      arrow.style.transform = 'rotate(180deg)'

    }

  }


  getDate(date) {
    return new Date(date).toDateString()
  }

  getTotalFare(formatted?: boolean) {
    const price = ((this.data.toll_price || 0) + (this.data.morning_rush_hour_price || 0) + (this.data.night_Frush_hour_price || 0) + (this.selectedVehicle?.total_fare || 0) + (this.selectedVehicle?.child_seats || 0) * 5) || 0
    return formatted ? formatNumber(price, null, '1.2-2') : price
  }

  test(e) {
    console.log(e);


  }

}
