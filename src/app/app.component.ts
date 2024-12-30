import { Component, inject } from '@angular/core';
import { UserCardComponent } from './user/user-card/user-card.component';
import { UserService } from './data/services/user.service';
import { User } from './data/intervaces/user';

@Component({
  selector: 'app-root',
  imports: [UserCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  users: User[] = [];
  userService = inject(UserService)

  constructor() {
    this.userService.getTestUsers().subscribe((usersResData) => {
      this.users = usersResData
    })
  }
}
