import { Component, input } from '@angular/core';
import { Product as ProductType } from '../../../../core/model/database.types';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  product = input.required<ProductType>();
}
