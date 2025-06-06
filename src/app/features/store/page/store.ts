import { Component, inject, signal } from '@angular/core';
import { Store as StoreService } from '../service/store';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { Product } from '../../../core/model/database.types';
import { Product as ProductComponent } from '../components/product/product';
import { Suggested as SuggestedService } from '../../../core/service/suggested/suggested';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  imports: [LoadingSpinner, ProductComponent],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  private service = inject(StoreService);
  private suggested = inject(SuggestedService);
  private router = inject(Router);
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

  navigate(data: { id: number, color: string }): void {
    const path: string = `details/${data.id.toString()}`;
    const suggestedProducts: Product[] = this.getSuggestedProduct();

    // Save product in the shared service (and localStorage)
    this.suggested.suggested = suggestedProducts;
    // Navigate to detailed page
    this.router.navigate([path], {
      queryParams: {
        color: data.color
      }
    });
  }

  private getSuggestedProduct(): Product[] {
    const products = this.products();
    if (products.length <= 3) {
      return products;
    }

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }
}
