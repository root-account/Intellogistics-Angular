import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillsComponent } from './waybills.component';

describe('WaybillsComponent', () => {
  let component: WaybillsComponent;
  let fixture: ComponentFixture<WaybillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaybillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
