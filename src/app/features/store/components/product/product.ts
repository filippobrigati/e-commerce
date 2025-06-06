import { Component, input, output } from '@angular/core';
import { Product as ProductType } from '../../../../core/model/products';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  product = input.required<ProductType>();

  navigate = output<number>();
}
