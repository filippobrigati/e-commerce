import { Component, computed, input, output } from '@angular/core';
import { Product as ProductType } from '../../../../core/model/database.types';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  product = input.required<ProductType>();

  navigate = output<{ id: number, color: string }>();

  /**
   * Determine the product color based on its ID,
   * Yes...each product receives
   * the same color every time.
   */
  color = computed(() => {
    const id = this.product().id;
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
  });
}
