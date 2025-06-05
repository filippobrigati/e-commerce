import { Component, signal } from '@angular/core';
import { LucideAngularModule, Plus, Minus } from 'lucide-angular';

@Component({
  selector: 'app-add-to-cart',
  imports: [LucideAngularModule],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart {
  protected readonly PlusIcon = Plus;
  protected readonly MinusIcon = Minus;

  quantity = signal<number>(0);

  inc() {
    this.quantity.update((prev) => prev + 1);
  }

  dec() {
    this.quantity.update((prev) => prev - 1);
  }
}
