import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly cookieService = inject(CookieService);

  private accessToken: string | null = null;

  private refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
    }

    return !!this.accessToken;
  }

  private readonly baseApiURL = 'https://icherniakov.ru/yt-course/auth/';

  public login({ login, password }: LoginPayload) {
    const formDataBody = new FormData();

    formDataBody.append('username', login);
    formDataBody.append('password', password);

    return this.http
      .post<LoginResponse>(`${this.baseApiURL}token`, formDataBody)
      .pipe(
        tap((response) => {
          this.accessToken = response.access_token;
          this.refreshToken = response.refresh_token;

          this.cookieService.set('accessToken', response.access_token);
          this.cookieService.set('refreshToken', response.access_token);
        }),
      );
  }
}
