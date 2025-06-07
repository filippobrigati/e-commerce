import { Component, inject, signal } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError } from '@angular/router';
import { Filter } from './components/filter/filter';
import { CartPreview } from './components/cart-preview/cart-preview';
import { CardInfo } from './components/card-info/card-info/card-info';

@Component({
  selector: 'app-sidebar',
  imports: [Filter, CartPreview, CardInfo],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private readonly router = inject(Router);

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
}
