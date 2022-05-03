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
  userLogged!:any;
  constructor(public router: Router, private communicatorService: CommunicatorService) {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.data = this.router.url;
      }
    });

  }

  ngOnInit(): void {
    this.communicatorService.user.subscribe((result: any) => {
      this.loggedIn = result;
      const myJSON = JSON.stringify(this.loggedIn);
      this.userLogged = JSON.parse(myJSON);
    })
  }

  logout(): void {
    this.communicatorService.logout();
  }

}
