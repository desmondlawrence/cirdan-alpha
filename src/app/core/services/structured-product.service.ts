import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseComponent } from 'src/app/shared/models/base-component';
import { StructuredProduct } from 'src/app/shared/models/structured-product.model';
import { map } from 'rxjs/operators';
import { StructuredProductAdapter } from 'src/app/shared/adapters/structured-product-adapter';

@Injectable({
  providedIn: 'root'
})
export class StructuredProductService {
  products: StructuredProduct[];
  minTime = 500;
  maxTime = 3000;
  timeoutLimit = 2500;
  constructor(
    private http: HttpClient,
    private productAdapter: StructuredProductAdapter
  ) {
    this.products = [];
  }

  getProducts(): Promise<StructuredProduct[]> {
    if (this.products.length === 0) {
      return this.http.get('assets/products.json').pipe(
        map((data: any) => {
          return data.map((item: any) => {
            const product = this.productAdapter.adapt(item);
            this.products.push(product);
            return product;
          });
        })).toPromise<StructuredProduct[]>();
    } else {
      return new Promise<StructuredProduct[]>((resolve, reject) => {
        const delay = this.randomDelay();
        console.log(delay);
        setTimeout(() => {
          if (delay > 2500) {
            reject('Error getting products. Please try again or contact support if the error persists');
          } else {
            resolve(this.products);
          }
        }, delay);
      });
    }
  }

  getProductDetails(isin: string): Promise<StructuredProduct | undefined> {
    return new Promise<StructuredProduct | undefined>((resolve, reject) => {
      const delay = this.randomDelay();
      console.log(delay);
      setTimeout(() => {
        if ((delay > 2500) || (this.products.length === 0)) {
          reject('Error getting product. Please try again or contact support if the error persists');
        } else {
          resolve(this.products.find((product) => {
            return (product.isin === isin);
          }));
        }
      }, delay);
    });
  }

  addComponent(isin: string, component: BaseComponent): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const matchingProduct = this.products.find((product) => {
        return product.isin === isin;
      });
      const delay = this.randomDelay();
      setTimeout(() => {
        if (delay > 2500) {
          reject('Error updating product. Please try again or contact support if the error persists');
        } else {
          matchingProduct?.components.push(component);
          resolve();
        }
      }, delay);
    });
  }
  randomDelay(): number {
    return Math.floor(Math.random() * (this.maxTime - this.minTime)) + this.minTime;
  }
}
