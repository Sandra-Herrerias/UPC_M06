import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private communicatorService: CommunicatorService) {
    
   }

  ngOnInit(): void {
  }

  register(): void {
    // this.communicatorService.addUser(new User(this.username, this.email, this.password)).subscribe(result => {
    //   // this.comentarios.push(result);
    // })
    console.log(new User(this.username, this.email, this.password));
  }
}
