import { ProductComponentType } from '../enums/product-component-type.enum';
import { BaseComponent } from './base-component';

describe('BaseComponent', () => {
  it('should create drived component with correct date', () => {
    expect(new DerivedComponent(12, '20210101', 'Other').startDate).toEqual(new Date(2021, 0, 1));
  });
});


export class DerivedComponent extends BaseComponent {
  otherField: string;
  constructor(
    value: number,
    startDateString: string,
    otherField: string
  ) {
    super(ProductComponentType.CB, value, startDateString);
    this.otherField = otherField;
  }
}
