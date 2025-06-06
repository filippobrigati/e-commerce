import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../model/products';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartSubject = new BehaviorSubject<Product[]>([]);

  // Public observable to subscribe to cart changes
  cart$ = this.cartSubject.asObservable();

  // Get current cart value
  get(): Product[] {
    return this.cartSubject.getValue();
  }

  // Set the entire cart (replaces all items)
  set(products: Product[]): void {
    this.cartSubject.next([...products]);
  }

  // Add a product to the cart
  add(product: Product): void {
    const current = this.get();
    this.cartSubject.next([...current, product]);
  }

  // Remove a product from the cart by ID
  remove(productId: number): void {
    const current = this.get();
    const updated = current.filter(p => p.id !== productId);
    this.cartSubject.next(updated);
  }

  // Clear the cart
  clear(): void {
    this.cartSubject.next([]);
  }

  // Check if a product is in the cart
  contains(productId: number): boolean {
    return this.get().some(p => p.id === productId);
  }

  // Get total item count
  count(): number {
    return this.get().length;
  }
}
