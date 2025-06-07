import { Component, effect, input, output } from '@angular/core';
import { Product as ProductType } from '../../../../core/model/products';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-product',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './invoice-product.html',
  styleUrl: './invoice-product.css'
})
export class InvoiceProduct {
  product = input.required<ProductType>();
  quantity = input.required<number>();

  removeProduct = output<number>();
  updateQuantity = output<number>();

  quantityControl = new FormControl(
    0,
    [Validators.required, Validators.min(1), Validators.max(10)]
  );

  constructor() {
    effect(() => {
      const quantity: number = this.quantity();
      if (quantity && !isNaN(quantity)) {
        this.quantityControl.setValue(quantity);
      }
    });

    this.quantityControl.valueChanges.subscribe(() => {
      if (this.quantityControl.invalid) {
        return;
      }

      const value = this.quantityControl.value;
      if (!value || value === this.quantity()) {
        return;
      }

      this.updateQuantity.emit(value);
    });
  }

  remove(): void {
    this.removeProduct.emit(this.product().id);
  }
}
