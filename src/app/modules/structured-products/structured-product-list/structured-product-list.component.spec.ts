import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StructuredProductListComponent } from './structured-product-list.component';

describe('StructuredProductListComponent', () => {
  let component: StructuredProductListComponent;
  let fixture: ComponentFixture<StructuredProductListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuredProductListComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuredProductListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
