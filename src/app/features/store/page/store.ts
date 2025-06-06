import { Component, inject, signal } from '@angular/core';
import { Store as StoreService } from '../service/store';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { Product } from '../../../core/model/database.types';
import { Product as ProductComponent } from '../components/product/product';

@Component({
  selector: 'app-store',
  imports: [LoadingSpinner, ProductComponent],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  private service = inject(StoreService);
  // Loading state
  isLoading = signal<boolean>(true);
  // Products array
  products = signal<Product[]>([]);

  constructor() {
    this.fetchProduct();
  }

  private fetchProduct() {
    this.isLoading.set(true);

    this.service.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error occurred on loading products: ', err);
        this.isLoading.set(false);
      }
    });
  }
}
