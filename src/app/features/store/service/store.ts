import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/model/products';
import { environment } from '../../../../environments/environment';
import { Cart as CartService } from '../../../core/service/cart/cart';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private http = inject(HttpClient);
  private readonly service = inject(CartService);

  /**
   * Get all products from api
   * 
   * @returns Product array
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiURL}/products`);
  }

  addToCart(product: Product, quantity: number = 1): void {
    this.service.add(product, quantity);
  }
}
