import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/model/products';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Detail {
  private http = inject(HttpClient);

  /**
   * Get single product by Id
   * 
   * @param id product value id
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiURL}/products/${id}`);
  }
}
