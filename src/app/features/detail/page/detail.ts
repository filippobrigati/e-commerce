import { Component, computed, inject, signal } from '@angular/core';
import { Detail as DetailService } from '../service/detail';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/model/products';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { LoadingSpinner } from '../../../shared/loading-spinner/loading-spinner';
import { CurrencyPipe, NgClass } from '@angular/common';
import { AddToCart } from '../components/add-to-cart/add-to-cart';

@Component({
  selector: 'app-detail',
  imports: [LoadingSpinner, RouterLink, NgClass, LucideAngularModule, CurrencyPipe, AddToCart],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {
  private service = inject(DetailService);
  private route = inject(ActivatedRoute);

  protected readonly BackIcon = ArrowLeft;

  productId = signal<number | null>(null);

  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);

  rateColor = computed<string>(() => {
    const rate: number | undefined = this.product()?.rating.rate;
    if (!rate) {
      return 'text-red-500';
    }

    if (rate < 2) {
      return 'text-yellow-500';
    } else if (rate < 4) {
      return 'text-green-500';
    } else {
      return 'text-violet-500';
    }
  });

  reviewColor = computed<string>(() => {
    const count: number | undefined = this.product()?.rating.count;
    if (!count) {
      return 'text-red-500';
    }

    if (count < 50) {
      return 'text-yellow-500';
    } else if (count < 300) {
      return 'text-green-500';
    } else {
      return 'text-violet-500';
    }
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') ?? '', 10);
      if (!isNaN(id)) {
        this.productId.set(id);
        this.fetchProduct(id);
      }
    });
  }

  private fetchProduct(id: number) {
    try {
      this.isLoading.set(true);

      this.service.getProductById(id).subscribe({
        next: (data) => {
          const flag: Product = {
            ...data,
            color: this.getColor(data.id)
          }

          this.product.set(flag);
          this.isLoading.set(false);
        },
        error: (err) => {
          alert(`Error occurred on loading product: ${err}`);
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
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
