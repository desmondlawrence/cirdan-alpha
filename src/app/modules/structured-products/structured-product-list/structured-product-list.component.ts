import { DataSource } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StructuredProductService } from 'src/app/core/services/structured-product.service';
import { StructuredProduct } from 'src/app/shared/models/structured-product.model';

@Component({
  selector: 'app-structured-product-list',
  templateUrl: './structured-product-list.component.html',
  styleUrls: ['./structured-product-list.component.scss']
})
export class StructuredProductListComponent implements OnInit {
  error: string | null;
  structuredProductDS: any;
  loading = false;

  displayColumns = [
    'isin',
    'issueDate',
    'tags',
    'components'];

  constructor(
    private structuredProductService: StructuredProductService,
    private router: Router
  ) {
    this.error = null;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = null;
    this.structuredProductService.getProducts().then((data) => {
      this.structuredProductDS = new MatTableDataSource(data);
      this.structuredProductDS.filterPredicate = (product: StructuredProduct, filter: string) => {
        return (
          product.isin.toLowerCase().includes(filter.toLowerCase()) ||
          product.tags.join().toLowerCase().includes(filter.toLowerCase())
        );
      };
      this.loading = false;
    }, (error) => {
      this.error = error;
      console.warn(error);
      this.loading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.structuredProductDS.filter = filterValue.trim().toLowerCase();
  }

  getDetails(isin: string): void {
    this.router.navigate(['/details/' + isin]);
  }
}
