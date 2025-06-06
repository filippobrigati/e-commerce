import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product as ProductType } from '../../model/database.types';

@Injectable({
  providedIn: 'root'
})
export class Suggested {
  private suggestedSubject = new BehaviorSubject<ProductType[]>([]);

  suggested$ = this.suggestedSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('suggested-products');
    if (stored) {
      this.suggestedSubject.next(JSON.parse(stored));
    }
  }

  set suggested(product: ProductType[]) {
    localStorage.setItem('suggested-products', JSON.stringify(product));
    this.suggestedSubject.next(product);
  }

  get suggested(): ProductType[] {
    return this.suggestedSubject.value;
  }
}
