import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/api/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  public form = new FormGroup({
    login: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  public onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      this.authService
        .login({
          login: formValue.login ?? '',
          password: formValue.password ?? '',
        })
        .subscribe((response) => {});
    }
  }
}
