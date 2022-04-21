import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private communicatorService : CommunicatorService) { }

  ngOnInit(): void {
    this.communicatorService.getData().subscribe(result => {
      console.log(result);
    })
  }

}
