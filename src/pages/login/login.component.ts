import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/api/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  public isPasswordVisible = signal<boolean>(false);

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
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}
