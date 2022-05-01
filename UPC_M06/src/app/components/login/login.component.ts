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

  // username?: string;
  // password?: string;
  message: string | undefined;
  public loginForm = this.formBuilder.group({
    usuari: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.email
        // Validators.maxLength(10)
      ]
    ],
    password: ['',
      Validators.required]
  });


  constructor(private formBuilder: FormBuilder, private communicatorService: CommunicatorService, private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    // console.log(this.loginForm.value);
    this.communicatorService.login(new Player(0, "", this.loginForm.value.usuari, this.loginForm.value.password)).subscribe((res: any) => {
      // console.log("respuesta: "+res.length);
      if (res.length > 0) {
        this.route.navigate(['/home']);
      } else {
        this.message = "Credenciales incorrectas.";
      }
    })
  }

}
