import { Component, inject, signal } from '@angular/core';
import { Detail as DetailService } from '../service/detail';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/model/database.types';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {
  private service = inject(DetailService);
  private route = inject(ActivatedRoute);

  productId = signal<number | null>(parseInt(this.route.snapshot.paramMap.get('id') ?? '') ?? null);
  color = signal<string | null>(this.route.snapshot.queryParamMap.get('color') ?? null);

  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);

  constructor() {
    this.fetchProduct();
  }

  private fetchProduct() {
    try {
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
          console.error('Error occurred on loading product: ', err);
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
