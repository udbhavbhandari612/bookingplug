import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  misc: any;
  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.fetchMisc();
  }

  fetchMisc() {
    this.backend.getMisc().subscribe(res => {
      this.misc = res[0];
    })
  }

}
