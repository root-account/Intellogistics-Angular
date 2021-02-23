import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearPaymentComponent } from './clear-payment.component';

describe('ClearPaymentComponent', () => {
  let component: ClearPaymentComponent;
  let fixture: ComponentFixture<ClearPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
