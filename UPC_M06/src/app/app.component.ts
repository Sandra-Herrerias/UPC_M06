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
  
  // userLogged!:any;
  constructor(public router: Router, private communicatorService: CommunicatorService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.data = this.router.url;
      }
    });

  }

  ngOnInit(): void {
    this.communicatorService.user.subscribe((result: any) => {
      // console.log(result); Mejorar
      if (result) {
        this.loggedIn = new Player(result._id, result._nickname, "", "","", result._role);
      }
     
      // console.log(this.loggedIn)
    })
  }

  logout(): void {
    this.communicatorService.logout();
  }

}
