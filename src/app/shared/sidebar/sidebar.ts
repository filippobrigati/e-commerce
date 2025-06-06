import { Component, inject } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
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

  isAuth(): boolean {
    return this.service.isLoggedIn();
  }
}
