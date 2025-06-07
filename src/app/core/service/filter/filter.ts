import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter as FilterType } from '../../model/filter';

@Injectable({
  providedIn: 'root'
})
export class Filter {
  private filterSubject = new BehaviorSubject<FilterType>({
    search: null,
    price: {
      min: null,
      max: null
    },
    rating: null,
    order: null
  });

  filter$ = this.filterSubject.asObservable();

  set(filter: FilterType): void {
    this.filterSubject.next(filter);
  }

  reset(): void {
    this.filterSubject.next({
      search: null,
      price: {
        min: null,
        max: null
      },
      rating: null,
      order: null
    });
  }

  get() {
    return this.filterSubject.value;
  }
}
