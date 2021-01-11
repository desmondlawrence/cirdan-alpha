import { ProductComponentType } from '../enums/product-component-type.enum';
import { BaseComponent } from './base-component';

export class ZcComponent extends BaseComponent{
    quantity: number; // integer

    constructor(
        value: number,
        startDateString: string,
        quantity: number
    ) {
        super(ProductComponentType.ZC, value, startDateString);
        this.quantity = quantity;
    }
}
