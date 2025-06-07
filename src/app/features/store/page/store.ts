import { Component, inject, signal } from '@angular/core';
import { Store as StoreService } from '../service/store';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { Product } from '../../../core/model/products';
import { Product as ProductComponent } from '../components/product/product';
import { Router } from '@angular/router';
import { Filter as FilterService } from '../../../core/service/filter/filter';
import { Filter as FilterType } from '../../../core/model/filter';

@Component({
  selector: 'app-store',
  imports: [LoadingSpinner, ProductComponent],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  private service = inject(StoreService);
  private filterService = inject(FilterService);
  private router = inject(Router);
  // Loading state
  isLoading = signal<boolean>(true);
  // Products array
  products = signal<Product[]>([]);
  outputProducts = signal<Product[]>([]);

  constructor() {
    this.filterService.filter$.subscribe({
      next: (params: FilterType) => {
        this.filterLogic(params);
      }
    })

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
        const filter = this.filterService.get();

        this.filterLogic(filter);
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

  private filterLogic(params: FilterType) {
    let products: Product[] = this.products();
    if (products.length <= 0) {
      return;
    }

    const {
      search,
      price,
      rating,
      order
    } = params;

    if (search) {
      products = products.filter((value: Product) =>
        value.title.toLowerCase().includes(search.toLowerCase()) || value.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const min = price.min;
    const max = price.max;

    if (min) {
      products = products.filter((value: Product) => value.price > min);
    }

    if (max) {
      products = products.filter((value: Product) => value.price < max);
    }

    if (rating) {
      products = products.filter((value: Product) => value.rating.rate > rating);
    }

    if (order === 'ASC') {
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products.length - 1; j++) {
          if (products[j].price > products[j + 1].price) {
            const temp = products[j];
            products[j] = products[j + 1];
            products[j + 1] = temp;
          }
        }
      }
    } else if (order === 'DESC') {
      for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products.length - 1; j++) {
          if (products[j].price < products[j + 1].price) {
            const temp = products[j];
            products[j] = products[j + 1];
            products[j + 1] = temp;
          }
        }
      }
    }

    this.outputProducts.set(products);
  }
}
