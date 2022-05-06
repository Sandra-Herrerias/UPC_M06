import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { CommunicatorService } from 'src/app/service/communicator.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message: string = "";

  public registerForm = this.formBuilder.group({
    realname: [
      '',
      [
        Validators.required,
      ]
    ],
    nickname: [
      '',
      [
        Validators.minLength(8),
        Validators.required,
      ]
    ],
    email: [
      '',
      [
        Validators.email,
      ]
    ],
    passwd: [
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(14),
      ]
    ]
  });
  constructor(private formBuilder: FormBuilder,private communicatorService: CommunicatorService, private route: Router) {
    
   }

  ngOnInit(): void {
  }

  register(): void {
    // this.communicatorService.addUser(new User(this.username, this.email, this.password)).subscribe(result => {
    //   // this.comentarios.push(result);
    // })
    this.communicatorService.addUser(new Player(0,
      this.registerForm.value.nickname, "",
      this.registerForm.value.email, this.registerForm.value.passwd,
      "player")).subscribe((results: any) => {
        if (results.success) {
          this.route.navigate(['/login']);
        } else {
          this.message = "Error on registering."
        }
      });
  }
}
