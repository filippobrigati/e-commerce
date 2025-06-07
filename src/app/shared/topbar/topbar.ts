import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart as CartService } from '../../core/service/cart/cart';
import { Cart as CartType } from '../../core/model/cart';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
  private readonly service = inject(CartService);

  cart = signal<CartType>({
    amount: 0,
    products: [],
    items: 0
  });

  constructor() {
    this.service.cart$.subscribe({
      next: (value: CartType) => {
        this.cart.set(value);
      }
    });
  }

  format(): string {
    if (this.cart().items === 1) {
      return ' item';
    }

    return ' items';
  }
}
