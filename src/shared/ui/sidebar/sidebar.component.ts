import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { NgForOf } from '@angular/common';

interface SidebarNavItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [SvgComponent, NgForOf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public menuItemsConfig: SidebarNavItem[] = [
    { label: 'Home', icon: 'home', link: '/' },
    { label: 'Search', icon: 'search', link: '/' },
    { label: 'Chat', icon: 'chat', link: '/' },
  ];
}
