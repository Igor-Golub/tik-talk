import { Routes } from '@angular/router';
import { UsersComponent } from '../pages/users/users.component';
import { LoginComponent } from '../pages/login/login.component';
import { UsersSearchComponent } from '../pages/users-search/users-search.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users-search',
    component: UsersSearchComponent,
  }
];
