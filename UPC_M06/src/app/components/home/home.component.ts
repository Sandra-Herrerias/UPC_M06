import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn!: Player;

  constructor(private communicatorService: CommunicatorService) { }

  ngOnInit(): void {
    // this.communicatorService.usuariData().subscribe((result: any) => {
    //   this.loggedIn = result;
    //   console.log(result);
    
    // })
    // this.communicatorService.user.subscribe((result: any) => {
    //   this.loggedIn = result;
    // })
  }

}
