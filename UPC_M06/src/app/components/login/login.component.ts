import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?: string;
  password?: string;

  public loginForm = this.formBuilder.group({
    usuari: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    ]
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
