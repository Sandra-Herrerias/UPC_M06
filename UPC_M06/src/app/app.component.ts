import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UPC_M06';
  public data?: string;
  constructor(public router: Router) {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // console.log(this.router.url);
        this.data = this.router.url;
        console.log(this.data);
      }
    });


  }
}
