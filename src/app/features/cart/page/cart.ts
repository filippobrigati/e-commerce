import { Component, computed, inject, signal } from '@angular/core';
import { Cart as CartType } from "../../../core/model/cart";
import { Cart as CartService } from '../../../core/service/cart/cart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { InvoiceProduct } from '../components/invoice-product/invoice-product';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, InvoiceProduct],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private readonly service = inject(CartService);

  protected readonly SHIPPING_COST: number = 12.99;

  cart = signal<CartType>({
    amount: 0,
    products: [],
    items: 0
  });

  constructor() {
    this.service.cart$.subscribe({
      next: (value: CartType) => {
        this.cart.set(value);
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  total = computed<number>(() => {
    const cart: number = this.cart().amount;

    return cart + this.SHIPPING_COST;
  });

  remove(id: number): void {
    this.service.remove(id);
  }

  updateQuantity(id: number, qta: number): void {
    this.service.updateQuantity(id, qta)
  }

  complete() {
    alert('You have completed this DEMO order!!');
  }
}
