import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string | undefined;

  public loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
      ]
    ]
  });


  constructor(private formBuilder: FormBuilder, private communicatorService: CommunicatorService, private route: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.communicatorService.login(new Player(0, "", "", this.loginForm.value.email,
      this.loginForm.value.password)).subscribe((res: any) => {
        if (res.success) {
          this.route.navigate(['/home']);
        } else {
          this.message = "Credenciales incorrectas.";
        }
      })
  }

}
