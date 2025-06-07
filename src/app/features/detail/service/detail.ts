import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/model/products';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart as CartService } from '../../../core/service/cart/cart';

@Injectable({
  providedIn: 'root'
})
export class Detail {
  private http = inject(HttpClient);
  private cart = inject(CartService);

  /**
   * Get single product by Id
   * 
   * @param id product value id
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiURL}/products/${id}`);
  }

  addToCart(product: Product, quantity: number = 1) {
    this.cart.add(product, quantity);
  }
}
