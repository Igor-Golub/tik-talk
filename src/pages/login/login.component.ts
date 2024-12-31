import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public form = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  public onSubmit() {
    console.log(this.form.value);
  }
}
