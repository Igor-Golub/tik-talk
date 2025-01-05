import { Component, inject } from '@angular/core';
import { UserHeaderComponent } from '../../entities/user/ui/user-header/user-header.component';
import { UserService } from '../../entities/user/api/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { UserSubscribersComponent } from '../../entities/user/ui/user-subscribers/user-subscribers.component';
import { UserWallComponent } from '../../entities/user/ui/user-wall/user-wall.component';

@Component({
  selector: 'app-profile',
  imports: [
    UserHeaderComponent,
    AsyncPipe,
    UserSubscribersComponent,
    UserWallComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly userService = inject(UserService);

  private readonly activatedRoute = inject(ActivatedRoute);

  public myAccountData$ = toObservable(this.userService.myAccountData);

  userProfile$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.myAccountData$;
      return this.userService.getUser(id);
    }),
  );
}
