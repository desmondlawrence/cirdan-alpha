import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructuredProductsRoutingModule } from './structured-products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StructuredProductListComponent } from './structured-product-list/structured-product-list.component';
import { StructuredProductDetailComponent } from './structured-product-detail/structured-product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    StructuredProductListComponent,
    StructuredProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StructuredProductsRoutingModule
  ]
})
export class StructuredProductsModule { }
