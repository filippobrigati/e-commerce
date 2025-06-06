import { Component, inject } from '@angular/core';
import { Cart as CartService } from '../../../../core/service/cart/cart';

@Component({
  selector: 'app-cart-preview',
  imports: [],
  templateUrl: './cart-preview.html',
  styleUrl: './cart-preview.css'
})
export class CartPreview {
  private service = inject(CartService);
}
