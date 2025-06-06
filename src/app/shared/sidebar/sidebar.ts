import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { Auth as AuthService } from '../../core/service/auth/auth';
import { Router, Event, NavigationEnd, NavigationError } from '@angular/router';
import { Filter } from './components/filter/filter';
import { Suggestion } from './components/suggestion/suggestion';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, Filter, Suggestion],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private readonly service = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly UserIcon = User;
  protected readonly LogoutIcon = LogOut;

  currentRoute = signal<string>('');

  constructor() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.url.split('?')[0]);
      }
      if (event instanceof NavigationError) {
        console.error(event.error);
      }
    });
  }

  isAuth(): boolean {
    return this.service.isLoggedIn();
  }

  logout() {
    this.service.logout();
  }
}
