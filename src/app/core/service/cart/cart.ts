import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../model/products';
import { Cart as CartType } from '../../model/cart';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartSubject = new BehaviorSubject<CartType>({
    amount: 0,
    items: 0,
    products: []
  });

  cart$ = this.cartSubject.asObservable();

  // Internal helper to recalculate total items and amount
  private recalculate(products: CartType['products']): CartType {
    const items = products.reduce((sum, p) => sum + p.quantity, 0);
    const amount = products.reduce((sum, p) => sum + p.quantity * p.product.price, 0);
    return { items, amount, products };
  }

  get(): CartType {
    return this.cartSubject.getValue();
  }

  set(cart: CartType): void {
    this.cartSubject.next(this.recalculate(cart.products));
  }

  add(product: Product, quantity: number = 1): void {
    const cart = this.get();
    const existing = cart.products.find(p => p.id === product.id);

    let updatedProducts: CartType['products'];
    if (existing) {
      updatedProducts = cart.products.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
      );
    } else {
      updatedProducts = [...cart.products, { id: product.id, quantity: quantity, product }];
    }

    this.cartSubject.next(this.recalculate(updatedProducts));
  }

  decrement(productId: number): void {
    const cart = this.get();
    const existing = cart.products.find(p => p.id === productId);

    if (!existing) return;

    let updatedProducts: CartType['products'];

    if (existing.quantity > 1) {
      updatedProducts = cart.products.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
    } else {
      updatedProducts = cart.products.filter(p => p.id !== productId);
    }

    this.cartSubject.next(this.recalculate(updatedProducts));
  }

  remove(productId: number): void {
    const cart = this.get();
    const updatedProducts = cart.products.filter(p => p.id !== productId);
    this.cartSubject.next(this.recalculate(updatedProducts));
  }

  clear(): void {
    this.cartSubject.next({ amount: 0, items: 0, products: [] });
  }

  contains(productId: number): boolean {
    return this.get().products.some(p => p.id === productId);
  }

  getQuantity(productId: number): number {
    return this.get().products.find(p => p.id === productId)?.quantity ?? 0;
  }
}