import { Component, output, signal } from '@angular/core';
import { LucideAngularModule, Plus, Minus } from 'lucide-angular';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-add-to-cart',
  imports: [LucideAngularModule, LoadingSpinner],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart {
  protected readonly PlusIcon = Plus;
  protected readonly MinusIcon = Minus;

  addToCart = output<number>();

  sending = signal<boolean>(false);
  quantity = signal<number>(1);

  inc() {
    this.quantity.update((prev) => prev + 1);
  }

  dec() {
    this.quantity.update((prev) => prev - 1);
  }

  // Save to cart and set a fake dalay to it
  sendToCart(): void {
    this.sending.set(true);

    setTimeout(() => {
      this.addToCart.emit(this.quantity());

      this.sending.set(false);
    }, 2000);
  }

  isDisabled(): boolean {
    return this.quantity() < 1 || this.quantity() > 10 || this.sending();
  }
}
