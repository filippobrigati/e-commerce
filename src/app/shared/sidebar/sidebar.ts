import { Component, inject } from '@angular/core';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { Auth as AuthService } from '../../core/service/auth';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
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
