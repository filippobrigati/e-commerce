import { Component, inject, signal } from '@angular/core';
import { Store as StoreService } from '../service/store';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { Product } from '../../../core/model/products';
import { Product as ProductComponent } from '../components/product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  imports: [LoadingSpinner, ProductComponent],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  private service = inject(StoreService);
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
        // Calculate color for each obj
        const flag: Product[] = data.map((value: Product) => {
          return {
            ...value,
            color: this.getColor(value.id)
          };
        });
        this.products.set(flag);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error occurred on loading products: ', err);
        this.isLoading.set(false);
      }
    });
  }

  navigate(id: number): void {
    const path: string = `details/${id.toString()}`;

    // Navigate to detailed page
    this.router.navigate([path]);
  }

  private getColor(id: number): string {
    const colors = [
      'bg-green-50',
      'bg-amber-50',
      'bg-teal-50',
      'bg-blue-50',
      'bg-rose-50',
      'bg-purple-50',
      'bg-orange-50',
      'bg-yellow-50',
      'bg-lime-50',
      'bg-cyan-50',
      'bg-indigo-50',
      'bg-fuchsia-50',
    ];

    const index = id % colors.length;
    return colors[index];
  }
}
