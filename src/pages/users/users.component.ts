import { Component, inject } from '@angular/core';
import { User } from '../../entities/user/api/user';
import { UserService } from '../../entities/user/api/user.service';
import { UserCardComponent } from '../../entities/user/ui/user-card/user-card.component';

@Component({
  selector: 'app-users',
  imports: [
    UserCardComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  userService = inject(UserService)

  constructor() {
    this.userService.getTestUsers().subscribe((usersResData) => {
      this.users = usersResData
    })
  }
}
