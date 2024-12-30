import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../intervaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly baseApiURL = 'https://icherniakov.ru/yt-course'

  public getTestUsers() {
    return this.http.get<User[]>(`${this.baseApiURL}/account/test_accounts`)
  }
}
