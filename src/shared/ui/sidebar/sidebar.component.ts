import { Component, inject } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../entities/user/api/user.service';
import { firstValueFrom } from 'rxjs';

interface SidebarNavItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgComponent,
    NgForOf,
    ImageUrlPipe,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly userService = inject(UserService);

  public subscribers$ = this.userService.getSubscribersShortList();

  public myAccountData = this.userService.myAccountData

  public menuItemsConfig: SidebarNavItem[] = [
    { label: 'Home', icon: 'home', link: '/' },
    { label: 'Search', icon: 'search', link: '/search' },
    { label: 'Chat', icon: 'chat', link: '/chat' },
  ];

  ngOnInit() {
    firstValueFrom(this.userService.getMe())
  }
}
