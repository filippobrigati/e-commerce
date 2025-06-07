import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProduct } from './invoice-product';

describe('InvoiceProduct', () => {
  let component: InvoiceProduct;
  let fixture: ComponentFixture<InvoiceProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
