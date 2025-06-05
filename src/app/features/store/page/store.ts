import { Component, computed, inject, signal } from '@angular/core';
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
  // Items for page (API do not support pagination)
  private PAGE_SIZE = 15;

  // Loading state
  isLoading = signal<boolean>(true);
  currentPage = signal<number>(1);
  // Products array
  private products = signal<Product[]>([]);

  totalPages = computed(() => 
    Math.ceil(this.products().length / this.PAGE_SIZE)
  );

  paginateProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.products().slice(start, start + this.PAGE_SIZE);
  });

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
