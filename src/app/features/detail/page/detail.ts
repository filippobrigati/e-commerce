import { Component, computed, inject, signal } from '@angular/core';
import { Detail as DetailService } from '../service/detail';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/model/database.types';
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

  productId = signal<number | null>(parseInt(this.route.snapshot.paramMap.get('id') ?? '') ?? null);
  color = signal<string | null>(this.route.snapshot.queryParamMap.get('color') ?? null);

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
    this.fetchProduct();
  }

  private fetchProduct() {
    try {
      this.isLoading.set(true);
      
      const id = this.productId();
      if (!id) {
        throw new Error(`Missing ID on current route, or error getting it.`);
      }

      this.service.getProductById(id).subscribe({
        next: (data) => {
          this.product.set(data);
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
}
