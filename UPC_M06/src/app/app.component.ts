import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Player } from './model/player';
import { CommunicatorService } from './service/communicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UPC_M06';
  public data?: string;
  loggedIn!: Player | null;
  constructor(public router: Router, private communicatorService: CommunicatorService) {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // console.log(this.router.url);
        this.data = this.router.url;
        console.log(this.data);
      }
    });

  }

  ngOnInit(): void {
    this.communicatorService.user.subscribe((result: any) => {
      this.loggedIn = result;
      console.log(this.loggedIn);
    })
  }

  logout(): void {
    this.communicatorService.logout();
  }

}
