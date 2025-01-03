import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { UserService } from '../../../entities/user/api/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private readonly userService = inject(UserService);

  ngOnInit() {
    this.userService.getMe().subscribe(console.log);
  }
}
