import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/model/database.types';
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

  /**
   * Get single product by Id
   * 
   * @param id product value id
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiURL}/products/${id}`);
  }
}
