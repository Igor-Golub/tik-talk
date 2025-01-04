import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { PaginatedList } from '../../../shared/api/types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly baseApiURL = 'https://icherniakov.ru/yt-course';

  public getTestUsers() {
    return this.http.get<User[]>(`${this.baseApiURL}/account/test_accounts`);
  }

  public getUser(id: string) {
    return this.http.get<User>(`${this.baseApiURL}/account/${id}`)
  }

  public getSubscribersShortList() {
    return this.http.get<PaginatedList<User>>(`${this.baseApiURL}/account/subscribers/`)
      .pipe(
        map(({items}) => items.slice(0, 3))
      );
  }

  public getMe() {
    return this.http.get<User>(`${this.baseApiURL}/account/me`);
  }
}
