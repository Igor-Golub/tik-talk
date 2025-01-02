import { Component, Input } from '@angular/core';
import { User } from '../../api/user';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'user-card',
  imports: [ImageUrlPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
}
