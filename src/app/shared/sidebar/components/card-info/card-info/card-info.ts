import { Component, inject } from '@angular/core';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { Auth as AuthService } from '../../../../../core/service/auth/auth';

@Component({
  selector: 'app-card-info',
  imports: [LucideAngularModule],
  templateUrl: './card-info.html'
})
export class CardInfo {
  private readonly service = inject(AuthService);

  protected readonly UserIcon = User;
  protected readonly LogoutIcon = LogOut;

  isAuth(): boolean {
    return this.service.isLoggedIn();
  }

  logout() {
    this.service.logout();
  }
}
