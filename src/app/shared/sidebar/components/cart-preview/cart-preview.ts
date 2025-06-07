import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Cart as CartService } from '../../../../core/service/cart/cart';
import { Cart } from '../../../../core/model/cart';
import { Subscription } from 'rxjs';
import { LucideAngularModule, ShoppingBag } from 'lucide-angular';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-cart-preview',
  imports: [LucideAngularModule, CurrencyPipe, NgClass],
  templateUrl: './cart-preview.html',
  styleUrl: './cart-preview.css'
})
export class CartPreview implements OnDestroy {
  private service = inject(CartService);
  private subscription: Subscription;

  protected readonly EmptyIcon = ShoppingBag;

  cart = signal<Cart>({
    amount: 0,
    items: 0,
    products: []
  });

  constructor() {
    this.subscription = this.service.cart$.subscribe(cart => {
      this.cart.set(cart);
    });
  }

  format(value: number): string {
    if (value === 1) {
      return 'item';
    }

    return 'items';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
