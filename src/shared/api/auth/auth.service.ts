import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
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

enum TokensKeys {
  Access = 'access',
  Refresh = 'refresh',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly router = inject(Router);

  private readonly cookieService = inject(CookieService);

  public accessToken: string | null = null;

  private refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get(TokensKeys.Access);
      this.refreshToken = this.cookieService.get(TokensKeys.Refresh);
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
      .pipe(tap(this.saveTokens.bind(this)));
  }

  public refresh() {
    return this.http
      .post<LoginResponse>(`${this.baseApiURL}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap(this.saveTokens.bind(this)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        }),
      );
  }

  public logout() {
    this.cookieService.delete(TokensKeys.Access);
    this.cookieService.delete(TokensKeys.Refresh);

    this.refreshToken = null;
    this.accessToken = null;

    this.router.navigate(['/login']);
  }

  private saveTokens(response: LoginResponse) {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set(TokensKeys.Access, response.access_token);
    this.cookieService.set(TokensKeys.Refresh, response.refresh_token);
  }
}
