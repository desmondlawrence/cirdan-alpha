import { ProductComponentType } from '../enums/product-component-type.enum';
import { BaseComponent } from './base-component';

export class CbComponent extends BaseComponent {
    tickers: string[];

    constructor(
        value: number,
        startDateString: string,
        tickers: string[]
    ) {
        super(ProductComponentType.CB, value, startDateString);
        this.tickers = tickers;
    }
}
