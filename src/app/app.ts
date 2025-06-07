import { Component, inject, signal } from '@angular/core';
import { Event, NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { Topbar } from './shared/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  protected title = 'e-commerce';

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

  displayBars(): boolean {
    return !this.currentRoute().includes('login') && !this.currentRoute().includes('cart');
  }
}
