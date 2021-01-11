import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructuredProductsModule } from './modules/structured-products/structured-products.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => StructuredProductsModule,
    pathMatch: 'prefix',
    data: {
      breadcrumb: 'Structured Products'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
