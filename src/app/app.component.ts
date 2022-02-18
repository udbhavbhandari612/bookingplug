/// <reference  types="@types/googlemaps"  />

import { Component} from '@angular/core';
import { fadeInAnimation } from './animations/route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    fadeInAnimation
  ]
})
export class AppComponent {
  title = 'booking';
}
