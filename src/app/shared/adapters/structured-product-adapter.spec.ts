import { StructuredProductAdapter } from './structured-product-adapter';
import structuredProduct from '../../../assets/mock-product.json';
import { StructuredProduct } from '../models/structured-product.model';
import { ZcComponent } from '../models/zc-component.model';
import { CbComponent } from '../models/cb-component.model';

describe('ProductAdapter', () => {
  it('should create an instance', () => {
    expect(new StructuredProductAdapter()).toBeTruthy();
  });

  it('should convert json to structured product', () => {
    const structuredProductAdapter = new StructuredProductAdapter();
    const mockStructuredProduct = new StructuredProduct(
      'ISIN_TECH2',
      '20180101',
      ['tech', 'technology', 'innovation'],
      [
        new ZcComponent(12.5, '20180101', 100),
        new ZcComponent(12.5, '20180101', 100),
        new CbComponent(120, '20180101', ['ABC', 'DEF'])
      ]
    );
    expect(structuredProductAdapter.adapt(structuredProduct)).toEqual(mockStructuredProduct);
  });
});
