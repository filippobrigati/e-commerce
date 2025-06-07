import { Component, inject } from '@angular/core';
import { Filter as FilterService } from '../../../../core/service/filter/filter';
import { Filter as FilterType } from '../../../../core/model/filter';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {
  private readonly service = inject(FilterService);

  form = new FormGroup({
    search: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    rating: new FormControl(),
    order: new FormControl()
  });

  constructor() {
    const param: FilterType = this.service.get();
    if (param) {
      this.form.patchValue({
        search: param.search,
        minPrice: param.price.min,
        maxPrice: param.price.max,
        rating: param.rating,
        order: param.order
      });
    }

    this.form.valueChanges.subscribe(() => {
      const values = this.form.value;

      this.service.set({
        search: values.search,
        price: {
          min: values.minPrice,
          max: values.maxPrice
        },
        rating: values.rating,
        order: values.order
      });
    });
  }
}
