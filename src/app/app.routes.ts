import { Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { UsersComponent } from '../pages/users/users.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { UsersSearchComponent } from '../pages/users-search/users-search.component';
import { canActivateAuth } from '../shared/guards/routerAccess.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users-search',
        component: UsersSearchComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
