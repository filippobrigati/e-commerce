import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/model/products';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private http = inject(HttpClient);

  /**
   * Get all products from api
   * 
   * @returns Product array
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiURL}/products`);
  }
}
