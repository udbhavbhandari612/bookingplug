import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getVehicles() {
    return this.http.get(`${this.baseUrl}/vehicles`)
  }

  getAirports() {
    return this.http.get(`${this.baseUrl}/airports`)
  }

  getRides(params) {
    return this.http.post(`${this.baseUrl}/rides`, params)
  }

  createBooking(params){
    return this.http.post(`${this.baseUrl}/bookings`, params)
  }
}
