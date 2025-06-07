import { Component, inject } from '@angular/core';
import { LucideAngularModule, User, LogOut, LogIn } from 'lucide-angular';
import { Auth as AuthService } from '../../../../../core/service/auth/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-info',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './card-info.html'
})
export class CardInfo {
  private readonly service = inject(AuthService);

  protected readonly UserIcon = User;
  protected readonly LogoutIcon = LogOut;
  protected readonly LoginIcon = LogIn;

  isAuth(): boolean {
    return this.service.isLoggedIn();
  }

  logout() {
    this.service.logout();
  }
}
