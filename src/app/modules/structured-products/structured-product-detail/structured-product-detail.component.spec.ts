import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StructuredProductDetailComponent } from './structured-product-detail.component';

describe('StructuredProductDetailComponent', () => {
  let component: StructuredProductDetailComponent;
  let fixture: ComponentFixture<StructuredProductDetailComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuredProductDetailComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [FormBuilder],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuredProductDetailComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
