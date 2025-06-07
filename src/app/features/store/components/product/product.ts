import { Component, inject, input, output, signal } from '@angular/core';
import { Product as ProductType } from '../../../../core/model/products';
import { CurrencyPipe } from '@angular/common';
import { Store as StoreService } from '../../service/store';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  private readonly service = inject(StoreService);

  product = input.required<ProductType>();

  navigate = output<number>();
  sending = signal<boolean>(false);

  sendToCart($event: Event): void {
    $event.stopPropagation();

    this.sending.set(true);

    setTimeout(() => {
      this.service.addToCart(this.product());

      this.sending.set(false);
    }, 2000);
  }
}
