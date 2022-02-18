import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  active: String = 'from-airport';

  constructor() { }

  ngOnInit(): void {
  }

  typeChanged(e) {
    this.active = e.value;
  }


}
