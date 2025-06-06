import { Component, inject, signal } from '@angular/core';
import { Suggested as SuggestedService } from '../../../../core/service/suggested/suggested';
import { Product } from '../../../../core/model/database.types';

@Component({
  selector: 'app-suggestion',
  imports: [],
  templateUrl: './suggestion.html',
  styleUrl: './suggestion.css'
})
export class Suggestion {
  private readonly service = inject(SuggestedService);

  suggestedProducts = signal<Product[]>([]);

  constructor() {
    this.service.suggested$.subscribe((products) => {
      this.suggestedProducts.set(products);
    });
  }
}
