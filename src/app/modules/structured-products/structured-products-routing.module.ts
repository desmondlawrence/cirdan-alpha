import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructuredProductDetailComponent } from './structured-product-detail/structured-product-detail.component';
import { StructuredProductListComponent } from './structured-product-list/structured-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: StructuredProductListComponent,
    data: {
      breadcrumb: 'List'
    }
  },
  {
    path: 'details/:id',
    component: StructuredProductDetailComponent,
    data: {
      breadcrumb: 'Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuredProductsRoutingModule { }
