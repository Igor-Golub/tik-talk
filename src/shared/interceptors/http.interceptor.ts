import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.accessToken) return next(req);

  if (!isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addAccessTokenToReq(req, authService.accessToken)).pipe(
    catchError((error) => {
      if (error.status === HttpStatusCode.Forbidden) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(error);
    }),
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refresh().pipe(
      switchMap(({ access_token }) => {
        isRefreshing = false;
        return next(addAccessTokenToReq(req, access_token));
      }),
    );
  }

  return next(addAccessTokenToReq(req, authService.accessToken!));
};

const addAccessTokenToReq = (req: HttpRequest<unknown>, token: string) => {
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return req;
};
