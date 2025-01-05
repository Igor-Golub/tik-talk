import { Component, input } from '@angular/core';
import { User } from '../../api/user';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'app-user-header',
  imports: [ImageUrlPipe],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent {
  public user = input<User | null>(null);
}
